const {TOKEN_TYPES, KEYWORDS} = require('../token/token-types.js');
const Token = require('../token/token.js');
const Consumer = require('./consumer');
const doScan = require('./scan-fn');

module.exports = class Scanner {

  constructor(source) {
    this.source = source;
    this.start = 0;
    this.current = 0;
    this.line = 1;
    this.tokens = [];
    Object.assign(this, Consumer.allConsumers(this)); //number, string, identifier...
  }

  advance(distance = 1) {
    this.current += distance;
    return this.source.charAt(this.current - 1);
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  match(expectedChar) {
    if(this.isAtEnd()) {
      return false;
    }
    if(this.source.charAt(current) !== expectedChar) {
      return false;
    }
    this.current++;
    return true;
  }

  peek(distance = 0) {
    if(this.isAtEnd()) {
      return '\0';
    }
    return this.source.charAt(this.current + distance);
  }

  currentText() {
    return this.source.substring(this.start, this.current);
  }

  addToken(type, literal) {
    const token = new Token(type, this.currentText(), literal, this.line, this.current);
    this.tokens.push(token);
  }

  scan() {
     doScan(this);
     return this.tokens;
  }

};
