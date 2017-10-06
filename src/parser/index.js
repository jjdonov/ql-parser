const controls = require('./controls');
const {query} = require('./rd-parser');

module.exports = class Parser {

  constructor(tokens) {
    this.tokens = tokens;
  }

  parse() {
    if(!this.tokens || !this.tokens.length) {
      return;
    }
    const state = {
      tokens: this.tokens,
      index: 0,
      length: this.tokens.length
    };
    const controller = controls(state);
    try {
      return query(controller);
    } catch(e) {
      console.log(`
                  Exception occured while parsing.
                  state dump:
                    index: ${state.index}
                    current token: ${state.tokens[state.index]}
                  `);
      throw e;
    }
  }

};

