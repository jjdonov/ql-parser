const QlCondition = {
  type: null
};

function makeCondition(source) {
  return Object.assign(Object.create(QlCondition), source);
}

module.exports.createSimpleCondition = (lhs, operator, rhs) =>
  makeCondition({
    type: 'simple',
    lhs,
    operator,
    rhs
  });

module.exports.createNegatedCondition = condition =>
  makeCondition({
    type: 'negation',
    condition
  });

module.exports.createOrCondition = (lCondition, rCondition) =>
  makeCondition({
    type: 'or',
    lCondition,
    rCondition
  });

module.exports.createAndCondition = (lCondition, rCondition) =>
  makeCondition({
    type: 'and',
    lCondition,
    rCondition
  });
