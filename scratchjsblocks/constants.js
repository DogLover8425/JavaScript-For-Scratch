window.sjs_constants = [
  Block(BlockType.BOOLEAN, "trueBlock", "True", {}, () => true),
  Block(BlockType.BOOLEAN, "falseBlock", "False", {}, () => false),
  Block(BlockType.REPORTER, "newlineBlock", "Newline", {}, () => "\n"),
  Block(BlockType.REPORTER, "tabBlock", "Tab", {}, () => "\t"),
  Spacer, // More constants
  Block(BlockType.REPORTER, "piBlock", "π", {}, () => Math.PI),
  Block(BlockType.REPORTER, "eBlock", "e", {}, () => Math.E),
  Block(BlockType.REPORTER, "infinityBlock", "∞", {}, () => Infinity),
  Block(BlockType.REPORTER, "negativeInfinityBlock", "-∞", {}, () => -Infinity),
];
