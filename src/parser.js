const {TOKEN_TYPES} = require('./token/tokens.js');

module.exports = class Parser {

  constructor(tokens) {
    this.tokens = tokens;
  }

  parse() {
    if(!this.tokens || !this.tokens.length) {
      return;
    }
    let index = 0;
    const length = this.tokens.length;

    const peek = (distance = 0) => this.tokens[index + distance];
    const isAtEnd = () =>  length < index;
    const previous = () => peek(-1);
    const consume = (type, message) => {
      if(isAtEnd() || peek().type !== type) {
          throw new Error(message);
      }
      index++;
    };

    const match = (...tokenTypes) => {
      const matches = tokenTypes.some((type) => check(type));
      if(matches) {
        index++;
      }
      return matches;
    };

    const check = (tokenType) => {
      if(isAtEnd()) {
        return false;
      }
      return peek().type === tokenType;
    };

    const query = () => {
      const q = orCondition();
//      if(current.type === TOKEN_TYPES.LPAREN) {
//        q = subCondition();
//      }
//      switch(current.type) {
//        case TOKEN_TYPES.LPAREN:
//          q = grouping();
//          break;
//        default:
//          break;
//      }
      if(!isAtEnd()) {
        consume(TOKEN_TYPES.EOF, 'Not expecting anymore tokens.');
      }
      console.log('CONDITIONS ->');
      console.log(visit(ASTPrinter, q));
      return q;
    };

    const orCondition = () => {
      let q = andCondition();
      while(match(TOKEN_TYPES.OR)) {
        let qPrime = orCondition();
        q = createOrCondition(q, qPrime);
      }
      return q;
    };

    const andCondition = () => {
      let q = negatableCondition();
      while(match(TOKEN_TYPES.AND)) {
       let qPrime = orCondition();
       q = createAndCondition(q, qPrime);
      }
      return q;
    };

    const negatableCondition = () => {
      //TODO: implement NOT and !
      return simpleCondition();
    };

    const simpleCondition = () => {
      const lhs = field();
      const op = operator();
      const rhs = operand();
      return createSimpleCondition(lhs, op, rhs);
    };

    const field = () => {
      if(match(TOKEN_TYPES.IDENTIFIER)) {
        return previous();
      }
      throw new Error(`Expected identifier, got ${peek().type}`);
    };

    const operator = () => {
      if(match(TOKEN_TYPES.EQ, TOKEN_TYPES.BANGEQ)) {
        return previous();
      }
      throw new Error(`Expected operator. Got : ${peek()}`);
    };

    const operand = () => {
      if(match(TOKEN_TYPES.STRING, TOKEN_TYPES.NUMBER)) {
        return previous();
      }
      throw new Error('Expected operand');
    };

    const subCondition = () => {
      consume(TOKEN_TYPES.LPAREN);
      q = query();
      consume(TOKEN_TYPES.RPAREN);
      q = group(q);
    };

    return query();
  }

};

const OqlCondition = {
  type: null,
};

const createSimpleCondition =
    (lhs, operator, rhs) =>
    Object.assign(Object.create(OqlCondition), {
        type: 'simple',
        lhs,
        operator,
        rhs});

const createOrCondition =
  (lCondition, rCondition) =>
  Object.assign(Object.create(OqlCondition), {
    type: 'or',
    lCondition,
    rCondition});

const createAndCondition =
  (lCondition, rCondition) =>
  Object.assign(Object.create(OqlCondition), {
    type: 'and',
    lCondition,
    rCondition});

//Visitor
const visit = (visitor, node) => visitor[node.type] ?
  visitor[node.type].call(visitor, node) :
  visitorErr(`visitor does not have ${node.type} defined. Has ${Object.keys(visitor)}`);

const visitorErr = (msg) => {
  throw new Error(msg);
};

const ASTPrinter = {
  and: (node) => {
    return `AND (${visit(ASTPrinter, node.lCondition)}), ${visit(ASTPrinter, node.rCondition)}`;
  },
  or: (node) => {
    return `OR (${visit(ASTPrinter, node.lCondition)}), ${visit(ASTPrinter, node.rCondition)}`;
  },
  simple: (node) => {
    return `${node.operator} (${node.lhs}, ${node.rhs})`;
  }
};
