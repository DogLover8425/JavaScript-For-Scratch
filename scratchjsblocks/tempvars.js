window.sjs_tempvars = [
  Block(BlockType.COMMAND, "setTemp", "Set temporary [key] to [value]", {
    key: Argument("string", "key"),
    value: Argument("string", "value"),
  }, ({ key, value }) => {
    window.sjs_tempVariables[key] = value;
  }),
  Block(BlockType.REPORTER, "getTemp", "Get temporary [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    return window.sjs_tempVariables[key];
  }),
  Block(BlockType.COMMAND, "delTemp", "Delete temporary [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    delete window.sjs_tempVariables[key];
  }),
  Block(BlockType.COMMAND, "clearAllTemp", "Clear all temporary variables", {}, () => {
    Object.keys(window.sjs_tempVariables).forEach(key => delete window.sjs_tempVariables[key]);
  }),
];
