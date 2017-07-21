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

const KEYWORDS = selfRef(
  'AND', 'OR', 'NOT',
  'THIS', 'NEXT', 'LAST', 'IN',
  ...simplePlural('DAY', 'WEEK', 'MONTH', 'YEAR'),
  'TODAY', 'TOMORROW', 'YESTERDAY',
  'AGO', 'HENCE');

const LITERALS = selfRef(
  'NULL', 'EMPTY',
  'IDENTIFIER', 'STRING', 'NUMBER'
);

const OPERATORS = selfRef(
  'EQ', 'BANG', 'BANGEQ',
  'GT', 'GTEQ', 'LT', 'LTEQ'
);

module.exports.TOKEN_TYPES = join(
  selfRef(
    'LPAREN', 'RPAREN', 'EOF',
    'COMMA', 'DOT', 'AT'),
    LITERALS, OPERATORS, KEYWORDS);

const isInTokenGroup = (group) => (key) => group[String.prototype.toUpperCase.call(key)];

module.exports.keyword = isInTokenGroup(KEYWORDS);
module.exports.literal = isInTokenGroup(LITERALS);
module.exports.operator = isInTokenGroup(OPERATORS);

