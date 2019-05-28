/**
 *
 */
module.exports = class Token {
  constructor(type, lexeme, literal, line, column) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
    this.column = column;
  }

  toString() {
    return parenthesize([this.type, this.lexeme, this.literal].join(' '));
  }
};

const parenthesize = str => `(${str})`;
