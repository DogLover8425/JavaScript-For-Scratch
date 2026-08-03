window.sjs_console = [
  Block(BlockType.BUTTON, "consoleCategory", "Console"),
  Block(BlockType.COMMAND, "logBlock", "log to console [message]", {
    message: Argument("string", "Something worked!"),
  }, ({ message }) => {
    console.log(message);
  }),
  Block(BlockType.COMMAND, "warningBlock", "log warning to console [message]", {
    message: Argument("string", "Warning!"),
  }, ({ message }) => {
    console.warn(message);
  }),
  Block(BlockType.COMMAND, "errorBlock", "log error to console [message]", {
    message: Argument("string", "Error!"),
  }, ({ message }) => {
    console.error(message);
  }),
  Block(BlockType.COMMAND, "clearConsole", "clear console", {}, () => {
    console.clear();
  }),
  Block(BlockType.COMMAND, "alertBlock", "whow alert [message]", {
    message: Argument("string", "Hello World!"),
  }, ({ message }) => {
    alert(message);
  }),
  Block(BlockType.BOOLEAN, "confirmBlock", "confirm [message]", {
    message: Argument("string", "Are you sure?"),
  }, ({ message }) => {
    return confirm(message);
  }),
  Block(BlockType.REPORTER, "promptBlock", "prompt [message]", {
    message: Argument("string", "What is your name?"),
  }, ({ message }) => {
    return prompt(message);
  }),
];
