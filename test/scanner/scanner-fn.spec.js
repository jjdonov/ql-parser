const expect = require('chai').expect;
const doScan = require('../../src/scanner/scan-fn');
const dummyScanner = require('./dummy-scanner');

describe.skip('scan-fn', () => {
  it('branches correctly on unquoted date', () => {
    const t = dummyScanner('12-25-2017');
    const scan = () => doScan(t);
    expect(scan).to.throw(/holy moly/i);
  });
});
