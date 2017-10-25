const expect = require('chai').expect;
const stringConsumer = require('../../src/scanner/consumer/string-consumer');
const numberConsumer = require('../../src/scanner/consumer/number-consumer');
const dummyScanner = require('./dummy-scanner');

describe('consumer', () => {

  describe('stringConsumer', () => {
    it('throws error when string is not terminated', () => {
      const t = {
        isAtEnd: () => true
      };
      const consume = () => stringConsumer.bind(t)('\'');
      expect(consume).to.throw(/EOF/);
    });
    it('returns a date token for single quote type and date pattern', () => {
      const t = dummyScanner('\'2017-12-25\'');
      const consumer = stringConsumer.bind(t);
      consumer('\'');
      const firstToken = t.tokens.pop();
      expect(firstToken.type).to.equal('DATE');
    });
    it('returns string otherwise');
  });

//  describe('numberConsumer', () => {
//    it('does dates', () => {
//      const t = dummyScanner('\'2017-12-25\'');
//      const consumer = numberConsumer.bind(t);
//      const consume = () => consumer();
//      expect(consume).to.throw(Error);
//    });
//  });
});


