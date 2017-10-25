const patterns = require('../patterns');
const {TOKEN_TYPES} = require('../../token/token-types');

module.exports = function consumeNumber() {
  while(patterns.isDigit(this.peek())) {
    this.advance();
  }
  if(this.peek() === '.' && patterns.isDigit(this.peek(1))) {
      this.advance();
      while(patterns.isDigit(this.peek())) {
        this.advance();
      }
  }
  const num = Number.parseFloat(this.currentText());
  //TODO: we need to continue to check if there is time/tz/etc.
  this.addToken(TOKEN_TYPES.NUMBER, num);
};

