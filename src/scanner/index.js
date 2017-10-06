const Scanner = require('./scanner');

module.exports = class IScanner {

  constructor(source) {
    this.scanner = new Scanner(source);
  }

  scan() {
   return this.scanner.scan();
  }

};
