const patterns = {};

patterns.isWhiteSpace = (c) => {
  return /^\s+$/.test(c);
};

patterns.isAlpha = (c) => {
  return /^[a-zA-Z]$/.test(c);
};

patterns.isAlphaNumeric = (c) => {
  return /^[a-zA-Z0-9]$/.test(c);
};

patterns.isDigit = (c) => {
  return /^[0-9]$/.test(c);
};

module.exports = patterns;
