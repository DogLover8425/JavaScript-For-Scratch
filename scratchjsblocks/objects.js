window.sjs_objects = [
  Block(BlockType.REPORTER, "blankObject", "OBJECT | Blank object"),
  Block(BlockType.BOOLEAN, "isObject", "OBJECT | Is [value] an object?", {
    value: Argument("string", "{}"),
  }),
  Block(BlockType.REPORTER, "setInObject", "OBJECT | Set [key] in object [object] to [value]", {
    key: Argument("string", "name"),
    object: Argument("string", "{}"),
    value: Argument("string", "John"),
  }),
  Block(BlockType.REPORTER, "getFromObject", "OBJECT | Get [key] from object [object]", {
    key: Argument("string", "name"),
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.REPORTER, "deleteFromObject", "OBJECT | Delete [key] from object [object]", {
    key: Argument("string", "name"),
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.BOOLEAN, "objectHasKey", "OBJECT | Object [object] has key [key]", {
    object: Argument("string", "{\"name\": \"John\"}"),
    key: Argument("string", "name"),
  }),
  Block(BlockType.REPORTER, "keysOfObject", "OBJECT | Keys of object [object] (array)", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.REPORTER, "valuesOfObject", "OBJECT | Values of object [object] (array)", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.REPORTER, "entriesOfObject", "OBJECT | Entries of object [object] (array)", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.REPORTER, "sizeOfObject", "OBJECT | Size of object [object]", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.REPORTER, "pathInObject", "OBJECT | Get path (array) [path] from object [object]", {
    path: Argument("string", "[\"name\"]"),
    object: Argument("string", "{\"name\": \"John\"}"),
  }),
  Block(BlockType.REPORTER, "setPathInObject", "OBJECT | Set path (array) [path] in object [object] to [value]", {
    path: Argument("string", "[\"name\"]"),
    object: Argument("string", "{}"),
    value: Argument("string", "John"),
  }),
];
