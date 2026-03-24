window.sjs_controlflow = [
  Block(BlockType.HAT, "whenCondition", "when [condit] is true", {
    condit: {
      type: "Boolean",
      defaultValue: "Put any boolean block here",
    },
  }),
  Block(BlockType.LOOP, "forInLoop", "For i in [value]", {
    value: Argument("string", "10"),
  }),
  Block(BlockType.REPORTER, "iReporter", "i"),
  Block(BlockType.COMMAND, "setI", "Set i to [value]", {
    value: Argument("number", 0),
  }, ({ value }) => {
    i = value;
  }),
];
