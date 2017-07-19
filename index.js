const Scanner = require('./src/scanner.js');

function parse(input) {

}

function err() {

}


function scan(source) {
  return new Scanner(source).scan();
}

console.log(`Results
           ${scan('poNumber = "12345"')} `);

module.exports = scan;
