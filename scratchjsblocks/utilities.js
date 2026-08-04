window.sjs_utilities = [
  Block(BlockType.BUTTON, "utilitiesCategory", "General Utilities"),
  Block(BlockType.REPORTER, "stringReport", "[arg1]", {
    arg1: Argument("string", "Hello"),
  }, ({ arg1 }) => arg1),
  Block(BlockType.REPORTER, "ifBoolStringElseString", "if [arg1] then [arg2] else [arg3]", {
    arg1: Argument("Boolean"),
    arg2: Argument("string", "Hello"),
    arg3: Argument("string", "World"),
  }, ({ arg1, arg2, arg3 }) => arg1 ? arg2 : arg3),
  Block(BlockType.REPORTER, "ifBoolString", "if [arg1] then [arg2]", {
    arg1: Argument("Boolean"),
    arg2: Argument("string", "Hello"),
  }, ({ arg1, arg2 }) => {
    if (arg1) {
      return arg2;
    }
    return "";
  }),
  Block(BlockType.REPORTER, "outOfBoundsMouseX", "mouse x (works out of bounds)", {}, () => window.cursor_x),
  Block(BlockType.REPORTER, "outOfBoundsMouseY", "mouse y (works out of bounds)", {}, () => window.cursor_y),
  Block(BlockType.BOOLEAN, "outOfBoundsMouseDown", "mouse down? (works out of bounds)", {}, () => window.cursor_down),
  Block(BlockType.BOOLEAN, "textToBool", "[bool]", {
    bool: Argument("string", "true"),
  }, ({ bool }) => (
    bool === "true" ||
    bool === "1" ||
    bool === "True" ||
    (bool !== "0" && bool !== "false" && bool !== "False")
  )),
  Block(BlockType.REPORTER, "boolToText", "[bool]", {
    bool: Argument("Boolean"),
  }, ({ bool }) => new Boolean(bool).toString()),
];
