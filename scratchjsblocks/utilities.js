window.sjs_utilities = [
  Block(BlockType.REPORTER, "stringReport", "[arg1]", {
    arg1: Argument("string", "Hello"),
  }),
  Block(BlockType.REPORTER, "ifBoolStringElseString", "If [arg1] then [arg2] else [arg3]", {
    arg1: Argument("Boolean"),
    arg2: Argument("string", "Hello"),
    arg3: Argument("string", "World"),
  }),
  Block(BlockType.REPORTER, "ifBoolString", "If [arg1] then [arg2]", {
    arg1: Argument("Boolean"),
    arg2: Argument("string", "Hello"),
  }),
  Block(BlockType.REPORTER, "outOfBoundsMouseX", "Mouse X (works out of bounds)"),
  Block(BlockType.REPORTER, "outOfBoundsMouseY", "Mouse Y (works out of bounds)"),
  Block(BlockType.BOOLEAN, "outOfBoundsMouseDown", "Mouse down? (works out of bounds)"),
  Block(BlockType.BOOLEAN, "textToBool", "[bool]", {
    bool: Argument("string", "true"),
  }),
  Block(BlockType.REPORTER, "boolToText", "[bool]", {
    bool: Argument("Boolean"),
  }),
];
