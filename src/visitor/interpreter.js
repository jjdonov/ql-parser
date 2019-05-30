const visit = require('./visitor');
const Predicates = require('../interpreter/predicates');

const Interpreter = {
  and: node => {
    throw new Error(
      `AND is unimplemented, received node ${JSON.stringify(node)}`
    );
  },
  or: node => {
    throw new Error(
      `OR is unimplemented, received node ${JSON.stringify(node)}`
    );
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
