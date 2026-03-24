window.sjs_arrays = [
  Block(BlockType.REPORTER, "blankArray", "ARRAY | Blank array"),
  Block(BlockType.BOOLEAN, "isArray", "ARRAY | Is [value] an array?", {
    value: Argument("string", "[]"),
  }),
  Block(BlockType.REPORTER, "addToArray", "ARRAY | Append [value] to array [array]", {
    value: Argument("string", "Hello"),
    array: Argument("string", "[]"),
  }),
  Block(BlockType.REPORTER, "getFromArray", "ARRAY | Get [index] from array [array]", {
    index: Argument("number", 1),
    array: Argument("string", "[]"),
  }),
  Block(BlockType.REPORTER, "getItemsFrom", "ARRAY | Get items from [start] to [end] from array [array]", {
    start: Argument("number", 2),
    end: Argument("number", 3),
    array: Argument("string", "[\"Apple\", \"Banana\", \"Carrot\"]"),
  }),
  Block(BlockType.REPORTER, "insertIntoArray", "ARRAY | Insert [value] at [index] in array [array]", {
    value: Argument("string", "Hello"),
    index: Argument("number", 1),
    array: Argument("string", "[\"Apple\"]"),
  }),
  Block(BlockType.REPORTER, "replaceInArray", "ARRAY | Replace [index] in array [array] with [value]", {
    index: Argument("number", 1),
    array: Argument("string", "[\"Apple\"]"),
    value: Argument("string", "Banana"),
  }),
  Block(BlockType.REPORTER, "swapArrayItems", "ARRAY | Swap [index1] and [index2] in array [array]", {
    index1: Argument("number", 1),
    index2: Argument("number", 2),
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
  }),
  Block(BlockType.REPORTER, "removeFromArray", "ARRAY | Remove [index] from array [array]", {
    index: Argument("number", 1),
    array: Argument("string", "[\"Apple\"]"),
  }),
  Block(BlockType.REPORTER, "mergeArrays", "ARRAY | Merge [array1] and [array2]", {
    array1: Argument("string", "[\"Hello\"]"),
    array2: Argument("string", "[\"World\"]"),
  }),
  Block(BlockType.REPORTER, "lengthOfArray", "ARRAY | Length of array [array]", {
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
  }),
  Block(BlockType.BOOLEAN, "arrayHas", "ARRAY | Array [array] contains [value]", {
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
    value: Argument("string", "Carrot"),
  }),
  Block(BlockType.REPORTER, "indexOf", "ARRAY | Index of [value] in array [array]", {
    value: Argument("string", "Hello"),
    array: Argument("string", "[\"Apple\"]"),
  }),
  Block(BlockType.REPORTER, "splitString", "ARRAY | Split [string] by [delimiter] into array", {
    string: Argument("string", "Hello, World"),
    delimiter: Argument("string", ","),
  }),
  Block(BlockType.REPORTER, "joinArray", "ARRAY | Join array [array] with [delimiter]", {
    array: Argument("string", "[\"Hello\", \"World\"]"),
    delimiter: Argument("string", ","),
  }),
  Block(BlockType.LOOP, "arrayLoop", "ARRAY | For each item in array [array] do", {
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
  }),
  Block(BlockType.REPORTER, "arrayLoopItem", "ARRAY | Current item in array loop"),
  Block(BlockType.REPORTER, "arrayLoopIndex", "ARRAY | Current index in array loop"),
];
