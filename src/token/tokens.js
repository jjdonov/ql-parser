function selfRef(...ts) {
  return ts.reduce((acc, next, i) => {
    acc[next] = next;
    return i === ts.length ? Object.freeze(acc) : acc;
  }, {});
}

function join(...args) {
  return Object.freeze(
    Object.assign({}, ...args)
  );
}

function simplePlural(...words) {
  return words.map((word) => word + 'S');
}

module.exports.KEYWORDS = selfRef(
  'AND', 'OR', 'NOT',
  'THIS', 'NEXT', 'LAST', 'IN',
  ...simplePlural('DAY', 'WEEK', 'MONTH', 'YEAR'),
  'TODAY', 'TOMORROW', 'YESTERDAY',
  'AGO', 'HENCE');

module.exports.LITERALS = selfRef(
  'NULL', 'EMPTY',
  'IDENTIFIER', 'STRING', 'NUMBER'
);

module.exports.OPERATORS = selfRef(
  'EQ', 'BANG', 'BANGEQ',
  'GT', 'GTEQ', 'LT', 'LTEQ',
  'STARTSWITH', 'ENDSWITH', 'CONTAINS'
);

module.exports.TOKEN_TYPES = join(
  selfRef(
    'LPAREN', 'RPAREN', 'EOF',
    'COMMA', 'DOT', 'AT'),
  module.exports.LITERALS,
  module.exports.OPERATORS,
  module.exports.KEYWORDS);

const getFromTokenGroup = (group) => (key) => group[String.prototype.toUpperCase.call(key)];

module.exports.keyword = getFromTokenGroup(module.exports.KEYWORDS);
module.exports.literal = getFromTokenGroup(module.exports.LITERALS);
module.exports.operator = getFromTokenGroup(module.exports.OPERATORS);

