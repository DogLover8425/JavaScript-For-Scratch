window.sjs_storage = [
  Block(BlockType.BUTTON, "storageCategory", "Storage"),
  Block(BlockType.COMMAND, "setLocalstorageNamespace", "set LocalStorage namespace to [namespace]", {
    namespace: Argument("string", "Replace this with a unique namespace for your project"),
  }, ({ namespace }) => {
    window.sjs_lsnamespace = namespace;
  }),
  Block(BlockType.COMMAND, "setLocalstorageKey", "set LocalStorage key [key] to [value]", {
    key: Argument("string", "key"),
    value: Argument("string", "value"),
  }, ({ key, value }) => {
    localStorage.setItem(window.sjs_lsnamespace + key, value);
  }),
  Block(BlockType.REPORTER, "getLocalstorageKey", "get LocalStorage key [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    return localStorage.getItem(window.sjs_lsnamespace + key);
  }),
  Block(BlockType.COMMAND, "removeLocalstorageKey", "remove LocalStorage key [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    localStorage.removeItem(window.sjs_lsnamespace + key);
  }),
  Block(BlockType.COMMAND, "clearLocalstorage", "clear LocalStorage", {}, () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(window.sjs_lsnamespace)) {
        localStorage.removeItem(key);
      }
    });
  }),
];
