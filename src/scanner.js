const {TOKEN_TYPES, KEYWORDS, keyword} = require('./token/tokens.js');
const Token = require('./token/token.js');

/**
 *
 */
module.exports = class Scanner {

  constructor(source) {
    this.source = source;
    this.tokens = [];
  }

  scan() {
    let start = 0,
      current = 0,
      line = 1;

    const advance = (distance = 1) => {
        current += distance;
        return this.source.charAt(current - 1);
    };

    const isAtEnd = () => {
      return current >= this.source.length;
    };

    const match = (expecedChar) => {

    };

    const peek = (distance = 0) => {
      if(isAtEnd()) {
        return '\0';
      }
      return this.source.charAt(current + distance);
    };

    //identifying
    const isAlpha = (c) => {
      return /[a-zA-Z]/.test(c);
    };

    const isAlphaNumeric = (c) => {
      return /[a-zA-Z0-9]/.test(c);
    };

    const isDigit = (c) => {
      return /[0-9]/.test(c);
    };

    //adding tokens
    const identifier = () => {
      while(isAlphaNumeric(peek()) || peek() === '.') {
        advance();
      }
      const text = this.source.substring(start, current);
      let type = keyword(text);
      addToken(type || TOKEN_TYPES.IDENTIFIER);
    };

    const number = () => {
      while(isDigit(peek())) {
        advance();
      }
      if(peek() === '.' && isDigit(peek(1))) {
          advance();
          while(isDigit(peek())) {
            advance();
          }
      }
      addToken(TOKEN_TYPES.NUMBER, Number.parseFloat(this.source.substring(start, current)));
    };

    const string = (quoteType) => {
      while(!isAtEnd() && peek() !== quoteType) {
        advance();
      }
      if(isAtEnd()) {
        throw new Error('Should call err: EOF unterminated string');
      }
      advance();
      const text = this.source.substring(start + 1, current - 1);
      addToken(TOKEN_TYPES.STRING, text);
    };

    const addToken = (type, literal) => {
      const text = this.source.substring(start, current);
      this.tokens.push(new Token(type, text, literal, line, current));
    };

    //scanning
    const scanToken = () => {
      const c = advance();
      switch(c) {
        case '(':
          addToken(TOKEN_TYPES.LPAREN);
          break;
        case ')':
          addToken(TOKEN_TYPES.RPAREN);
          break;
        case ',':
          addToken(TOKEN_TYPES.COMMA);
          break;
        case '.':
          addToken(TOKEN_TYPES.DOT);
          break;
        case '@':
          addToken(TOKEN_TYPES.AT);
          break;
        case '=':
          addToken(TOKEN_TYPES.EQ);
          break;
        case '!':
          addToken(match('=') ? TOKEN_TYPES.BANGEQ : TOKEN_TYPES.BANG);
          break;
        case '>':
          addToken(match('=') ? TOKEN_TYPES.GTEQ : TOKEN_TYPE.GT);
          break;
        case '<':
          addToken(match('=') ? TOKEN_TYPES.LTEQ : TOKEN_TYPE.LT);
          break;
        //ignore whitespace
        case ' ':
        case '\r':
        case '\n':
          break;
        case '"':
        case '\'':
          string(c);
          break;
        default:
          if(isDigit(c)) {
            number();
          } else if (isAlpha(c)) {
            identifier();
          } else {
            err();
          }
          break;
      }
    };

    while(!isAtEnd()) {
      start = current;
      scanToken();
    }
    this.tokens.push(new Token('EOF', '', null, line, current));
    return this.tokens;
  }
}


