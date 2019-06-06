const { TOKEN_TYPES } = require('../../token/token-types');

module.exports = function consumeDate(c) {
  const year = c ? c + this.advance(3) : this.advance(4);
  this.advance();
  const month = this.advance(2);
  this.advance();
  const day = this.advance(2);
  //TODO: validation should live in parser?
  this.addToken(TOKEN_TYPES.DATE, new Date(`${year}-${month}-${day}`));
};
