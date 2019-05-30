const ObjectPath = require('../object-path');

const createPredicate = simpleCondition => {
  const accessor = ObjectPath.createAccessor(simpleCondition.lhs.lexeme);
  const evaluate = getEvaulator(simpleCondition);
  return o => {
    const lhsVal = accessor(o);
    if (lhsVal.length > 1) {
      throw new Error('lhs val is not specific');
    }
    return evaluate(lhsVal[0], simpleCondition.rhs.literal);
  };
};

/*
 * TODO implement _some_ simple type checking for operators
 */
const getEvaulator = node => {
  let predicate;
  switch (node.operator.type) {
    case 'EQ':
      predicate = (a, b) => a === b;
      break;
    case 'BANGEQ':
      predicate = (a, b) => a !== b;
      break;
    case 'GT':
      predicate = (a, b) => a > b;
      break;
    case 'STARTSWITH':
      predicate = (a, b) => a.startsWith(b);
      break;
    default:
      throw new Error('UFO (Unidentifed Flying Operator) : ' + node.operator);
  }
  return predicate;
};

module.exports.createPredicate = createPredicate;
