//Visitor
const visit = (visitor, node, params) =>
  visitor[node.type]
    ? visitor[node.type].call(visitor, node, params)
    : visitorErr(
        `visitor does not have ${node.type} defined. Has ${Object.keys(
          visitor
        )}`
      );

const visitorErr = msg => {
  throw new Error(msg);
};

const logDecorator = fn => (...args) => {
  //eslint-disable-next-line no-console
  console.log(`Invoking ${fn.name} with ${args[1].type}`);
  return fn(...args);
};

module.exports = logDecorator(visit);
