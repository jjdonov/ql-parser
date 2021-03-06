const { isAlphaNumeric, isWhiteSpace } = require('../patterns');
const { TOKEN_TYPES, KEYWORDS } = require('../../token/token-types.js');

module.exports = function consumeIdentifier() {
  while (isAlphaNumeric(this.peek()) || this.peek() === '.') {
    this.advance();
  }
  const text = this.currentText();
  if (text.toUpperCase() === 'STARTS' || text.toUpperCase() === 'ENDS') {
    while (isWhiteSpace(this.peek())) {
      this.advance();
    }
    const nextStart = this.current;
    while (isAlphaNumeric(this.peek())) {
      this.advance();
    }
    const next = this.source.substring(nextStart, this.current);
    if (next.toUpperCase() === 'WITH') {
      const tokenType =
        text === 'STARTS' ? TOKEN_TYPES.STARTSWITH : TOKEN_TYPES.ENDSWITH;
      this.addToken(tokenType);
      return;
    }
    throw new Error('Untermined ' + text + ' clause. Next was: ' + next);
  }
  let type = KEYWORDS[text];
  this.addToken(type || TOKEN_TYPES.IDENTIFIER);
};
