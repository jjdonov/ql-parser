const {
  isWhiteSpace,
  isAlpha,
  isAlphaNumeric,
  isDigit,
  isDate,
  isTime
} = require('./patterns');
const {TOKEN_TYPES, KEYWORDS} = require('../token/token-types.js');

module.exports = (scanner) => {
  while(!scanner.isAtEnd()) {
    scanner.start = scanner.current;
    const c = scanner.advance();
    switch(c) {
      case '(':
        scanner.addToken(TOKEN_TYPES.LPAREN);
        break;
      case ')':
        scanner.addToken(TOKEN_TYPES.RPAREN);
        break;
      case ',':
        scanner.addToken(TOKEN_TYPES.COMMA);
        break;
      case '.':
        scanner.addToken(TOKEN_TYPES.DOT);
        break;
      case '@':
        scanner.addToken(TOKEN_TYPES.AT);
        break;
      case '=':
        scanner.addToken(TOKEN_TYPES.EQ);
        break;
      case '!':
        scanner.addToken(match('=') ? TOKEN_TYPES.BANGEQ : TOKEN_TYPES.BANG);
        break;
      case '>':
        scanner.addToken(match('=') ? TOKEN_TYPES.GTEQ : TOKEN_TYPE.GT);
        break;
      case '<':
        scanner.addToken(match('=') ? TOKEN_TYPES.LTEQ : TOKEN_TYPE.LT);
        break;
      //ignore whitespace
      case ' ':
      case '\r':
      case '\n':
        break;
      case '\'':
        if(isDate(scanner.peek(9))) {
          scanner.date();
          let closingQuote = scanner.advance();
          if(closingQuote !== '\'') {
            throw new Error(`Unterminated quoted date: ${closingQuote}`);
          }
        } else if(isTime(scanner.peek(11))) {
          scanner.time();
          let closingQuote = scanner.advance();
          if(closingQuote !== '\'') {
            throw new Error(`Unterminated quoted time: ${closingQuote}`);
          }
        } else {
          scanner.string(c);
        }
        break;
      case '"':
        scanner.string(c);
        break;
      default:
        if(isDate(c + scanner.peek(9))) {
          scanner.date(c);
        } else if(isTime(c + scanner.peek(11))) {
          throw new Error('we have no time to talk about time');
        } else if(isDigit(c)){
          scanner.number();
        } else if (isAlpha(c)) {
          scanner.identifier();
        } else {
          //err();
          throw new Error(`Unknown token: ${c}
                          Tokens consumed so far: ${scanner.tokens}`);
        }
        break;
    }
  }
  scanner.addToken(TOKEN_TYPES.EOF);
};
