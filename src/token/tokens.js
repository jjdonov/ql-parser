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

module.exports.TOKEN_TYPES = selfRef('LPAREN', 'RPAREN',
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

module.exports.KEYWORDS = parts(module.exports.TOKEN_TYPES,
                          'AND', 'OR', 'NOT',
                          'THIS', 'NEXT', 'LAST',
                          'DAY', 'WEEK', 'MONTH', 'YEAR',
                          'TODAY', 'TOMORROW', 'YESTERDAY',
                          'AGO', 'HENCE');

module.exports.keyword = (k) => module.exports.KEYWORDS[String.prototype.toUpperCase.call(k)];
