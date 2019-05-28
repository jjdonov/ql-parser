const consumers = {
  date: require('./date-consumer'),
  identifier: require('./identifier-consumer'),
  number: require('./number-consumer'),
  string: require('./string-consumer'),
  time: () => false
};

/*jshint ignore:start*/
module.exports.allConsumers = function all(scanner) {
  return Object.entries(consumers)
    .map(([k, v]) => [k, v.bind(scanner)])
    .reduce((o, entry) => {
      const [k, v] = entry;
      return { ...o, [k]: v };
    }, {});
};
/*jshint ignore:end*/
