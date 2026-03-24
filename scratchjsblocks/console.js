window.sjs_console = [
  Block(BlockType.COMMAND, "logBlock", "Log to console [message]", {
    message: Argument("string", "Something worked!"),
  }, ({ message }) => {
    console.log(message);
  }),
  Block(BlockType.COMMAND, "warningBlock", "Log warning to console [message]", {
    message: Argument("string", "Warning!"),
  }, ({ message }) => {
    console.warn(message);
  }),
  Block(BlockType.COMMAND, "errorBlock", "Log error to console [message]", {
    message: Argument("string", "Error!"),
  }, ({ message }) => {
    console.error(message);
  }),
  Block(BlockType.COMMAND, "clearConsole", "Clear console", {}, () => {
    console.clear();
  }),
  Block(BlockType.COMMAND, "alertBlock", "Show alert [message]", {
    message: Argument("string", "Hello World!"),
  }, ({ message }) => {
    alert(message);
  }),
  Block(BlockType.BOOLEAN, "confirmBlock", "Confirm [message]", {
    message: Argument("string", "Are you sure?"),
  }, ({ message }) => {
    return confirm(message);
  }),
  Block(BlockType.REPORTER, "promptBlock", "Prompt [message]", {
    message: Argument("string", "What is your name?"),
  }, ({ message }) => {
    return prompt(message);
  }),
];
