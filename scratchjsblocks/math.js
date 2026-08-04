window.sjs_math = [
  Block(BlockType.BUTTON, "mathCategory", "Math"),
  Block(BlockType.REPORTER, "powerBlock", "[base] ^ [exponent]", {
    base: { type: "number", defaultValue: 2 },
    exponent: { type: "number", defaultValue: 3 },
  }, ({ base, exponent }) => Math.pow(base, exponent)),
  Block(
    BlockType.REPORTER,
    "clampBlock",
    "clamp [value] between [min] and [max]",
    {
      value: Argument("number", 15),
      min: Argument("number", 0),
      max: Argument("number", 10),
    }, ({ value, min, max }) => Math.min(Math.max(value, min), max)),
  Block(
    BlockType.REPORTER,
    "roundNumber",
    "round [number] to [decimals] decimal places",
    {
      number: Argument("number", 3.14159),
      decimals: Argument("number", 2),
    }, ({ number, decimals }) => Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)),
  Block(BlockType.REPORTER, "percentageBlock", "[percentage]% of [whole]", {
    percentage: Argument("number", 25),
    whole: Argument("number", 100),
  }, ({ percentage, whole }) => (percentage / 100) * whole),
  Block(BlockType.REPORTER, "increment", "[value]++", {
    value: Argument("number", 5),
  }, ({ value }) => Number(value) + 1),
  Block(BlockType.REPORTER, "decrement", "[value]--", {
    value: Argument("number", 5),
  }, ({ value }) => Number(value) - 1),
  Block(BlockType.BOOLEAN, "isEven", "[number] is even", {
    number: Argument("number", 4),
  }, ({ number }) => Number(number) % 2 === 0),
  Block(BlockType.BOOLEAN, "isOdd", "[number] is odd", {
    number: Argument("number", 3),
  }, ({ number }) => Number(number) % 2 !== 0),
  Block(BlockType.BOOLEAN, "isInt", "[number] is an integer", {
    number: Argument("number", 3.14),
  }, ({ number }) => Number.isInteger(Number(number))),
  Block(BlockType.BOOLEAN, "isFinite", "[number] is finite", {
    number: Argument("number", 3.14),
  }, ({ number }) => isFinite(Number(number))),
  Block(BlockType.BOOLEAN, "isNumber", "[number] is a number", {
    number: Argument("number", 6),
  }, ({ number }) => !isNaN(Number(number))),
  Block(BlockType.BOOLEAN, "isFloat", "[number] has decimals", {
    number: Argument("number", 2.71),
  }, ({ number }) => !Number.isInteger(Number(number))),
  Block(BlockType.REPORTER, "evalExpr", "evaluate math [expr]", {
    expr: Argument("string", "2 + 2"),
  }, ({ expr }) => eval(expr)),
];
