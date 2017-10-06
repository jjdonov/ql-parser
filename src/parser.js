const {TOKEN_TYPES, OPERATORS} = require('./token/token-types');
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
      console.log('checking ' + tokenType);
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
      if(match(TOKEN_TYPES.NUMBER)) {
        return previous();
      } else if (match(TOKEN_TYPES.STRING)){
        //may have to check for quoted dates
        return previous();
      } else if (match(TOKEN_TYPES.LPAREN)) {
        return list();
      } else if(match(TOKEN_TYPES.AT)) {
        return relativeDate();
      }
      throw new Error('Expected operand');
    };

    const list = () => {
      consume(TOKEN_TYPES.LPAREN);
      throw new Error("Parser -> list is unimplemented");
    };

    const relativeDate = () => {
      consume(TOKEN_TYPES.AT);
      consume(TOKEN_TYPES.LPAREN);
      if(match(TOKEN_TYPES.TODAY, TOKEN_TYPES.TOMORROW, TOKEN_TYPES.YESTERDAY)) {
        //TODAY, TOMMOROW, YESTERDAY
      } else if(match(TOKEN_TYPES.NUMBER)) {
        //<NUMBER> <DATE_UNIT> <DIRECTION>
      } else if(match(TOKEN_TYPES.THIS, TOKEN_TYPES.LAST, TOKEN_TYPES.NEXT)) {
        //THIS, LAST, NEXT <DATE_UNIT> [<INCLUSION>]
      }
      throw new Error("Parser -> relativeDate is unimplemented");
      //consume(TOKEN_TYPES.RPAREN);
    };

    const subCondition = () => {
      consume(TOKEN_TYPES.LPAREN);
      q = query();
      consume(TOKEN_TYPES.RPAREN);
      q = group(q);
      return q;
    };

    return query();
  }

};

