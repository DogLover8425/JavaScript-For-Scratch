window.sjs_corejs = [
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
  }),
  Spacer, // Web/extra JS
  Block(BlockType.COMMAND, "OpenSite", "Open site [url]", {
    url: Argument("string", "https://example.com"),
  }),
  Block(BlockType.COMMAND, "OpenInTurbowarp", "Open this project in Turbowarp"),
  Block(BlockType.REPORTER, "fetchSite", "Fetch site [url]", {
    url: Argument("string", "https://example.com"),
  }),
  Block(BlockType.COMMAND, "ReloadPage", "Reload page"),
  Block(
    BlockType.COMMAND,
    "SaveFile",
    "Save file [name] with contents [contents]",
    {
      name: Argument("string", "example.txt"),
      contents: Argument("string", "Hello World!"),
    },
  ),
  Block(BlockType.COMMAND, "setVar", "Set variable [name] to [val]", {
    name: Argument("string", "window.example"),
    val: Argument("string", "Hello World!"),
  }),
];
