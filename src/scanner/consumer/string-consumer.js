const {TOKEN_TYPES} = require('../../token/token-types');
const patterns = require('../patterns');

module.exports = function consumeString(quoteType) {
  while(!this.isAtEnd() && this.peek() !== quoteType) {
    this.advance();
  }
  if(this.isAtEnd()) {
    throw new Error('Should call err: EOF unterminated string');
  }
  this.advance();
  const text = this.source.substring(this.start + 1, this.current - 1);
  if(quoteType === '\'' && patterns.isDate(text)) {
    this.addToken(TOKEN_TYPES.DATE, text);
  } else {
    this.addToken(TOKEN_TYPES.STRING, text);
  }
};
