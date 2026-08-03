window.sjs_timing = [
  Block(BlockType.BUTTON, "timingCategory", "Timing"),
  Block(BlockType.COMMAND, "setTimeoutBlock", "after [delay] ms run [code] (timeout)", {
    delay: Argument("number", 1000),
    code: Argument("string", "alert('Hello!')"),
  }, ({ delay, code }) => {
    setTimeout(() => eval(code), parseInt(delay));
  }),
  Block(BlockType.REPORTER, "setIntervalBlock", "every [delay] ms run [code] (interval)", {
    delay: Argument("number", 1000),
    code: Argument("string", "console.log('Tick')"),
  }, ({ delay, code }) => {
    return setInterval(() => eval(code), parseInt(delay));
  }),
  Block(BlockType.COMMAND, "clearIntervalBlock", "clear interval [intervalId]", {
    intervalId: Argument("number", 1),
  }, ({ intervalId }) => {
    clearInterval(parseInt(intervalId));
  }),
  Block(BlockType.REPORTER, "currentTimestamp", "current timestamp", {}, () => {
    return Date.now().toString();
  }),
  Block(BlockType.REPORTER, "formatTime", "format timestamp [timestamp] as [format]", {
    timestamp: Argument("number", Date.now()),
    format: ArgumentWithMenu("string", "ISO", "timeFormatMenu"),
  }, ({ timestamp, format }) => {
    const date = new Date(timestamp);
    switch (format) {
      case "ISO":
        return date.toISOString();
      case "local":
        return date.toLocaleString();
      case "date":
        return date.toLocaleDateString();
      case "time":
        return date.toLocaleTimeString();
      case "unix":
        return Math.floor(timestamp / 1000).toString();
      default:
        return date.toString();
    }
  }),
];
