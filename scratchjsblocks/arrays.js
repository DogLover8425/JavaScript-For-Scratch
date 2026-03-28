window.sjs_arrays = [
  Block(BlockType.REPORTER, "blankArray", "ARRAY | Blank array", {}, () => "[]"),
  Block(BlockType.REPORTER, "addToArray", "ARRAY | Append [value] to array [array]", {
    value: Argument("string", "Hello"),
    array: Argument("string", "[]"),
  }, ({ array, value }) => JSON.stringify([...tryParse(array), value])),
  Block(BlockType.REPORTER, "getFromArray", "ARRAY | Get [index] from array [array]", {
    index: Argument("number", 1),
    array: Argument("string", "[]"),
  }, ({ array, index }) => tryParse(array)[--index]),
  Block(BlockType.REPORTER, "insertIntoArray", "ARRAY | Insert [value] at [index] in array [array]", {
    value: Argument("string", "Hello"),
    index: Argument("number", 1),
    array: Argument("string", "[\"Apple\"]"),
  }, ({ array, index, value }) => {
    const arr = tryParse(array);
    arr.splice(--index, 0, value);
    return JSON.stringify(arr);
  }),
  Block(BlockType.REPORTER, "replaceInArray", "ARRAY | Replace [index] in array [array] with [value]", {
    index: Argument("number", 1),
    array: Argument("string", "[\"Apple\"]"),
    value: Argument("string", "Banana"),
  }, ({ array, index, value }) => {
    const arr = tryParse(array);
    arr[--index] = value;
    return JSON.stringify(arr);
  }),
  Block(BlockType.REPORTER, "removeFromArray", "ARRAY | Remove [index] from array [array]", {
    index: Argument("number", 1),
    array: Argument("string", "[\"Apple\"]"),
  }, ({ array, index }) => {
    const arr = tryParse(array);
    arr.splice(--index, 1);
    return JSON.stringify(arr);
  }),
  Block(BlockType.REPORTER, "mergeArrays", "ARRAY | Merge [array1] and [array2]", {
    array1: Argument("string", "[\"Hello\"]"),
    array2: Argument("string", "[\"World\"]"),
  }, ({ array1, array2 }) => JSON.stringify([...tryParse(array1), ...tryParse(array2)])),
  Block(BlockType.REPORTER, "lengthOfArray", "ARRAY | Length of array [array]", {
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
  }, ({ array }) => tryParse(array).length),
  Block(BlockType.BOOLEAN, "arrayHas", "ARRAY | Array [array] contains [value]", {
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
    value: Argument("string", "Carrot"),
  }, ({ array, value }) => tryParse(array).includes(value)),
  Block(BlockType.REPORTER, "indexOf", "ARRAY | Index of [value] in array [array]", {
    value: Argument("string", "Hello"),
    array: Argument("string", "[\"Apple\"]"),
  }, ({ array, value }) => ++(tryParse(array).indexOf(value))),
  Block(BlockType.REPORTER, "splitString", "ARRAY | Split [string] by [delimiter] into array", {
    string: Argument("string", "Hello, World"),
    delimiter: Argument("string", ","),
  }, ({ string, delimiter }) => JSON.stringify(string.split(delimiter))),
  Block(BlockType.REPORTER, "joinArray", "ARRAY | Join array [array] with [delimiter]", {
    array: Argument("string", "[\"Hello\", \"World\"]"),
    delimiter: Argument("string", ","),
  }, ({ array, delimiter }) => tryParse(array).join(delimiter)),
  Block(BlockType.REPORTER, "swapArrayItems", "ARRAY | Swap [index1] and [index2] in array [array]", {
    index1: Argument("number", 1),
    index2: Argument("number", 2),
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
  }, ({ index1, index2, array }) => {
    let res;
    try {
      res = JSON.parse(array);
    } catch {
      return array;
    }
    const temp = res[index1 - 1];
    res[index1 - 1] = res[index2 - 1];
    res[index2 - 1] = temp;
    return JSON.stringify(res);
  }),
  Block(BlockType.REPORTER, "getItemsFrom", "ARRAY | Get items from [start] to [end] from array [array]", {
    start: Argument("number", 2),
    end: Argument("number", 3),
    array: Argument("string", "[\"Apple\", \"Banana\", \"Carrot\"]"),
  }, ({ start, end, array }) => {
    let res;
    try {
      res = JSON.parse(array);
    } catch {
      return array;
    }
    return JSON.stringify(res.slice(start - 1, end - 1));
  }),
  Block(BlockType.LOOP, "arrayLoop", "ARRAY | For each item in array [array] do", {
    array: Argument("string", "[\"Apple\", \"Banana\"]"),
  }, ({ array }, util) => {
    let parsed = tryParse(array);
    if (!window.sjs_inArrLoop) {
      window.sjs_arri = 0;
    }
    if (++window.sjs_arri <= parsed.length) {
      window.sjs_inArrLoop = true;
      window.sjs_currentArray = array;
      window.sjs_currentItem = parsed[window.sjs_arri - 1];
      util.startBranch(1, true);
    } else {
      window.sjs_arri = 0;
      window.sjs_inArrLoop = false;
    }
  }),
  Block(BlockType.REPORTER, "arrayLoopItem", "ARRAY | Current item in array loop", {}, () => window.sjs_currentItem),
  Block(BlockType.REPORTER, "arrayLoopIndex", "ARRAY | Current index in array loop", {}, () => window.sjs_arri),
];
