window.sjs_tempvars = [
  Block(BlockType.COMMAND, "setTemp", "Set temporary [key] to [value]", {
    key: Argument("string", "key"),
    value: Argument("string", "value"),
  }, ({ key, value }) => {
    tempVariables[key] = value;
  }),
  Block(BlockType.REPORTER, "getTemp", "Get temporary [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    return tempVariables[key];
  }),
  Block(BlockType.COMMAND, "delTemp", "Delete temporary [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    delete tempVariables[key];
  }),
  Block(BlockType.COMMAND, "clearAllTemp", "Clear all temporary variables"),
];
