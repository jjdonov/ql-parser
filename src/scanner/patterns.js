const patterns = {};

patterns.isWhiteSpace = (c) => {
  return /^\s+$/.test(c);
};

patterns.isAlpha = (c) => {
  return /^[a-zA-Z]+$/.test(c);
};

patterns.isAlphaNumeric = (c) => {
  return /^[a-zA-Z0-9]+$/.test(c);
};

patterns.isDigit = (c) => {
  return /^[0-9]+$/.test(c);
};

/**
 * yyyy-MM-dd
 */
patterns.isDate = (c) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(c);
};

/**
 * hh:mm:ss.uuu
 */
patterns.isTime = (c) => {
  return /^\d{2}:\d{2}:\d{2}.\d{3}$/.test(c);
};

/**
 * hh:mm:ss.uuu ZZZ
 */
patterns.isTimeWithTimeZone = (c) => {
  return /^\d{2}:\d{2}:\d{2}.\d{3}\s+[A-Z]{3}$/.test(c);
};

/**
 * yyyy-MM-dd hh:mm:ss.uuu
 */
patterns.isDateTime = (c) => {
  return /^\d{4}-\d{2}-d{\2}\s+\d{2}:\d{2}:\d{2}.\d{3}$/.test(c);
};

/**
 * yyyy-MM-dd hh:mm:ss.uuu ZZZ
 */
patterns.isDateTimeWithTimeZone = (c) => {
  return /^\d{4}-\d{2}-d{\2}\s+\d{2}:\d{2}:\d{2}.\d{3}\s+[A-Z]{3}$/.test(c);
};

/**
 * checks if the string matches any of the date time patterns
 *
 * @return [Boolean, Type]
 */
patterns.isDateLiteral = (c) => {

};

module.exports = patterns;
