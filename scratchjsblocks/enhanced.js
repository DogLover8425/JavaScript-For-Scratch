window.sjs_enhanced = [
  Block(BlockType.REPORTER, "hexToRgb", "Convert hex [hex] to RGB", {
    hex: Argument("string", "#FF0000"),
  }, ({ hex }) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? JSON.stringify([parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]) : "[]";
  }),
  Block(BlockType.REPORTER, "rgbToHex", "Convert RGB [r][g][b] to hex", {
    r: Argument("number", 255),
    g: Argument("number", 0),
    b: Argument("number", 0),
  }, ({ r, g, b }) => {
    return "#" + ((1 << 24) + (parseInt(r) << 16) + (parseInt(g) << 8) + parseInt(b)).toString(16).slice(1);
  }),
  Block(BlockType.REPORTER, "randomColor", "Random color"),
  Block(BlockType.REPORTER, "blendColors", "Blend [color1] and [color2] by [percentage]%", {
    color1: Argument("string", "#FF0000"),
    color2: Argument("string", "#0000FF"),
    percentage: Argument("number", 50),
  }, ({ color1, color2, percentage }) => {
    const c1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color1);
    const c2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color2);
    if (!c1 || !c2) return color1;
    
    const factor = Math.max(0, Math.min(1, parseFloat(percentage) / 100));
    const r = Math.round(parseInt(c1[1], 16) * (1 - factor) + parseInt(c2[1], 16) * factor);
    const g = Math.round(parseInt(c1[2], 16) * (1 - factor) + parseInt(c2[2], 16) * factor);
    const b = Math.round(parseInt(c1[3], 16) * (1 - factor) + parseInt(c2[3], 16) * factor);
    
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }),
  Block(BlockType.REPORTER, "trimString", "Trim [text]", {
    text: Argument("string", "  Hello World  "),
  }, ({ text }) => {
    return text.trim();
  }),
  Block(BlockType.REPORTER, "padString", "Pad [text] to length [length] with [character] on [side]", {
    text: Argument("string", "Hello"),
    length: Argument("number", 10),
    character: Argument("string", " "),
    side: ArgumentWithMenu("string", "left", "padSideMenu"),
  }, ({ text, length, character, side }) => {
    const padLength = Math.max(0, parseInt(length) - text.length);
    const padChar = character || " ";
    if (side === "left") return text.padStart(parseInt(length), padChar);
    if (side === "right") return text.padEnd(parseInt(length), padChar);
    return text;
  }),
  Block(BlockType.REPORTER, "regexMatch", "Match regex [pattern] in [text]", {
    text: Argument("string", "Hello World"),
    pattern: Argument("string", "Hello"),
  }, ({ text, pattern }) => {
    try {
      const matches = text.match(new RegExp(pattern));
      return matches ? JSON.stringify(matches) : "[]";
    } catch (e) {
      return "[]";
    }
  }),
  Block(BlockType.REPORTER, "urlEncode", "URL encode [text]", {
    text: Argument("string", "Hello World"),
  }, ({ text }) => {
    return encodeURIComponent(text);
  }),
  Block(BlockType.REPORTER, "urlDecode", "URL decode [text]", {
    text: Argument("string", "Hello%20World"),
  }, ({ text }) => {
    return decodeURIComponent(text);
  }),
  Block(BlockType.REPORTER, "fetchJson", "Fetch JSON from [url]", {
    url: Argument("string", "https://api.example.com/data"),
  }, ({ url }) => {
    return fetch(url).then((res) => res.json()).then((data) => JSON.stringify(data));
  }),
  Block(BlockType.REPORTER, "postRequest", "POST to [url] with data [data]", {
    url: Argument("string", "https://api.example.com/submit"),
    data: Argument("string", "{\"key\":\"value\"}"),
  }, ({ url, data }) => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
    }).then((res) => res.text());
  }),
  Block(BlockType.REPORTER, "getUrlParameter", "Get URL parameter [param]", {
    param: Argument("string", "id"),
  }, ({ param }) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
  }),
  Block(BlockType.REPORTER, "currentUrl", "Current page URL"),
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
  Block(BlockType.REPORTER, "readClipboard", "Read from clipboard"),
  Block(BlockType.COMMAND, "toggleFullscreen", "Toggle fullscreen"),
  Block(BlockType.BOOLEAN, "isFullscreen", "Is fullscreen?"),
  Block(BlockType.REPORTER, "pageTitle", "Page title"),
  Block(BlockType.COMMAND, "setPageTitle", "Set page title to [title]", {
    title: Argument("string", "My Scratch Project"),
  }, ({ title }) => {
    document.title = title;
  }),
  Block(BlockType.REPORTER, "scrollPosition", "Scroll position"),
  Block(BlockType.COMMAND, "scrollTo", "Scroll to [x][y]", {
    x: Argument("number", 0),
    y: Argument("number", 0),
  }, ({ x, y }) => {
    window.scrollTo(parseInt(x), parseInt(y));
  }),
  Block(BlockType.COMMAND, "setTimeoutBlock", "After [delay] ms run [code] (timeout)", {
    delay: Argument("number", 1000),
    code: Argument("string", "alert('Hello!')"),
  }, ({ delay, code }) => {
    setTimeout(() => eval(code), parseInt(delay));
  }),
  Block(BlockType.REPORTER, "setIntervalBlock", "Every [delay] ms run [code] (interval)", {
    delay: Argument("number", 1000),
    code: Argument("string", "console.log('Tick')"),
  }, ({ delay, code }) => {
    return setInterval(() => eval(code), parseInt(delay));
  }),
  Block(BlockType.COMMAND, "clearIntervalBlock", "Clear interval [intervalId]", {
    intervalId: Argument("number", 1),
  }, ({ intervalId }) => {
    clearInterval(parseInt(intervalId));
  }),
  Block(BlockType.REPORTER, "lastKeyPressed", "Last key pressed"),
  Block(BlockType.REPORTER, "mouseWheelDelta", "Mouse wheel delta"),
  Block(BlockType.BOOLEAN, "isValidJson", "Is [text] valid JSON?", {
    text: Argument("string", "{\"key\":\"value\"}"),
  }, ({ text }) => {
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  }),
];
