const visit = require('../visitor');
const Predicates = require('./predicates');

const Interpreter = {
  and: node => {
    const lPredicate = visit(Interpreter, node.lCondition);
    const rPredicate = visit(Interpreter, node.rCondition);
    return o => lPredicate(o) && rPredicate(o);
  },
  or: node => {
    const lPredicate = visit(Interpreter, node.lCondition);
    const rPredicate = visit(Interpreter, node.rCondition);
    return o => lPredicate(o) || rPredicate(o);
  },
  negation: node => {
    const predicate = visit(Interpreter, node.condition);
    return o => !predicate(o);
  },
  simple: node => Predicates.createPredicate(node)
};

module.exports = {
  interpret: node => visit(Object.create(Interpreter), node)
};
