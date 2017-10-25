const {TOKEN_TYPES} = require('../../token/token-types');

module.exports = function consumeDate(c) {
  const year = c + this.advance(3);
  this.advance();
  const month = this.advance(2);
  this.advance();
  const day = this.advance(2);
  this.addToken(TOKEN_TYPES.DATE, {year, month, day});
};
