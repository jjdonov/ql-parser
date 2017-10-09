const interpretSimple = (simpleCondition) => {
  const accessor = ObjectPath.createAccessor(simpleCondition.lhs.lexeme);
  const operation =  foo(simpleCondition.operator);
  return (o) => {
    const lhsVal = accessor(o);
    return operation(lshVal, simpleCondition.rhs.literal);
  };
};


