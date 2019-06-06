const ObjectPath = require('../../object-path');

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

const getEvaulator = node => {
  let predicate;
  switch (node.operator.type) {
    case 'EQ':
      predicate = (a, b) => {
        if (node.rhs.type === 'DATE') {
          return dateEquals(a, b);
        }
        return a === b;
      };
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

/**
 * d1 is the date from the supplied data, and needs to be
 * checked prior to invoking Date methods.
 *
 * d2 is the Date instance parsed from the supplied
 * query string, and therefore will _always_ be a date.
 */
const dateEquals = (d1, d2) => {
  if (!d1.getTime) {
    return false;
  }
  return d1.getTime() === d2.getTime();
};

module.exports.createPredicate = createPredicate;
