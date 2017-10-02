const {createAccessor} = require('../../src/object-path/object-path.js');
const expect = require('chai').expect;

const order = {
  orderTerms: {
    reference: {
      containerLoad: 'FCL'
    }
  },
  uid: "123",
  party: {
    buyer: [
      {
        name: "john"
      }, {
        name: "bob"
      }
    ],
    seller: undefined
  }
};

describe('object-path', () => {
  it('can grab simple attribute', () => {
    const acc = createAccessor("uid");
    expect(acc(order)).to.deep.equal(["123"]);
  });

  it('can grab deeply nested attributes', () => {
    const acc = createAccessor("orderTerms.reference.containerLoad");
    expect(acc(order)).to.deep.equal(["FCL"]);
  });

  it('can grab nested attributes within arrays', () => {
    const acc = createAccessor("party.buyer.name");
    expect(acc(order)).to.deep.equal(["bob", "john"]);
  });

  it('doenst add undefined results', () => {
    const acc = createAccessor("party.seller");
    expect(acc(order)).to.have.length(0);
  });
});
