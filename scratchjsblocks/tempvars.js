window.sjs_tempvars = [
  Block(BlockType.BUTTON, "tempvarsCategory", "Temporary Variables"),
  Block(BlockType.COMMAND, "setTemp", "set temporary [key] to [value]", {
    key: Argument("string", "key"),
    value: Argument("string", "value"),
  }, ({ key, value }) => {
    window.sjs_tempVariables[key] = value;
  }),
  Block(BlockType.REPORTER, "getTemp", "get temporary [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    return window.sjs_tempVariables[key];
  }),
  Block(BlockType.COMMAND, "delTemp", "delete temporary [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    delete window.sjs_tempVariables[key];
  }),
  Block(BlockType.COMMAND, "clearAllTemp", "clear all temporary variables", {}, () => {
    Object.keys(window.sjs_tempVariables).forEach(key => delete window.sjs_tempVariables[key]);
  }),
  Block(BlockType.REPORTER, "allTempVars", "all temporary variables", {}, () => {
    return JSON.stringify(window.sjs_tempVariables);
  }),
];
