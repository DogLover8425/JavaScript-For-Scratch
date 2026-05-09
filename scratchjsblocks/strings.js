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
  Block(BlockType.REPORTER, "padString", "Pad [text] to length [length] characters on [side] with [char]", {
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
  Block(BlockType.REPORTER, "repeatString", "Repeat [text] [times] times", {
    text: Argument("string", "Hello"),
    times: Argument("number", 3),
  }, ({ text, times }) => text.repeat(times)),
  Block(BlockType.REPORTER, "countOccurrences", "Count occurrences of [searchtext] in [searchfrom] test argument [testargument]", { // this block seems to be broken? the inputs are blank
    searchtext: Argument("string", "o"),
    searchfrom: Argument("string", "Hello World"),
    testargument: Argument("string", "testing testing... this is just for extension devs"),
  }, ({ searchtext, searchfrom, testargument }) => {
    let count = 0;
    let pos = 0;
    while ((pos = searchfrom.indexOf(searchtext, pos)) !== -1) {
      count++;
      pos += searchtext.length;
    }
    console.log("...... look here..... [" + testargument + "]", count);
    return count;
  }),
  Block(BlockType.REPORTER, "matchRegex", "Match regular expression [regex] in [text]", {
    regex: Argument("string", "[a-z]+"),
    text: Argument("string", "Hello World"),
  }, ({ regex, text }) => {
    const matches = text.match(new RegExp(regex, "g"));
    return matches ? JSON.stringify(matches) : "";
  }),
  Block(BlockType.REPORTER, "joinLen3", "Join [t1] [t2] [t3]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "World"),
  }, ({ t1, t2, t3 }) => t1 + t2 + t3),
  Block(BlockType.REPORTER, "joinLen4", "Join [t1] [t2] [t3] [t4]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "World"),
    t4: Argument("string", "!"),
  }, ({ t1, t2, t3, t4 }) => t1 + t2 + t3 + t4),
  Block(BlockType.REPORTER, "joinLen5", "Join [t1] [t2] [t3] [t4] [t5]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "World"),
    t4: Argument("string", "!"),
    t5: Argument("string", "?"),
  }, ({ t1, t2, t3, t4, t5 }) => t1 + t2 + t3 + t4 + t5),
  Block(BlockType.REPORTER, "joinLen6", "Join [t1] [t2] [t3] [t4] [t5] [t6]", {
    t1: Argument("string", "Hello"),
    t2: Argument("string", " "),
    t3: Argument("string", "World"),
    t4: Argument("string", "!"),
    t5: Argument("string", "?"),
    t6: Argument("string", "!"),
  }, ({ t1, t2, t3, t4, t5, t6 }) => t1 + t2 + t3 + t4 + t5 + t6),
];
