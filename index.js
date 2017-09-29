const ASTPrinter = require('./src/visitor/ast-printer.js');
const Scanner = require('./src/scanner.js');
const Parser = require('./src/parser.js');
const Interpreter = require('./src/visitor/interpreter.js');

function parse(input) {
  try{
    console.log(`Parsing input: ${input}`);
    const tokens = new Scanner(input).scan();
    console.log(`TOKENS ->
                ${tokens}`);
    const ast = new Parser(tokens).parse();
    console.log(`AST ->
                ${ASTPrinter.visit(ast)}`);
    console.log('EVAL');
    const fun = Interpreter.interpret(ast);
    console.log(' Result: ' + fun({poNumber: "123"}));
  } catch(e) {
    console.log(`*** FAILURE *** ->
                ${e.message}`);
  }
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
//console.log('\n------\n');
//parse('poNumber = "123" OR poNumber = "456"');
//console.log('\n------\n');
//parse('poNumber = "123" AND poNumber = "456"');
//console.log('\n------\n');
//parse('poNumber != "123"');
//console.log('\n------\n');
//parse('!poNumber = "123"');
//console.log('\n------\n');
//parse('!!poNumber = "123"');
//console.log('\n------\n');
//parse('poNumber STARTS WITH "123"');
