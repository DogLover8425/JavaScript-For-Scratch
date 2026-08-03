window.sjs_controlflow = [
  Block(BlockType.BUTTON, "controlflowCategory", "Control Flow"),
  Block(BlockType.HAT, "whenEqual", "when [value] equals [othervalue]", {
    value: Argument("string", "1"),
    othervalue: Argument("string", "1"),
  }, ({ value, othervalue }) => {
    return Boolean(value === othervalue);
  }),
  Block(BlockType.HAT, "whenCondition", "when [condit] is true", {
    condit: {
      type: "Boolean",
      defaultValue: "Put any boolean block here",
    },
  }, ({ condit }) => {
    return Boolean(condit);
  }),
  Block(BlockType.LOOP, "forInLoop", "for i in [value]", {
    value: Argument("string", "10"),
  }, ({ value }, util) => {
    if (!window.sjs_inLoop) {
      window.sjs_i = 0;
    }
    if (++window.sjs_i <= value) {
      window.sjs_inLoop = true;
      util.startBranch(1, true);
    } else {
      window.sjs_i = 0;
      window.sjs_inLoop = false;
    }
  }),
  Block(BlockType.REPORTER, "iReporter", "i", {}, () => window.sjs_i),
  Block(BlockType.COMMAND, "setI", "set i to [value]", {
    value: Argument("number", 0),
  }, ({ value }) => {
    window.sjs_i = value;
  }),
];
