const {TOKEN_TYPES} = require('../../token/token-types.js');

module.exports = function consumeString(quoteType) {
      while(!this.isAtEnd() && this.peek() !== quoteType) {
        this.advance();
      }
      if(this.isAtEnd()) {
        throw new Error('Should call err: EOF unterminated string');
      }
      this.advance();
      const text = this.source.substring(this.start + 1, this.current - 1);
      //TODO: this may have been a SINGLE QUOTE date literal. Date literals
      //do not exist within double quotes.
      this.addToken(TOKEN_TYPES.STRING, text);
};
