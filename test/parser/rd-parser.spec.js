const expect = require('chai').expect;

const parser = require('../../src/parser/rd-parser');
const Token = require('../../src/token/token');

//mocks
const alwaysMatchController = {
  match: () => true,
  matchGroup: () => true
};

const neverMatchController = {
  match: () => false,
  matchGroup: () => false,
  peek: () => ({type: 'n/a'})
};

const createController = (controllerType, ...args) =>
  Object.assign(Object.create(controllerType), ...args);

describe('rd-parser', () => {

  describe('simpleCondition', () => {

    describe('field', () => {
      it('errors when missing field', () => {
        const field = parser.field.bind(null, neverMatchController);
        expect(field).to.throw(/^Expected identifier/);
      });

      it('returns previous token when it matches IDENTIFIER', () => {
        const previousToken = new Token('IDENTIFIER', 'n/a');
        const controller = createController(alwaysMatchController, {
          previous: () => previousToken
        });
        expect(parser.field(controller)).to.equal(previousToken);
      });
    });

    describe('operator', () => {
      it('errors when missing operator', () => {
        const operator = parser.operator.bind(null, neverMatchController);
        expect(operator).to.throw(/^Expected operator/);
      });

      it('returns previous when matches', () => {
        const previousToken = new Token('OPERATOR', 'n/a');
        const controller = createController(alwaysMatchController, {
          previous: () => previousToken
        });
        expect(parser.operator(controller)).to.equal(previousToken);
      });
    });

    describe('operand', () => {
      it('errors when no match', () => {
        const operand = parser.operand.bind(null, neverMatchController);
        expect(operand).to.throw(/^Expected operand/);
      });

      it('returns previous when match', () => {
        const previousToken = new Token('STRING', '123');
        const controller = createController(alwaysMatchController, {
          previous: () => previousToken
        });
        expect(parser.operand(controller)).to.equal(previousToken);
      });
    });
  });
});
