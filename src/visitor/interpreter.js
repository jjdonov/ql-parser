//interpreter

const Interpreter = {
  and: (node) => {

  },
  or: (node) => {

  },
  negation: (node) => {

  },
  simple: (node) => {
    const accecsor = (targetObj) => {
      //node.lhs can be a path. accesor
      //should be able to interp that path.
    };
    let predicate;
    switch(node.operator) {
      case 'EQ':
        predicate = (a, b) => a === b;
        break;
      case 'BANGEQ':
        predicate = (a, b) => a !== b;
        break;
      case 'GT':
        predicate = (a, b) => a > b;
        break;
      default:
        throw new Error('UFO (Unidentifed Flying Operator) : ' + node.operator);
    }

  }
};


