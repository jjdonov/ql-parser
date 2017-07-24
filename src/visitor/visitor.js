//Visitor
const visit = (visitor, node) => visitor[node.type] ?
  visitor[node.type].call(visitor, node) :
  visitorErr(`visitor does not have ${node.type} defined. Has ${Object.keys(visitor)}`);

const visitorErr = (msg) => {
  throw new Error(msg);
};

module.exports = visit;
