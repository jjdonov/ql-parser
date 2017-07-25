
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

module.exports = Object.assign({}, {createSimpleCondition, createOrCondition, createAndCondition});
