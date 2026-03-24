window.sjs_utilities = [
  Block(BlockType.REPORTER, "stringReport", "[arg1]", {
    arg1: Argument("string", "Hello"),
  }, ({ arg1 }) => arg1),
  Block(BlockType.REPORTER, "ifBoolStringElseString", "If [arg1] then [arg2] else [arg3]", {
    arg1: Argument("Boolean"),
    arg2: Argument("string", "Hello"),
    arg3: Argument("string", "World"),
  }, ({ arg1, arg2, arg3 }) => arg1 ? arg2 : arg3),
  Block(BlockType.REPORTER, "ifBoolString", "If [arg1] then [arg2]", {
    arg1: Argument("Boolean"),
    arg2: Argument("string", "Hello"),
  }, ({ arg1, arg2 }) => {
    if (arg1) {
      return arg2;
    }
    return "";
  }),
  Block(BlockType.REPORTER, "outOfBoundsMouseX", "Mouse X (works out of bounds)", {}, () => window.cursor_x),
  Block(BlockType.REPORTER, "outOfBoundsMouseY", "Mouse Y (works out of bounds)", {}, () => window.cursor_y),
  Block(BlockType.BOOLEAN, "outOfBoundsMouseDown", "Mouse down? (works out of bounds)", {}, () => window.cursor_down),
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
