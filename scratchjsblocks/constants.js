window.sjs_constants = [
  Block(BlockType.BUTTON, "constantsCategory", "Constants"),
  Block(BlockType.BOOLEAN, "trueBlock", "true", {}, () => true),
  Block(BlockType.BOOLEAN, "falseBlock", "false", {}, () => false),
  Block(BlockType.REPORTER, "newlineBlock", "newline", {}, () => "\n"),
  Block(BlockType.REPORTER, "tabBlock", "tab", {}, () => "\t"),
  Spacer, // More constants
  Block(BlockType.REPORTER, "piBlock", "π", {}, () => Math.PI),
  Block(BlockType.REPORTER, "eBlock", "e", {}, () => Math.E),
  Block(BlockType.REPORTER, "phiBlock", "φ", {}, () => (1 + Math.sqrt(5)) / 2),
  Block(BlockType.REPORTER, "eulergammaBlock", "γ", {}, () => 0.5772156649015329),
  Block(BlockType.REPORTER, "infinityBlock", "∞", {}, () => Infinity),
  Block(BlockType.REPORTER, "negativeInfinityBlock", "-∞", {}, () => -Infinity),
];
