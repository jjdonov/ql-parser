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
    const retVal = this.source.substr(this.current, distance);
    this.current += distance;
    return retVal;
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  match(expectedChar) {
    if(this.isAtEnd()) {
      return false;
    }
    if(this.peek() !== expectedChar) {
      return false;
    }
    this.current++;
    return true;
  }

  peek(distance = 0) {
    if(this.isAtEnd()) {
      return '\0';
    }
    return this.source.substr(this.current, 1 + distance);
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
