window.sjs_storage = [
  Block(BlockType.COMMAND, "setLocalstorageNamespace", "Set LocalStorage namespace to [namespace]", {
    namespace: Argument("string", "Replace this with a unique namespace for your project"),
  }, ({ namespace }) => {
    window.sjs_lsnamespace = namespace;
  }),
  Block(BlockType.COMMAND, "setLocalstorageKey", "Set LocalStorage key [key] to [value]", {
    key: Argument("string", "key"),
    value: Argument("string", "value"),
  }, ({ key, value }) => {
    localStorage.setItem(window.sjs_lsnamespace + key, value);
  }),
  Block(BlockType.REPORTER, "getLocalstorageKey", "Get LocalStorage key [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    return localStorage.getItem(window.sjs_lsnamespace + key);
  }),
  Block(BlockType.COMMAND, "removeLocalstorageKey", "Remove LocalStorage key [key]", {
    key: Argument("string", "key"),
  }, ({ key }) => {
    localStorage.removeItem(window.sjs_lsnamespace + key);
  }),
  Block(BlockType.COMMAND, "clearLocalstorage", "Clear LocalStorage", {}, () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(window.sjs_lsnamespace)) {
        localStorage.removeItem(key);
      }
    });
  }),
];
