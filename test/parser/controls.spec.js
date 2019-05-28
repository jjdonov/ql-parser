const controller = require('../../src/parser/controls');
const expect = require('chai').expect;

describe('controls', () => {
  describe('peek', () => {
    const controls = controller({
      index: 0,
      tokens: ['first', 'second'],
      length: 2
    });

    it('returns next token when not given a distance', () => {
      expect(controls.peek()).to.equal('first');
    });

    it('returns token at arbitrary distance from index', () => {
      expect(controls.peek(1)).to.equal('second');
    });

    it('throws RangeError for peek out of range', () => {
      const doPeek = controls.peek.bind(null, 5);
      expect(doPeek).to.throw(RangeError);
    });
  });

  describe('previous', () => {
    it('returns the same value as peek(-1)', () => {
      const controls = controller({
        index: 1,
        tokens: ['first', 'second'],
        length: 2
      });
      expect(controls.previous()).to.equal(controls.peek(-1));
    });
    it('throws Range Error for peek out of range', () => {
      const controls = controller({
        index: 0,
        tokens: ['first', 'second'],
        length: 2
      });
      expect(controls.previous).to.throw(RangeError);
    });
  });

  describe('isAtEnd', () => {
    it('returns true when there are no tokens left to consume', () => {
      const controls = controller({
        index: 1,
        length: 0
      });
      expect(controls.isAtEnd()).to.equal(true);
    });
    it('returns false when there are more tokens left', () => {
      const controls = controller({
        index: 0,
        length: 10
      });
      expect(controls.isAtEnd()).to.equal(false);
    });
  });

  describe('consume', () => {
    it('throws error when there is nothing left to consume', () => {
      const controls = controller({
        index: 1,
        length: 0
      });
      const consume = controls.consume.bind(
        null,
        'IDENTIFIER',
        'Nothing left to consume'
      );
      expect(consume).to.throw(/^Nothing left/);
    });

    it('throws error when token type does not match', () => {
      const controls = controller({
        index: 0,
        length: 1,
        tokens: [{ type: 'bar' }]
      });
      const consume = controls.consume.bind(null, 'foo', 'Test did not match!');
      expect(consume).to.throw(/Test did not match!/);
    });

    it('increments state.index when type matches', () => {
      const state = {
        index: 0,
        length: 1,
        tokens: [{ type: 'LPAREN' }]
      };
      const controls = controller(state);
      controls.consume('LPAREN');
      expect(state.index).to.equal(1);
    });
  });

  describe('match', () => {
    const state = {
      index: 0,
      length: 1,
      tokens: [{ type: 'AND' }]
    };
    const controls = controller(state);
    it('matches on tokens of same type', () => {
      expect(controls.match('AND')).to.equal(true);
    });
    it('increments state index on match', () => {
      state.index = 1;
    });

    it('returns false when there is not match');
    it('does not increment index when there is not a match');
  });

  describe('matchGroup', () => {
    const controls = controller({
      index: 0,
      length: 22,
      tokens: [{ type: 'matchMe' }, { type: 'matchMe' }]
    });
    it('can match entire token groups', () => {
      expect(
        controls.matchGroup({
          matchMe: 'matchMe',
          dontMatchMe: 'dontMatchMe'
        })
      ).to.equal(true);
    });
  });
});
