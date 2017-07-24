const Scanner = require('./src/scanner.js');
const Parser = require('./src/parser.js');

function parse(input) {
  const tokens = new Scanner(input).scan();
  console.log(`TOKENS ->
              ${tokens}`);
  new Parser(tokens).parse();
}

function err() {

}

function scan(input) {
  return new Scanner(input).scan();
}

//console.log(`Results
//           ${scan('poNumber = "12345"')}
//           ${scan('OrderTerms.orderDate.Issue IN @(LAST 30 DAYS)')}
//            ** PARSE **
//           ${parse('poNumber = "123"')}`);

parse('poNumber = "123"');
console.log('\n------\n');
parse('poNumber = "123" OR poNumber = "456"');
console.log('\n------\n');
parse('poNumber = "123" AND poNumber = "456"');
console.log('\n------\n');
parse('poNumber != "123"');
module.exports = scan;
