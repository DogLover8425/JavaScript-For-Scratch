window.sjs_strings = [
  Block(BlockType.BUTTON, "stringsCategory", "Strings"),
  Block(
    BlockType.REPORTER,
    "strReplaceBlock",
    "replace all [string] in [text] with [replace]",
    {
      text: Argument("string", "Hello world!"),
      string: Argument("string", "world"),
      replace: Argument("string", "Scratch"),
    }, 
    ({ text, string, replace }) => text.replace(string, replace)
  ),
  Block(
    BlockType.REPORTER,
    "substringBlock",
    "get substring of [text] from [start] to [end]",
    {
      text: Argument("string", "Hello world!"),
      start: Argument("number", 1),
      end: Argument("number", 6),
    }, ({ text, start, end }) => {
      return text.substring(start - 1, end);
    }
  ),
  Block(BlockType.REPORTER, "reverseStringBlock", "reverse string [text]", {
    text: Argument("string", "Hello world!"),
  }, ({ text }) => text.split("").reverse().join("")),
  Block(BlockType.REPORTER, "changeCase", "convert [text] to case [caseType]", {
    text: Argument("string", "Hello world!"),
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
  Block(BlockType.REPORTER, "padString", "pad [text] to length [length] characters on [side] with [char]", {
    text: Argument("string", "Hello"),
    length: Argument("number", 10),
    side: ArgumentWithMenu("string", "left", "padSideMenu"),
    char: Argument("string", " "),
  }, ({ text, length, side, char }) => {
    if (side === "left") {
      return text.padStart(length, char);
    } else {
      return text.padEnd(length, char);
    }
  }),
  Block(BlockType.REPORTER, "repeatString", "repeat [text] [times] times", {
    text: Argument("string", "Hello"),
    times: Argument("number", 3),
  }, ({ text, times }) => text.repeat(times)),
  Block(BlockType.REPORTER, "countOccurrencesText", "count how many times [text] appears in [searchfrom]", {
    text: Argument("string", "l"),
    searchfrom: Argument("string", "Hello world!"),
  }, ({ text, searchfrom }) => {
    return searchfrom.split(text).length - 1;
  }),
  Block(BlockType.REPORTER, "countOccurrencesRegex", "count how many times [regex] appears in [text] (regular expression)", {
    regex: Argument("string", "[a-z]+"),
    text: Argument("string", "Hello world!"),
  }, ({ regex, text }) => {
    const matches = text.match(new RegExp(regex, "g"));
    return matches ? matches.length : 0;
  }),
  Block(BlockType.REPORTER, "matchRegex", "match regular expression [regex] in [text]", {
    regex: Argument("string", "[a-z]+"),
    text: Argument("string", "Hello world!"),
  }, ({ regex, text }) => {
    const matches = text.match(new RegExp(regex, "g"));
    return matches ? JSON.stringify(matches) : "";
  }),
  Block(BlockType.REPORTER, "joinLen3", "join [t1] [t2] [t3]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "world"),
  }, ({ t1, t2, t3 }) => t1 + t2 + t3),
  Block(BlockType.REPORTER, "joinLen4", "join [t1] [t2] [t3] [t4]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "world"),
    t4: Argument("string", "!"),
  }, ({ t1, t2, t3, t4 }) => t1 + t2 + t3 + t4),
  Block(BlockType.REPORTER, "joinLen5", "join [t1] [t2] [t3] [t4] [t5]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "world"),
    t4: Argument("string", "!"),
    t5: Argument("string", "?"),
  }, ({ t1, t2, t3, t4, t5 }) => t1 + t2 + t3 + t4 + t5),
  Block(BlockType.REPORTER, "joinLen6", "join [t1] [t2] [t3] [t4] [t5] [t6]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "world"),
    t4: Argument("string", "!"),
    t5: Argument("string", "?"),
    t6: Argument("string", "!"),
  }, ({ t1, t2, t3, t4, t5, t6 }) => t1 + t2 + t3 + t4 + t5 + t6),
];
