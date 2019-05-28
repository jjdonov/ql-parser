const ObjectPath = require('../object-path/object-path');

const simplePredicate = (module.exports.simplePredicate = simpleCondition => {
  const accessor = ObjectPath.createAccessor(simpleCondition.lhs.lexeme);
  return o => {
    const lhsVal = accessor(o);
    if (lhsVal.length > 1) {
      throw new Error('lhs val is not specific');
    }
    return lhsVal[0] === simpleCondition.rhs.literal;
  };
});

module.exports.simplePredicate = simplePredicate;
