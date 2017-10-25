const patterns = require('../patterns');
const {TOKEN_TYPES} = require('../../token/token-types');

module.exports = function consumeNumber() {
  while(isDigit(this.peek())) {
    this.advance();
  }
  if(this.peek() === '.' && patterns.isDigit(this.peek(1))) {
      this.advance();
      while(patterns.isDigit(this.peek())) {
        this.advance();
      }
  }
  const num = Number.parseFloat(this.currentText());
  this.addToken(TOKEN_TYPES.NUMBER, num);
};

