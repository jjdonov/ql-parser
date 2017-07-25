const visit = require('./visitor');

const ASTPrinter = {
  and: (node) => {
    return `AND (${visit(ASTPrinter, node.lCondition)}), ${visit(ASTPrinter, node.rCondition)}`;
  },
  or: (node) => {
    return `OR (${visit(ASTPrinter, node.lCondition)}), ${visit(ASTPrinter, node.rCondition)}`;
  },
  negation : (node) => {
    return `NOT (${visit(ASTPrinter, node.condition)})`;
  },
  simple: (node) => {
    return `${node.operator} (${node.lhs}, ${node.rhs})`;
  },
};

module.exports = {
  visit: (node) => visit(Object.create(ASTPrinter), node)
};
