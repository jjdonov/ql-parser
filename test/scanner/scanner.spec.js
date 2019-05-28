const expect = require('chai').expect;
const Scanner = require('../../src/scanner/scanner');

describe('Scanner', () => {
  it('branches correctly on unquoted date', () => {
    const scanner = new Scanner('2017-12-25');
    const tokens = scanner.scan();
    expect(tokens.length).to.equal(2);
    const dateToken = tokens.shift();
    expect(dateToken.type).to.equal('DATE');
    //expect(dateToken.literal).to.deep.equal({year: '2017', month: '12', day: '25'});
    expect(dateToken.literal).to.deep.equal('2017-12-25');
  });

  it('does something with quoted date', () => {
    const scanner = new Scanner("'2017-12-25'");
    const tokens = scanner.scan();
    expect(tokens.length).to.equal(2);
    const dateToken = tokens.shift();
    expect(dateToken.type).to.equal('DATE');
    //expect(dateToken.literal).to.deep.equal({year: '2017', month: '12', day: '25'});
    expect(dateToken.literal).to.deep.equal('2017-12-25');
  });
});
