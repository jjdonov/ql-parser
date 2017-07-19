
function parse(input) {

}

function err() {

}

const parenthesize = (str) => `(${str})`;

function scan(source) {
  return new Scanner(source).scan();
}

/**
 *
 */
class Token {

  constructor(type, lexeme, literal, line, column) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.column = column;
  }

  toString() {
    return parenthesize(
      [this.type, this.lexeme, this.literal].join(' ')
    );
  }

}

/**
 *
 */
class Scanner {

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
      while(isAlphaNumeric(peek())) {
        advance();
      }
      if(peek() === '.' && isAlphaNumeric(peek(1))) {
        advance();
        while(isAlphaNumeric(peek())) {
          advance();
        }
      }
      const text = this.source.substring(start, current);
      let type = keywords(text);
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

function selfRef(...ts) {
  return ts.reduce((acc, next, i) => {
    acc[next] = next;
    return i === ts.length ? Object.freeze(acc) : acc;
  }, {});
}

function parts(whole, ...incl) {
 return Object.keys(whole)
  .filter((k) => incl.indexOf(whole) > -1)
  .reduce((acc, next) => {
    acc[next] = whole[next];
    return acc;
  }, {});
}

const TOKEN_TYPES = selfRef('LPAREN', 'RPAREN',
                            'COMMA', 'DOT', 'AT',
                            /* Operator */
                            'EQ', 'BANG', 'BANGEQ',
                            'GT', 'GTEQ', 'LT', 'LTEQ',
                            'AND', 'OR', 'NOT',
                            /**/
                            'THIS', 'NEXT', 'LAST',
                            'DAY', 'WEEK', 'MONTH', 'YEAR',
                            'TODAY', 'TOMORROW', 'YESTERDAY',
                            'AGO', 'HENCE',
                            /* Literals */
                            'NULL', 'EMPTY',
                            'IDENTIFIER', 'STRING', 'NUMBER'
                           );

const KEYWORDS = parts(TOKEN_TYPES,
                          'AND', 'OR', 'NOT',
                          'THIS', 'NEXT', 'LAST',
                          'DAY', 'WEEK', 'MONTH', 'YEAR',
                          'TODAY', 'TOMORROW', 'YESTERDAY',
                          'AGO', 'HENCE');

const keywords = (k) => KEYWORDS[String.prototype.toUpperCase.call(k)];
module.exports = scan;
