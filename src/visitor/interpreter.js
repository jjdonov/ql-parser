//interpreter
const visit = require('./visitor');
const ObjectPath = require('../object-path/object-path.js');

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
    const accessor = ObjectPath.createAccessor(node.lhs.lexeme);
    let predicate;
    switch(node.operator.type) {
      case 'EQ':
        predicate = (a) => {
          const vals = accessor(a);
          if(vals.length > 1) {
            throw new Error('too many matches');
          }
          console.log(`lhs ->
                      ${JSON.stringify(vals)}`);
          console.log(`rhs ->
                      ${node.rhs.literal}`);
          return  vals[0] == node.rhs.literal;
        };
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
