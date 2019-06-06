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
    const newParams = incrementDepth(params);
    return `${indentation(params)}NOT\n${visit(
      ASTPrinter,
      node.condition,
      newParams
    )}`;
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
  interpret: node => visit(ASTPrinter, node, incrementDepth())
};
