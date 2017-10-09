const patterns = require('../../src/scanner/patterns');
const expect = require('chai').expect;

describe('patterns', () => {

  describe('isWhiteSpace', () => {
    it('rejects non-whitespace single character', () => {
      expect(patterns.isWhiteSpace('h')).to.equal(false);
    });
    it('rejects non-whitespace multicharacter', () => {
      expect(patterns.isWhiteSpace('haskfjasfk')).to.equal(false);
    });
    it('accepts single white space character', () => {
      expect(patterns.isWhiteSpace(' ')).to.equal(true);
    });
    it('accepts multiple white space characters', () => {
      expect(patterns.isWhiteSpace('\n\t    ')).to.equal(true);
    });
    it('rejects mixed sets', () => {
      expect(patterns.isWhiteSpace('\n\t hello there')).to.equal(false);
    });
    it('rejects the empty string', () => {
      expect(patterns.isWhiteSpace('')).to.equal(false);
    });
  });

  describe('isAlpha', () => {
    it('rejects non-alpha single character', () => {
      expect(patterns.isAlpha('1')).to.equal(false);
      expect(patterns.isAlpha('!')).to.equal(false);

    });
    it('rejects non-alpha multicharacter', () => {
      expect(patterns.isAlpha('!?123')).to.equal(false);
    });
    it('accepts single alpha character', () => {
      expect(patterns.isAlpha('a')).to.equal(true);
      expect(patterns.isAlpha('A')).to.equal(true);
    });
    it('accepts multiple alpha characters', () => {
      expect(patterns.isAlpha('safkjA')).to.equal(true);
    });
    it('rejects mixed sets', () => {
      expect(patterns.isAlpha('jol124')).to.equal(false);
    });
    it('rejects the empty string', () => {
      expect(patterns.isAlpha('')).to.equal(false);
    });
  });

  describe('isAlphaNumeric', () => {
    it('rejects non-alphaNumeric single character', () => {
      expect(patterns.isAlphaNumeric('&')).to.equal(false);
    });
    it('rejects non-alphaNumeric multicharacter', () => {
      expect(patterns.isAlphaNumeric('%$\'')).to.equal(false);
    });
    it('accepts single alphaNumeric character', () => {
      expect(patterns.isAlphaNumeric('a')).to.equal(true);
      expect(patterns.isAlphaNumeric('X')).to.equal(true);
      expect(patterns.isAlphaNumeric('8')).to.equal(true);
    });
    it('accepts multiple alphaNumeric characters', () => {
      expect(patterns.isAlphaNumeric('a123J')).to.equal(true);
    });
    it('rejects mixed sets', () => {
      expect(patterns.isAlphaNumeric('')).to.equal(false);
    });
  });

  describe('isDigit', () => {
    it('rejects non-digit single character', () => {
      expect(patterns.isDigit('a')).to.equal(false);
      expect(patterns.isDigit('G')).to.equal(false);
      expect(patterns.isDigit('!')).to.equal(false);
    });
    it('rejects non-digit multicharacter', () => {
      expect(patterns.isDigit('AshK')).to.equal(false);
    });
    it('accepts single digit character', () => {
      expect(patterns.isDigit('1')).to.equal(true);
      expect(patterns.isDigit('9')).to.equal(true);
      expect(patterns.isDigit('0')).to.equal(true);
    });
    it('accepts multiple digit characters', () => {
      expect(patterns.isDigit('13456')).to.equal(true);
    });
    it('rejects mixed sets', () => {
      expect(patterns.isDigit('12aB!')).to.equal(false);
    });
    it('reject the empty string', () => {
      expect(patterns.isDigit('')).to.equal(false);
    });
  });

});
