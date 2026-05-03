window.sjs_strings = [
  Block(BlockType.BUTTON, "stringsCategory", "Strings"),
  Block(
    BlockType.REPORTER,
    "strReplaceBlock",
    "Replace all [string] in [text] with [replace]",
    {
      text: Argument("string", "Hello World"),
      string: Argument("string", "World"),
      replace: Argument("string", "Scratch"),
    }, 
    ({ text, string, replace }) => text.replace(string, replace)
  ),
  Block(
    BlockType.REPORTER,
    "substringBlock",
    "Get substring of [text] from [start] to [end]",
    {
      text: Argument("string", "Hello World"),
      start: Argument("number", 1),
      end: Argument("number", 6),
    }, ({ text, start, end }) => {
      return text.substring(start - 1, end);
    }
  ),
  Block(BlockType.REPORTER, "reverseStringBlock", "Reverse string [text]", {
    text: Argument("string", "Hello World"),
  }, ({ text }) => text.split("").reverse().join("")),
  Block(BlockType.REPORTER, "changeCase", "Convert [text] to case [caseType]", {
    text: Argument("string", "Hello World"),
    caseType: ArgumentWithMenu("string", "uppercase", "caseTypeMenu"),
  }, ({ text, caseType }) => {
    switch (caseType) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      default:
        return text;
    }
  }),
];
