window.sjs_browser = [
  Block(BlockType.BUTTON, "browserCategory", "Browser"),
  Block(BlockType.REPORTER, "currentUrl", "current page URL", {}, () => {
    return window.location.href;
  }),
  Block(BlockType.REPORTER, "getUrlParameter", "get URL parameter [param]", {
    param: Argument("string", "id"),
  }, ({ param }) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
  }),
  Block(BlockType.COMMAND, "browserHistory", "browser history [action]", {
    action: ArgumentWithMenu("string", "back", "historyActionMenu"),
  }, ({ action }) => {
    if (action === "back") window.history.back();
    if (action === "forward") window.history.forward();
  }),
  Block(BlockType.COMMAND, "copyToClipboard", "copy [text] to clipboard", {
    text: Argument("string", "Hello World"),
  }, ({ text }) => {
    navigator.clipboard.writeText(text);
  }),
  Block(BlockType.REPORTER, "readClipboard", "read from clipboard", {}, () => {
    return navigator.clipboard.readText();
  }),
  Block(BlockType.COMMAND, "toggleFullscreen", "toggle fullscreen", {}, () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }),
  Block(BlockType.BOOLEAN, "isFullscreen", "is fullscreen?", {}, () => {
    return !!document.fullscreenElement;
  }),
  Block(BlockType.COMMAND, "setPageTitle", "set page title to [title]", {
    title: Argument("string", "My Scratch Project"),
  }, ({ title }) => {
    document.title = title;
  }),
  Block(BlockType.REPORTER, "pageTitle", "page title", {}, () => {
    return document.title;
  }),
  Block(BlockType.REPORTER, "scrollPosition", "scroll position", {}, () => {
    return JSON.stringify([window.scrollX, window.scrollY]);
  }),
  Block(BlockType.COMMAND, "scrollTo", "scroll to [x][y]", {
    x: Argument("number", 0),
    y: Argument("number", 0),
  }, ({ x, y }) => {
    window.scrollTo(parseInt(x), parseInt(y));
  }),
];
