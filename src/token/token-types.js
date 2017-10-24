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
  return words.concat(words.map((word) => word + 'S'));
}


//Date Token Sub Groups
const DATE_UNIT = selfRef(...simplePlural('DAY', 'WEEK', 'MONTH', 'YEAR'));
const SINGLE_DATE = selfRef('TODAY', 'TOMORROW', 'YESTERDAY');
const INCLUSION = {};
const DATE_RANGE_INDICATOR = selfRef('THIS', 'LAST', 'NEXT');
const DATE_DIRECTION = selfRef('AGO', 'HENCE');

//Token Super Groups
module.exports.KEYWORDS = join(
  selfRef('AND', 'OR', 'NOT'),
  DATE_UNIT, SINGLE_DATE, DATE_RANGE_INDICATOR, DATE_DIRECTION
);

module.exports.LITERALS = selfRef(
  'NULL', 'EMPTY',
  'IDENTIFIER', 'STRING', 'NUMBER', 'DATE'
);

module.exports.OPERATORS = selfRef(
  'EQ', 'BANG', 'BANGEQ','IN',
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

//const getFromTokenGroup = (group) => (key) => group[String.prototype.toUpperCase.call(key)];
//module.exports.keyword = getFromTokenGroup(module.exports.KEYWORDS);
//module.exports.literal = getFromTokenGroup(module.exports.LITERALS);
//module.exports.operator = getFromTokenGroup(module.exports.OPERATORS);
