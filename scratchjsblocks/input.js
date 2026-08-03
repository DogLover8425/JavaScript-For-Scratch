window.sjs_input = [
  Block(BlockType.BUTTON, "inputCategory", "Input"),
  Block(BlockType.REPORTER, "lastKeyPressed", "last key pressed", {}, () => {
    return window.sjs_lastKey;
  }),
  Block(BlockType.REPORTER, "mouseWheelDelta", "mouse wheel delta", {}, () => {
    return window.sjs_wheelDelta;
  }),
  Block(BlockType.REPORTER, "mouseX", "mouse x", {}, () => {
    return window.cursor_x;
  }),
  Block(BlockType.REPORTER, "mouseY", "mouse y", {}, () => {
    return window.cursor_y;
  }),
  Block(BlockType.REPORTER, "getPressedKeys", "get all pressed keys", {}, () => {
    return JSON.stringify(Object.keys(window.pressedKeys).filter(key => window.pressedKeys[key]));
  }),
  Block(BlockType.HAT, "whenKeyPressed", "when key [key] is pressed", {
    key: Argument("string", "a"),
  }, ({ key }) => {
    return Boolean(window.pressedKeys[key]);
  }),
];
