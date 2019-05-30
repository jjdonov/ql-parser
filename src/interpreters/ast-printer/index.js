const visit = require('../visitor');

const ASTPrinter = {
  and: (node, params) => {
    const newParams = incrementDepth(params);
    return `${indentation(params)}AND\n${visit(
      ASTPrinter,
      node.lCondition,
      newParams
    )})\n${visit(ASTPrinter, node.rCondition, newParams)}`;
  },
  or: (node, params) => {
    const newParams = incrementDepth(params);
    return `${indentation(params)}OR\n${visit(
      ASTPrinter,
      node.lCondition,
      newParams
    )})\n${visit(ASTPrinter, node.rCondition, newParams)}`;
  },
  negation: (node, params) => {
    return `${indentation(params)}NOT (${visit(ASTPrinter, node.condition)})`;
  },
  simple: (node, params) => {
    return `${indentation(params)}${node.operator} (${node.lhs}, ${node.rhs})`;
  }
};

const indentation = params => '\t'.repeat(params.depth);

const incrementDepth = (params = { depth: -1 }) => ({
  depth: params.depth + 1
});

module.exports = {
  interpret: node => visit(Object.create(ASTPrinter), node, incrementDepth())
};
