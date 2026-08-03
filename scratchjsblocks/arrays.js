window.sjs_arrays = [
  Block(BlockType.BUTTON, "arraysCategory", "Arrays"),
    Block(BlockType.BOOLEAN, "isValidJson", "is [text] valid JSON?", {
    text: Argument("string", "{\"key\":\"value\"}"),
  }, ({ text }) => {
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  }),
  Spacer,
  Block(BlockType.REPORTER, "blankArray", "blank array", {}, () => "[]"),
  Block(BlockType.REPORTER, "addToArray", "append [value] to array [array]", {
    value: Argument("string", "hello"),
    array: Argument("string", "[]"),
  }, ({ array, value }) => JSON.stringify([...tryParse(array), value])),
  Block(BlockType.REPORTER, "getFromArray", "get [index] from array [array]", {
    index: Argument("number", 1),
    array: Argument("string", "[]"),
  }, ({ array, index }) => tryParse(array)[--index]),
  Block(BlockType.REPORTER, "insertIntoArray", "insert [value] at [index] in array [array]", {
    value: Argument("string", "hello"),
    index: Argument("number", 1),
    array: Argument("string", "[\"apple\"]"),
  }, ({ array, index, value }) => {
    const arr = tryParse(array);
    arr.splice(--index, 0, value);
    return JSON.stringify(arr);
  }),
  Block(BlockType.REPORTER, "replaceInArray", "replace [index] in array [array] with [value]", {
    index: Argument("number", 1),
    array: Argument("string", "[\apple\"]"),
    value: Argument("string", "banana"),
  }, ({ array, index, value }) => {
    const arr = tryParse(array);
    arr[--index] = value;
    return JSON.stringify(arr);
  }),
  Block(BlockType.REPORTER, "removeFromArray", "remove [index] from array [array]", {
    index: Argument("number", 1),
    array: Argument("string", "[\"apple\"]"),
  }, ({ array, index }) => {
    const arr = tryParse(array);
    arr.splice(--index, 1);
    return JSON.stringify(arr);
  }),
  Block(BlockType.REPORTER, "mergeArrays", "merge [array1] and [array2]", {
    array1: Argument("string", "[\"hello\"]"),
    array2: Argument("string", "[\"world\"]"),
  }, ({ array1, array2 }) => JSON.stringify([...tryParse(array1), ...tryParse(array2)])),
  Block(BlockType.REPORTER, "lengthOfArray", "length of array [array]", {
    array: Argument("string", "[\"apple\", \"banana\"]"),
  }, ({ array }) => tryParse(array).length),
  Block(BlockType.BOOLEAN, "arrayHas", "array [array] contains [value]?", {
    array: Argument("string", "[\"apple\", \"banana\"]"),
    value: Argument("string", "carrot"),
  }, ({ array, value }) => tryParse(array).includes(value)),
  Block(BlockType.REPORTER, "indexOf", "index of [value] in array [array]", {
    value: Argument("string", "hello"),
    array: Argument("string", "[\"apple\"]"),
  }, ({ array, value }) => {
    const index = tryParse(array).indexOf(value);
    return index + 1;
  }),
  Block(BlockType.REPORTER, "splitString", "split [string] by [delimiter] into array", {
    string: Argument("string", "Hello, world!"),
    delimiter: Argument("string", ","),
  }, ({ string, delimiter }) => JSON.stringify(string.split(delimiter))),
  Block(BlockType.REPORTER, "joinArray", "join array [array] with [delimiter]", {
    array: Argument("string", "[\"hello\", \"world\"]"),
    delimiter: Argument("string", ","),
  }, ({ array, delimiter }) => tryParse(array).join(delimiter)),
  Block(BlockType.REPORTER, "swapArrayItems", "swap [index1] and [index2] in array [array]", {
    index1: Argument("number", 1),
    index2: Argument("number", 2),
    array: Argument("string", "[\"apple\", \"banana\"]"),
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
  Block(BlockType.REPORTER, "getItemsFrom", "get items from [start] to [end] from array [array]", {
    start: Argument("number", 2),
    end: Argument("number", 3),
    array: Argument("string", "[\"apple\", \"banana\", \"carrot\"]"),
  }, ({ start, end, array }) => {
    let res;
    try {
      res = JSON.parse(array);
    } catch {
      return array;
    }
    return JSON.stringify(res.slice(start - 1, end - 1));
  }),
  Block(BlockType.LOOP, "arrayLoop", "for each item in array [array] do", {
    array: Argument("string", "[\"apple\", \"banana\"]"),
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
  Block(BlockType.REPORTER, "arrayLoopItem", "current item", {}, () => window.sjs_currentItem),
  Block(BlockType.REPORTER, "arrayLoopIndex", "current index", {}, () => window.sjs_arri),
  Block(BlockType.REPORTER, "rawArray", "raw array [array]", {
    array: Argument("string", "[\"apple\", \"banana\"]"),
  }, ({ array }) => tryParse(array)),
  Block(BlockType.REPORTER, "filterArray", "filter [array] by condition [condition]", {
    array: Argument("string", "[\"apple\", \"banana\"]"),
    condition: Argument("string", "item === \"apple\"")
  }, ({ array, condition }) => {
    const arr = tryParse(array);
    return JSON.stringify(arr.filter((item) => {
      try {
        return eval(condition);
      } catch {
        return false;
      }
    }));
  })
];
