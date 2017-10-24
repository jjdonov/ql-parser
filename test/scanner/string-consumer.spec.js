const expect = require('chai').expect;
const stringConsumer = require('../../src/scanner/consumer/string-consumer');


describe('stringConsumer', () => {
  it('throws error when string is not terminated', () => {
    const t = {
      isAtEnd: () => true
    };
    const consume = () => stringConsumer.bind(t)('\'');
    expect(consume).to.throw(/EOF/);
  });
  it('returns a date token for single quote type and date pattern', () => {
    const t = {
      source: '\'2017-12-25\'',
      start: 0,
      current: 1,
      tokens: [],
      peek: function() {
        return this.source[this.current];
      },
      isAtEnd: function() {
        return this.current > this.source.length;
      },
      advance: function() {
        this.current++;
      },
      addToken: function(type, text) {
        this.tokens.push({type, text});
      }
    };
    const consumer = stringConsumer.bind(t);
    consumer('\'');
    const firstToken = t.tokens.pop();
    expect(firstToken.type).to.equal('DATE');
  });
  it('returns string otherwise');
});
