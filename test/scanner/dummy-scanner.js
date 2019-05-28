module.exports = source => ({
  source: source,
  start: 0,
  current: 1,
  tokens: [],
  peek: function() {
    return this.source[this.current];
  },
  isAtEnd: function() {
    return this.current > this.source.length;
  },
  advance: function() {
    this.current++;
    return this.source.charAt(this.current - 1);
  },
  addToken: function(type, text) {
    this.tokens.push({ type, text });
  }
});
