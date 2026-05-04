window.sjs_input = [
  Block(BlockType.BUTTON, "inputCategory", "Input"),
  Block(BlockType.REPORTER, "lastKeyPressed", "Last key pressed", {}, () => {
    return window.sjs_lastKey;
  }),
  Block(BlockType.REPORTER, "mouseWheelDelta", "Mouse wheel delta", {}, () => {
    return window.sjs_wheelDelta;
  }),
  Block(BlockType.REPORTER, "mouseX", "Mouse X position", {}, () => {
    return window.cursor_x;
  }),
  Block(BlockType.REPORTER, "mouseY", "Mouse Y position", {}, () => {
    return window.cursor_y;
  }),
  Block(BlockType.REPORTER, "getPressedKeys", "Get all pressed keys", {}, () => {
    return JSON.stringify(Object.keys(window.pressedKeys).filter(key => window.pressedKeys[key]));
  }),
  Block(BlockType.HAT, "whenKeyPressed", "When key [key] is pressed", {
    key: Argument("string", "a"),
  }, ({ key }) => {
    return window.pressedKeys.includes(key);
  }),
];
