function showStyles() {
const nav = document.querySelector("[class*='menu-bar_main-menu']") || document.querySelector("#navigation");
    if (nav) {
      nav.style.background = "#FF6600";
    }

    const img = document.querySelector('[class*="menu-bar_scratch-logo"]');
    if (img) {
      img.src = "https://ironbill25.github.io/projects/scratchjs/img/logo.webp";
      img.style.width = "3.6rem";
      img.style.height = "3.6rem";
      img.style.margin = "0";
    }

    const otherImg = document.querySelector('#navigation .logo a');
    if (otherImg) {
      otherImg.style.backgroundImage = "url('https://ironbill25.github.io/projects/scratchjs/img/logo.webp')";
      otherImg.style.backgroundSize = "contain";
      otherImg.style.backgroundRepeat = "no-repeat";
      otherImg.style.backgroundPosition = "center";
      otherImg.style.width = "3.6rem";
      otherImg.style.height = "3.6rem";
    }
}

window.sjs_corejs = [
  Block(BlockType.BUTTON, "corejsCategory", "JS Operations"),
  Block(BlockType.COMMAND, "RunJS", "Run JS code [code]", {
    code: Argument("string", "alert('Hello World!')"),
  }, ({ code }) => {
    eval(code);
  }),
  Block(BlockType.REPORTER, "getReturnValOfJS", "Get return value of [code]", {
    code: Argument("string", "6473 / 84"),
  }, ({ code }) => {
    return eval(code);
  }),
  Block(BlockType.REPORTER, "getUserInfo", "Get info on the [what]", {
    what: ArgumentWithMenu("string", "OS", "userInfoMenu"),
  }, ({ what }) => {
    switch (what) {
      case "OS":
        return navigator.platform;
      case "browser":
        return navigator.userAgent;
      case "language":
        return navigator.language;
      case "timezone":
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      case "screenWidth":
        return window.screen.width;
      case "screenHeight":
        return window.screen.height;
      case "windowWidth":
        return window.innerWidth;
      case "windowHeight":
        return window.innerHeight;
      case "devicePixelRatio":
        return window.devicePixelRatio;
      default:
        return "";
    }
  }),
  Spacer, // Web/extra JS
  Block(BlockType.COMMAND, "OpenSite", "Open site [url]", {
    url: Argument("string", "https://example.com"),
  }, ({ url }) => {
    window.open(url);
  }),
  Block(BlockType.COMMAND, "OpenInTurbowarp", "Open this project in Turbowarp", {}, () => {
    const projectID = window.location.pathname.split("/")[2];
    window.open(`https://turbowarp.org/${projectID}`, "_blank");
  }),
  Block(BlockType.REPORTER, "fetchSite", "Fetch site [url]", {
    url: Argument("string", "https://example.com"),
  }, ({ url }) => {
    return fetch(url).then((res) => res.text());
  }),
  Block(BlockType.COMMAND, "ReloadPage", "Reload page", {}, () => {
    location.reload();
  }),
  Block(
    BlockType.COMMAND,
    "SaveFile",
    "Save file [name] with contents [contents]",
    {
      name: Argument("string", "example.txt"),
      contents: Argument("string", "Hello World!"),
    },
    ({ name, contents }) => {
      const a = document.createElement("a");
      a.download = name;
      a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(contents)}`;
      a.click();
    }
  ),
  Block(BlockType.COMMAND, "setVar", "Set variable [name] to [val]", {
    name: Argument("string", "window.example"),
    val: Argument("string", "Hello World!"),
  }, ({ name, val }) => {
    eval(`${name}="${val}";`);
  }),
  Block(BlockType.COMMAND, "customStyle", "Show custom ScratchJS style (support the ScratchJS extension!)", {}, () => {
    showStyles();
    
    window.addEventListener('popstate', showStyles);
    
  }),
];
