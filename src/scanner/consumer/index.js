const number = require('./number-consumer');
const string = require('./string-consumer');
const identifier = require('./identifier-consumer');

const consumers = {number, string, identifier};

/*jshint ignore:start*/
module.exports.allConsumers = function all(scanner) {
  return Object.entries(consumers)
  .map(([k, v]) => ([k, v.bind(scanner)]))
  .reduce((o, entry) => {
    const [k, v] = entry;
    return {...o, [k]: v};
  }, {});
};
/*jshint ignore:end*/

