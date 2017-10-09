const {TOKEN_TYPES, OPERATORS} = require('../token/token-types');
const {
  createSimpleCondition,
  createNegatedCondition,
  createOrCondition,
  createAndCondition} = require('../condition/condition-factory');

const query = (controller) => {
  const q = orCondition(controller);
  if(!controller.isAtEnd()) {
    controller.consume(TOKEN_TYPES.EOF, 'Not expecting anymore tokens.');
  }
  return q;
};

const orCondition = (controller) => {
  let q = andCondition(controller);
  while(controller.match(TOKEN_TYPES.OR)) {
    let qPrime = orCondition(controller);
    q = createOrCondition(q, qPrime);
  }
  return q;
};

const andCondition = (controller) => {
  let q = negatableCondition(controller);
  while(controller.match(TOKEN_TYPES.AND)) {
    let qPrime = orCondition(controller);
    q = createAndCondition(q, qPrime);
  }
  return q;
};

const negatableCondition = (controller) => {
  const simpleCond = () => simpleCondition(controller);
  let negate = 0;
  while(controller.match(TOKEN_TYPES.NOT, TOKEN_TYPES.BANG)) {
    negate++;
  }
  return negate % 2 === 1 ? createNegatedCondition(simpleCond()) : simpleCond();
};

const simpleCondition = (controller) => {
  const lhs = field(controller);
  const op = operator(controller);
  const rhs = operand(controller);
  return createSimpleCondition(lhs, op, rhs);
};

const field = (controller) => {
  if(controller.match(TOKEN_TYPES.IDENTIFIER)) {
    return controller.previous();
  }
  throw new Error(`Expected identifier, got ${controller.peek().type}`);
};

const operator = (controller) => {
  if(controller.matchGroup(OPERATORS)) {
    return controller.previous();
  }
  throw new Error(`Expected operator. Got : ${controller.peek()}`);
};

const operand = (controller) => {
  if(controller.match(TOKEN_TYPES.NUMBER)) {
    return controller.previous();
  } else if (controller.match(TOKEN_TYPES.STRING)){
    //may have to check for quoted dates
    return controller.previous();
  } else if (controller.match(TOKEN_TYPES.LPAREN)) {
    return list(controller);
  } else if(controller.match(TOKEN_TYPES.AT)) {
    return relativeDate(controller);
  }
  throw new Error('Expected operand');
};

const list = (controller) => {
  controller.consume(TOKEN_TYPES.LPAREN);
  throw new Error("Parser -> list is unimplemented");
};

const relativeDate = (controller) => {
  controller.consume(TOKEN_TYPES.AT);
  controller.consume(TOKEN_TYPES.LPAREN);
  if(controller.match(TOKEN_TYPES.TODAY, TOKEN_TYPES.TOMORROW, TOKEN_TYPES.YESTERDAY)) {
    //TODAY, TOMMOROW, YESTERDAY
  } else if(controller.match(TOKEN_TYPES.NUMBER)) {
    //<NUMBER> <DATE_UNIT> <DIRECTION>
  } else if(controller.match(TOKEN_TYPES.THIS, TOKEN_TYPES.LAST, TOKEN_TYPES.NEXT)) {
    //THIS, LAST, NEXT <DATE_UNIT> [<INCLUSION>]
  }
  throw new Error("Parser -> relativeDate is unimplemented");
  //controller.consume(TOKEN_TYPES.RPAREN);
};

const subCondition = (controller) => {
  controller.consume(TOKEN_TYPES.LPAREN);
  q = query();
  controller.consume(TOKEN_TYPES.RPAREN);
  q = group(q);
  return q;
};

module.exports = {query, simpleCondition, field, operator, operand};
