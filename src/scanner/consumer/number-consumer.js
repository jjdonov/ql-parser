module.exports = function consumeNumber() {
  while(isDigit(scanner.peek())) {
    scanner.advance();
  }
  if(scanner.peek() === '.' && isDigit(scanner.peek(1))) {
      scanner.advance();
      while(isDigit(scanner.peek())) {
        scanner.advance();
      }
  }
  const num = Number.parseFloat(scanner.currentText());
  scanner.addToken(TOKEN_TYPES.NUMBER, num);
};

