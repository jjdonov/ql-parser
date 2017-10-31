//interpreter
const visit = require('./visitor');
//const ObjectPath = require('../object-path/object-path.js');
const Predicates = require('../interpreter/predicates');

const Interpreter = {
  and: (node) => {
    throw new Error('unimplemented.');
  },
  or: (node) => {
    throw new Error('unimplemented.');
  },
  negation: (node) => {
    throw new Error('unimplemented.');
  },
  simple: (node) => {
    console.log(`Evaluating:
                ${JSON.stringify(node)}`);
//    const accessor = ObjectPath.createAccessor(node.lhs.lexeme);
    let predicate;
    switch(node.operator.type) {
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
  interpret: (node) => visit(Object.create(Interpreter), node)
};
