module.exports = parserState => {
  const peek = (distance = 0) => {
    const targetIndex = parserState.index + distance;
    if (targetIndex < 0 || targetIndex > parserState.length) {
      throw new RangeError(
        `Cannot peek at ${targetIndex} it is outside the range 0 -> ${
          parserState.length
        }`
      );
    }
    const targetToken = parserState.tokens[targetIndex];
    return targetToken;
  };

  const isAtEnd = () => parserState.length < parserState.index;

  const previous = () => peek(-1);

  const consume = (type, message) => {
    if (isAtEnd() || peek().type !== type) {
      throw new Error(message);
    }
    parserState.index++;
  };

  const matchGroup = group => {
    return match(...Object.values(group));
  };

  const match = (...tokenTypes) => {
    const matches = tokenTypes.some(type => check(type));
    if (matches) {
      parserState.index++;
    }
    return matches;
  };

  const check = tokenType => {
    if (isAtEnd()) {
      return false;
    }
    return peek().type === tokenType;
  };

  return {
    peek,
    isAtEnd,
    previous,
    consume,
    match,
    matchGroup
  };
};
