const expect = require('chai').expect;
const controller = require('../../src/parser/controls');
const parser = require('../../src/parser/rd-parser');
const Token = require('../../src/token/token');
const { TOKEN_TYPES } = require('../../src/token/token-types');

//mocks
const alwaysMatchController = {
  match: () => true,
  matchGroup: () => true
};

const neverMatchController = {
  match: () => false,
  matchGroup: () => false,
  peek: () => ({ type: 'n/a' })
};

const mockController = (controllerType, ...args) =>
  Object.assign(Object.create(controllerType), ...args);

//uses actual controller
const makeController = tokens =>
  controller({
    index: 0,
    length: tokens.length,
    tokens: tokens
  });

describe('rd-parser', () => {
  describe('field', () => {
    it('errors when missing field', () => {
      const field = parser.field.bind(null, neverMatchController);
      expect(field).to.throw(/^Expected identifier/);
    });

    it('returns previous token when it matches IDENTIFIER', () => {
      const previousToken = new Token('IDENTIFIER', 'n/a');
      const controller = mockController(alwaysMatchController, {
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
      const controller = mockController(alwaysMatchController, {
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
      const controller = mockController(alwaysMatchController, {
        previous: () => previousToken
      });
      expect(parser.operand(controller)).to.equal(previousToken);
    });
  });

  describe('simpleCondition', () => {
    const lhs = new Token('IDENTIFIER', 'poNumber');
    const operator = new Token('EQ', '=');
    const operand = new Token('STRING', 'ABCD');

    it('can parse a valid stream for simpleCondition', () => {
      const controls = makeController([lhs, operator, operand]);
      const result = parser.simpleCondition(controls);
      expect(result.lhs).to.equal(lhs);
      expect(result.operator).to.equal(operator);
      expect(result.rhs).to.equal(operand);
    });

    it('throws error on bad stream', () => {
      expect(parser.simpleCondition).to.throw(Error);
    });
  });

  describe('subCondition', () => {
    const lhs = new Token('IDENTIFIER', 'poNumber');
    const operator = new Token('EQ', '=');
    const operand = new Token('STRING', 'ABCD');

    const tokens = [
      new Token(TOKEN_TYPES.LPAREN, '('),
      lhs,
      operator,
      operand,
      new Token(TOKEN_TYPES.RPAREN, ')')
    ];

    it('can parse a simpleCondition wrappd in a subCondition', () => {
      const controls = makeController(tokens);
      const result = parser.subCondition(controls);
      expect(result.type).to.equal('simple');
      expect(result.lhs).to.equal(lhs);
      expect(result.operator).to.equal(operator);
      expect(result.rhs).to.equal(operand);
    });
  });

  describe('negatableCondition', () => {
    const bang = new Token('BANG', '!');
    const identifier = new Token('IDENTIFIER', 'poNumber');
    const operator = new Token('EQ', '=');
    const operand = new Token('STRING', 'ABCD');
    it('returns simple condition when there is no negation', () => {
      const controls = makeController([identifier, operator, operand]);
      expect(parser.negatableCondition(controls).type).to.equal('simple');
    });
    it('can parse a negated condition via bang', () => {
      const controls = makeController([bang, identifier, operator, operand]);
      const result = parser.negatableCondition(controls);
      expect(result.type).to.equal('negation');
      expect(result.condition.type).to.equal('simple');
    });
    it('handles repeated negation via bangs', () => {
      const controls = makeController([
        ...Array(3).fill(bang),
        identifier,
        operator,
        operand
      ]);
      const result = parser.negatableCondition(controls);
      expect(result.type).to.equal('negation');
      expect(result.condition.type).to.equal('simple');
      expect(result.condition.lhs).to.equal(identifier);
    });
    it('returns a simple expression when double negated', () => {
      const controls = makeController([
        ...Array(2).fill(bang),
        identifier,
        operator,
        operand
      ]);
      const result = parser.negatableCondition(controls);
      expect(result.type).to.equal('simple');
      expect(result.lhs).to.equal(identifier);
    });
    it('its negated condition is identical to a simpleCondition without the negation', () => {
      const negControls = makeController([bang, identifier, operator, operand]);
      const simpleControls = makeController([identifier, operator, operand]);
      const conditionThatWasNegated = parser.negatableCondition(negControls)
        .condition;
      const condition = parser.simpleCondition(simpleControls);
      expect(conditionThatWasNegated).to.deep.equal(condition);
    });
    it('handles not');
  });
});
