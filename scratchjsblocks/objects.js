window.sjs_objects = [
  Block(BlockType.BUTTON, "objectsCategory", "Objects"),
  Block(BlockType.REPORTER, "blankObject", "OBJECT | Blank object", {}, () => "{}"),
  Block(BlockType.BOOLEAN, "isObject", "OBJECT | Is [value] an object?", {
    value: Argument("string", "{}"),
  }, ({ value }) => typeof tryParse(value) === "object"),
  Block(BlockType.REPORTER, "setInObject", "OBJECT | Set [key] in object [object] to [value]", {
    key: Argument("string", "name"),
    object: Argument("string", "{}"),
    value: Argument("string", "John"),
  }, ({ object, key, value }) => {
    const obj = tryParse(object);
    obj[key] = value;
    return JSON.stringify(obj);
  }),
  Block(BlockType.REPORTER, "getFromObject", "OBJECT | Get [key] from object [object]", {
    key: Argument("string", "name"),
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object, key }) => tryParse(object)[key]),
  Block(BlockType.REPORTER, "deleteFromObject", "OBJECT | Delete [key] from object [object]", {
    key: Argument("string", "name"),
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object, key }) => {
    const obj = tryParse(object);
    delete obj[key];
    return JSON.stringify(obj);
  }),
  Block(BlockType.BOOLEAN, "objectHasKey", "OBJECT | Object [object] has key [key]", {
    object: Argument("string", "{\"name\": \"John\"}"),
    key: Argument("string", "name"),
  }, ({ object, key }) => tryParse(object).hasOwnProperty(key)),
  Block(BlockType.REPORTER, "keysOfObject", "OBJECT | Keys of object [object] (array)", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object }) => JSON.stringify(Object.keys(tryParse(object)))),
  Block(BlockType.REPORTER, "valuesOfObject", "OBJECT | Values of object [object] (array)", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object }) => JSON.stringify(Object.values(tryParse(object)))),
  Block(BlockType.REPORTER, "entriesOfObject", "OBJECT | Entries of object [object] (array)", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object }) => JSON.stringify(Object.entries(tryParse(object)))),
  Block(BlockType.REPORTER, "sizeOfObject", "OBJECT | Size of object [object]", {
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object }) => Object.keys(tryParse(object)).length),
  Block(BlockType.REPORTER, "pathInObject", "OBJECT | Get path (array) [path] from object [object]", {
    path: Argument("string", "[\"name\"]"),
    object: Argument("string", "{\"name\": \"John\"}"),
  }, ({ object, path }) => {
    const obj = tryParse(object);
    const keys = tryParse(path);
    let result = obj;
    for (const key of keys) {
      result = result[key];
    }
    if (Array.isArray(result) || typeof result === "object") {
      return JSON.stringify(result);
    }
    return result;
  }),
  Block(BlockType.REPORTER, "setPathInObject", "OBJECT | Set path (array) [path] in object [object] to [value]", {
    path: Argument("string", "[\"name\"]"),
    object: Argument("string", "{}"),
    value: Argument("string", "John"),
  }, ({ object, path, value }) => {
    const obj = tryParse(object);
    const keys = tryParse(path);
    let result = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      result = result[keys[i]];
    }
    result[keys[keys.length - 1]] = value;
    return JSON.stringify(obj);
  }),
];
