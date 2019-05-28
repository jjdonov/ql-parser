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
    throw new Error(
      `NEGATION is unimplemented, received node ${JSON.stringify(node)}`
    );
  },
  simple: node => {
    //eslint-disable-next-line no-console
    console.log(`Evaluating:
                ${JSON.stringify(node)}`);
    //    const accessor = ObjectPath.createAccessor(node.lhs.lexeme);
    let predicate;
    switch (node.operator.type) {
      case 'EQ':
        predicate = Predicates.simplePredicate(node);
        break;
      case 'BANGEQ':
        predicate = (a, b) => a != b;
        break;
      case 'GT':
        predicate = (a, b) => a > b;
        break;
      default:
        throw new Error('UFO (Unidentifed Flying Operator) : ' + node.operator);
    }
    return predicate;
  }
};

module.exports = {
  interpret: node => visit(Object.create(Interpreter), node)
};
