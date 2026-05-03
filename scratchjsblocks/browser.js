window.sjs_browser = [
  Block(BlockType.BUTTON, "browserCategory", "Browser"),
  Block(BlockType.REPORTER, "currentUrl", "Current page URL", {}, () => {
    return window.location.href;
  }),
  Block(BlockType.REPORTER, "getUrlParameter", "Get URL parameter [param]", {
    param: Argument("string", "id"),
  }, ({ param }) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
  }),
  Block(BlockType.COMMAND, "browserHistory", "Browser history [action]", {
    action: ArgumentWithMenu("string", "back", "historyActionMenu"),
  }, ({ action }) => {
    if (action === "back") window.history.back();
    if (action === "forward") window.history.forward();
  }),
  Block(BlockType.COMMAND, "copyToClipboard", "Copy [text] to clipboard", {
    text: Argument("string", "Hello World"),
  }, ({ text }) => {
    navigator.clipboard.writeText(text);
  }),
  Block(BlockType.REPORTER, "readClipboard", "Read from clipboard", {}, () => {
    return navigator.clipboard.readText();
  }),
  Block(BlockType.COMMAND, "toggleFullscreen", "Toggle fullscreen", {}, () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }),
  Block(BlockType.BOOLEAN, "isFullscreen", "Is fullscreen?", {}, () => {
    return !!document.fullscreenElement;
  }),
  Block(BlockType.COMMAND, "setPageTitle", "Set page title to [title]", {
    title: Argument("string", "My Scratch Project"),
  }, ({ title }) => {
    document.title = title;
  }),
  Block(BlockType.REPORTER, "pageTitle", "Page title", {}, () => {
    return document.title;
  }),
  Block(BlockType.REPORTER, "scrollPosition", "Scroll position", {}, () => {
    return JSON.stringify([window.scrollX, window.scrollY]);
  }),
  Block(BlockType.COMMAND, "scrollTo", "Scroll to [x][y]", {
    x: Argument("number", 0),
    y: Argument("number", 0),
  }, ({ x, y }) => {
    window.scrollTo(parseInt(x), parseInt(y));
  }),
];
