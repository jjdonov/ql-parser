const {TOKEN_TYPES, OPERATORS} = require('./token/tokens');
const {
  createSimpleCondition,
  createNegatedCondition,
  createOrCondition,
  createAndCondition} = require('./condition/condition-factory');

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

    const matchGroup = (group) => {
      return match(...Object.values(group));
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
      if(!isAtEnd()) {
        consume(TOKEN_TYPES.EOF, 'Not expecting anymore tokens.');
      }
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
      let negate = 0;
      while(match(TOKEN_TYPES.NOT, TOKEN_TYPES.BANG)) {
        negate++;
      }
      return negate % 2 === 1 ? createNegatedCondition(simpleCondition()) : simpleCondition();
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
      if(matchGroup(OPERATORS)) {
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

