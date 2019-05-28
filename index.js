/*eslint-disable no-console*/
const ASTPrinter = require('./src/visitor/ast-printer.js');
const Scanner = require('./src/scanner');
const Parser = require('./src/parser');
const Interpreter = require('./src/visitor/interpreter.js');

function parse(input) {
  const seed = [
    {
      poNumber: '123',
      orderTerms: {
        orderDate: {
          Issue: '2017-15-21'
        }
      }
    },
    {
      poNumber: '456',
      orderTerms: {
        orderDate: {
          Issue: '2017-15-20'
        }
      }
    }
  ];

  try {
    console.log(`Parsing input: ${input}`);
    console.log('Operating on:\n' + JSON.stringify(seed, null, 4));
    const tokens = new Scanner(input).scan();
    tokens.forEach((t, i) => {
      if (!t.type) {
        console.log(`t${i} is malformed`);
        console.log(JSON.stringify(t));
      }
    });
    console.log(`TOKENS ->
                ${tokens}`);
    const ast = new Parser(tokens).parse();
    console.log(`AST ->
                ${ASTPrinter.visit(ast)}`);
    console.log('EVAL');
    const fun = Interpreter.interpret(ast);
    const result = seed.filter(fun);
    console.log(' Result: ' + JSON.stringify(result, null, 4));
  } catch (e) {
    console.log(`*** FAILURE *** ->
                ${e.stack}`);
  }
}

//function err() {}
//
//function scan(input) {
//  return new Scanner(input).scan();
//}

//console.log(`Results
//           ${scan('poNumber = "12345"')}
//           ${scan('OrderTerms.orderDate.Issue IN @(LAST 30 DAYS)')}
//            ** PARSE **
//           ${parse('poNumber = "123"')}`);

//parse('poNumber = "123"');
parse("orderTerms.orderDate.Issue = '2017-15-21'");
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
