try {
  (function () {
    "use strict";

    /**
     * Waits for the Scratch VM to be available and calls the callback with it.
     * @param {Function} callback - The function to call with the VM.
     */
    function waitForVM(callback) {
      const el = document.querySelector(
        'div[class*="stage-header_stage-header-wrapper"]',
      );
      if (!el) return;

      const reactKey = Object.keys(el).find(
        (k) =>
          k.startsWith("__reactFiber$") ||
          k.startsWith("__reactInternalInstance$"),
      );
      if (!reactKey) return;

      let fiber = el[reactKey];
      while (fiber && !fiber.stateNode) fiber = fiber.return;
      const vm =
        fiber?.stateNode?.props?.vm ||
        fiber?.return?.return?.return?.return?.updateQueue?.stores?.[0]?.value
          ?.vm;

      if (vm) {
        console.log(
          "%c[Scratch Injector]%c VM found!",
          "color: lime;",
          "color: none;",
        );
        callback(vm);
      }
    }

    waitForVM((vm) => {
      // Extension code.
      console.log(
        "%c[ScratchJS]%c Using ScratchJS!",
        "color: lime;",
        "color: none;",
      );

      // Warning modal

      let modal = document.createElement("div");
      modal.innerHTML = `<span style="text-align: center; font-size: 2rem; color: red;">Warning!</span>
      <p style="text-align: center; color: black;">This extension has access to advanced features. 
      <br>Projects using this extension can potentially do dangerous things. 
      <br>Please make sure you trust the creator of this project.</p><button onclick="document.getElementById('scratchjs-warning-modal').remove()" style="margin-top: 1rem; padding:5px; background-color: #10a7ff; border-radius: 5px; color: white; border: 1px solid #ddd; cursor: pointer;">OK</button>`;
      modal.id = "scratchjs-warning-modal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.display = "flex";
      modal.style.flexDirection = "column";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.backgroundColor = "rgba(4, 122, 233, 1)";
      modal.style.zIndex = "9999";
      document.body.appendChild(modal);

      let cursor_x = -1,
        cursor_y = -1,
        cursor_down = false;
      document.onmousemove = function (event) {
        cursor_x = event.pageX;
        cursor_y = event.pageY;
      };
      document.onmousedown = function (event) {
        cursor_down = true;
      };
      document.onmouseup = function (event) {
        cursor_down = false;
      };

      let i = 0;
      let inLoop = false;

      /**
       * Block factory function. Creates a block object with the given parameters.
       * @param {string} blockType - The type of the block (e.g., "reporter", "command", "hat", "bool").
       * @param {string} opcode - The opcode for the block.
       * @param {string} text - The text to display for the block.
       * @param {Array<string>} args - An array of argument types for the block.
       * @returns {Object} - The block object.
       */
      const Block = (blockType, opcode, text, args) => ({
        blockType: blockType || BlockType.command,
        opcode,
        text,
        arguments: args,
        args,
        hideFromPalette: false,
      });

      const Argument = (type, defaultValue) => ({
        type,
        defaultValue,
      });

      const ArgumentWithMenu = (type, defaultValue, menu, acceptReporters = true) => ({
        type,
        defaultValue,
        menu,
        acceptReporters,
      });

      const Menu = (items, defaultValue) => ({
        items,
        defaultValue,
      });

      const MenuItem = (label, value) => ({
        text: label,
        value,
      });

      const Spacer = "---";

      const BlockType = {
        REPORTER: "reporter",
        COMMAND: "command",
        HAT: "hat",
        BOOLEAN: "Boolean", // Yes, this is supposed to be capitalized, I looked
        BUTTON: "button",
        CONDITIONAL: "conditional",
        EVENT: "event",
        LOOP: "loop",
      };
      const ArgumentType = {
        STRING: "string",
        NUMBER: "number",
        BOOLEAN: "Boolean", // again, this is supposed to be capitalized
        COLOR: "color",
        MATRIX: "matrix",
        ANGLE: "angle",
        NOTE: "note",
        IMAGE: "image",
      };
      const ReporterScope = {
        GLOBAL: "global",
        TARGET: "target",
      };
      const TargetType = {
        SPRITE: "sprite",
        STAGE: "stage",
      };
      class ScratchJS {
        constructor(runtime) {
          this.runtime = runtime;
        }
        OpenDocs() {
          window.open("https://github.com/Ironbill25/JavaScript-For-Scratch/blob/main/README.md");
        }
        RunJS({ code }) {
          eval(code);
        }
        OpenSite({ url }) {
          window.open(url);
        }
        SaveFile({ name, contents }) {
          const a = document.createElement("a");
          a.download = name;
          a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
            contents,
          )}`;
          a.click();
        }
        setVar({ name, val }) {
          eval(`${name}="${val}";`);
        }
        getReturnValOfJS({ code }) {
          return eval(code);
        }
        stringReport({ arg1 }) {
          return arg1;
        }
        whenCondition({ condit }) {
          return Boolean(condit);
        }
        ifBoolStringElseString({ arg1, arg2, arg3 }) {
          return arg1 ? arg2 : arg3;
        }
        outOfBoundsMouseX() {
          return cursor_x;
        }
        outOfBoundsMouseY() {
          return cursor_y;
        }
        outOfBoundsMouseDown() {
          return cursor_down;
        }
        getCurrentDateTime({ format }) {
          const now = new Date();
          switch (format) {
            case "date":
              return now.toLocaleDateString();
            case "time":
              return now.toLocaleTimeString();
            case "datetime":
              return now.toLocaleString();
            case "timestamp":
              return now.getTime().toString();
            default:
              return now.toString();
          }
        }

        changeCase({ text, caseType }) {
          if (caseType === "uppercase") return text.toUpperCase();
          if (caseType === "lowercase") return text.toLowerCase();
          return text;
        }

        stringContains({ text, substring }) {
          return text.includes(substring);
        }

        roundNumber({ number, decimals }) {
          const factor = Math.pow(10, decimals);
          return Math.round(number * factor) / factor;
        }

        textToBool({ bool }) {
          return (
            bool === "true" ||
            bool === "1" ||
            bool === "True" ||
            (bool !== "0" && bool !== "false" && bool !== "False")
          );
        }

        boolToText({ bool }) {
          return new Boolean(bool).toString();
        }

        powerBlock({ base, exponent }) {
          return Math.pow(base, exponent);
        }

        clampBlock({ value, min, max }) {
          return Math.min(Math.max(value, min), max);
        }

        strReplaceBlock({ text, string, replace }) {
          return text.replace(string, replace);
        }

        substringBlock({ text, start, end }) {
          return text.substring(start - 1, end - 1); // to 0 based
        }

        reverseStringBlock({ text }) {
          return text.split("").reverse().join("");
        }

        percentageBlock({ part, whole }) {
          return (part / whole) * 100;
        }

        ReloadPage() {
          location.reload();
        }

        currentProjectID() {
          // url format: https://scratch.mit.edu/projects/{projectID}/ or https://scratch.mit.edu/projects/{projectID}/editor
          return window.location.pathname.split("/")[2];
        }

        OpenInTurbowarp() {
          const projectID = this.currentProjectID();
          window.open(`https://turbowarp.org/${projectID}`, "_blank");
        }

        getUserInfo({ what }) {
          switch (what) {
            case "OS":
              return navigator.platform;
            case "browser":
              return navigator.userAgent;
            case "language":
              return navigator.language;
            case "timezone":
              return Intl.DateTimeFormat().resolvedOptions().timeZone;
            case "screenWidth":
              return window.screen.width;
            case "screenHeight":
              return window.screen.height;
            case "windowWidth":
              return window.innerWidth;
            case "windowHeight":
              return window.innerHeight;
            case "devicePixelRatio":
              return window.devicePixelRatio;
            default:
              return "";
          }
        }

        forInLoop({ value }, util) {
          if (!inLoop) {
            i = 0;
          }
          if (++i <= value) {
            inLoop = true;
            util.startBranch(1, true);
          } else {
            i = 0;
            inLoop = false;
          }
        }

        iReporter() {
          return i;
        }

        setI({ value }) {
          i = value;
        }

        increment({ value }) {
          return Number(value) + 1;
        }

        decrement({ value }) {
          return Number(value) - 1;
        }

        trueBlock() {
          return true;
        }

        falseBlock() {
          return false;
        }

        newlineBlock() {
          return "\n";
        }

        tabBlock() {
          return "\t";
        }

        moreOrEqualsBlock({ value1, value2 }) {
          return value1 >= value2;
        }

        lessOrEqualsBlock({ value1, value2 }) {
          return value1 <= value2;
        }

        inequalityBlock({ value1, value2 }) {
          return value1 !== value2;
        }


        blankArray() {
          return "[]";
        }

        addToArray({ array, value }) {
          return JSON.stringify([...JSON.parse(array), value]);
        }

        getFromArray({ array, index }) {
          return JSON.parse(array)[--index];
        }

        insertIntoArray({ array, index, value }) {
          const arr = JSON.parse(array);
          arr.splice(--index, 0, value);
          return JSON.stringify(arr);
        }

        replaceInArray({ array, index, value }) {
          const arr = JSON.parse(array);
          arr[--index] = value;
          return JSON.stringify(arr);
        }

        removeFromArray({ array, index }) {
          const arr = JSON.parse(array);
          arr.splice(--index, 1);
          return JSON.stringify(arr);
        }

        mergeArrays({ array1, array2 }) {
          return JSON.stringify([...JSON.parse(array1), ...JSON.parse(array2)]);
        }

        lengthOfArray({ array }) {
          return JSON.parse(array).length;
        }

        arrayHas({ array, value }) {
          return JSON.parse(array).includes(value);
        }

        indexOf({ array, value }) {
          return ++(JSON.parse(array).indexOf(value));
        }

        splitString({ string, delimiter }) {
          return JSON.stringify(string.split(delimiter));
        }

        joinArray({ array, delimiter }) {
          return JSON.parse(array).join(delimiter);
        }




        blankObject() {
          return "{}";
        }

        setInObject({ object, key, value }) {
          const obj = JSON.parse(object);
          obj[key] = value;
          return JSON.stringify(obj);
        }

        getFromObject({ object, key }) {
          return JSON.parse(object)[key];
        }

        deleteFromObject({ object, key }) {
          const obj = JSON.parse(object);
          delete obj[key];
          return JSON.stringify(obj);
        }

        objectHasKey({ object, key }) {
          return JSON.parse(object).hasOwnProperty(key);
        }

        keysOfObject({ object }) {
          return JSON.stringify(Object.keys(JSON.parse(object)));
        }

        valuesOfObject({ object }) {
          return JSON.stringify(Object.values(JSON.parse(object)));
        }

        entriesOfObject({ object }) {
          return JSON.stringify(Object.entries(JSON.parse(object)));
        }

        sizeOfObject({ object }) {
          return Object.keys(JSON.parse(object)).length;
        }

        pathInObject({ object, path }) {
          const obj = JSON.parse(object);
          const keys = JSON.parse(path);
          let result = obj;
          for (const key of keys) {
            result = result[key];
          }
          if (Array.isArray(result) || typeof result === "object") {
            return JSON.stringify(result);
          }
          return result;
        }

        setPathInObject({ object, path, value }) {
          const obj = JSON.parse(object);
          const keys = JSON.parse(path);
          let result = obj;
          for (let i = 0; i < keys.length - 1; i++) {
            result = result[keys[i]];
          }
          result[keys[keys.length - 1]] = value;
          return JSON.stringify(obj);
        }

        getInfo() {
          return {
            id: "math" /* ID Math because it's one of the only valid IDs that work */,
            name: "ScratchJS",
            color1: "#7c7001",
            color2: "#6a5f01",
            color3: "#6a5f01",
            blocks: [
              Block(BlockType.COMMAND, "OpenDocs", "Open Documentation"),
              Spacer,
              Block(BlockType.REPORTER, "powerBlock", "[base] ^ [exponent]", {
                base: { type: "number", defaultValue: 2 },
                exponent: { type: "number", defaultValue: 3 },
              }),
              Block(
                BlockType.REPORTER,
                "clampBlock",
                "Clamp [value] between [min] and [max]",
                {
                  value: Argument("number", 15),
                  min: Argument("number", 0),
                  max: Argument("number", 10),
                },
              ),
              Block(
                BlockType.REPORTER,
                "roundNumber",
                "Round [number] to [decimals] decimal places",
                {
                  number: Argument("number", 3.14159),
                  decimals: Argument("number", 2),
                },
              ),
              Block(
                BlockType.REPORTER,
                "percentageBlock",
                "[part]% of [whole]",
                {
                  part: Argument("number", 25),
                  whole: Argument("number", 100),
                },
              ),
              Block(BlockType.REPORTER, "increment", "[value]++", {
                value: Argument("number", 5),
              }),
              Block(BlockType.REPORTER, "decrement", "[value]--", {
                value: Argument("number", 5),
              }),
              Spacer,
              Block(BlockType.BOOLEAN, "trueBlock", "True"),
              Block(BlockType.BOOLEAN, "falseBlock", "False"),
              Block(BlockType.REPORTER, "newlineBlock", "Newline"),
              Block(BlockType.REPORTER, "tabBlock", "Tab"),
              Spacer,
              Block(BlockType.BOOLEAN, "moreOrEqualsBlock", "[value1] >= [value2]", {
                value1: Argument("number", 5),
                value2: Argument("number", 5),
              }),
              Block(BlockType.BOOLEAN, "lessOrEqualsBlock", "[value1] <= [value2]", {
                value1: Argument("number", 5),
                value2: Argument("number", 5),
              }),
              Block(BlockType.BOOLEAN, "inequalityBlock", "[value1] ≠ [value2]", {
                value1: Argument("number", 5),
                value2: Argument("number", 5),
              }),
              Spacer,
              Block(
                BlockType.REPORTER,
                "strReplaceBlock",
                "Replace all [string] in [text] with [replace]",
                {
                  text: Argument("string", "Hello World"),
                  string: Argument("string", "World"),
                  replace: Argument("string", "Scratch"),
                },
              ),
              Block(
                BlockType.REPORTER,
                "substringBlock",
                "Get substring of [text] from [start] to [end]",
                {
                  text: Argument("string", "Hello World"),
                  start: Argument("number", 1),
                  end: Argument("number", 6),
                },
              ),
              Block(
                BlockType.REPORTER,
                "reverseStringBlock",
                "Reverse string [text]",
                {
                  text: Argument("string", "Hello World"),
                },
              ),
              Block(
                BlockType.REPORTER,
                "changeCase",
                "Convert [text] to case [caseType]",
                {
                  text: Argument("string", "Hello World"),
                  caseType: ArgumentWithMenu("string", "uppercase", "caseTypeMenu"),
                },
              ),
              Spacer,
              Block(
                BlockType.REPORTER,
                "getCurrentDateTime",
                "current [format]",
                {
                  format: ArgumentWithMenu("string", "datetime", "dateFormatMenu"),
                },
              ),
              Block(
                BlockType.REPORTER,
                "currentProjectID",
                "Current project ID",
              ),
              Spacer,
              Block(BlockType.COMMAND, "RunJS", "JS| Run JS code [code]", {
                code: Argument("string", "alert('Hello World!')"),
              }),
              Block(
                BlockType.REPORTER,
                "getReturnValOfJS",
                "JS| Get return value of [code]",
                {
                  code: Argument("string", "6473 / 84"),
                },
              ),
              Block(
                BlockType.REPORTER,
                "getUserInfo",
                "Get info on the [what]",
                {
                  what: ArgumentWithMenu("string", "OS", "userInfoMenu"),
                },
              ),
              Spacer,
              Block(BlockType.COMMAND, "OpenSite", "JS| Open site [url]", {
                url: Argument("string", "https://example.com"),
              }),
              Block(
                BlockType.COMMAND,
                "OpenInTurbowarp",
                "JS| Open this project in Turbowarp",
              ),
              Block(BlockType.COMMAND, "ReloadPage", "JS| Reload page"),
              Block(
                BlockType.COMMAND,
                "SaveFile",
                "JS| Save file [name] with contents [contents]",
                {
                  name: Argument("string", "example.txt"),
                  contents: Argument("string", "Hello World!"),
                },
              ),
              Block(
                BlockType.COMMAND,
                "setVar",
                "JS| Set variable [name] to [val]",
                {
                  name: Argument("string", "window.example"),
                  val: Argument("string", "Hello World!"),
                },
              ),
              Spacer,
              Block(BlockType.HAT, "whenCondition", "when [condit] is true", {
                condit: {
                  type: "Boolean",
                  defaultValue: "Put any boolean block here",
                },
              }),
              Block(BlockType.LOOP, "forInLoop", "For i in [value]", {
                value: Argument("string", "10"),
              }),
              Block(BlockType.REPORTER, "iReporter", "i"),
              Block(BlockType.COMMAND, "setI", "Set i to [value]", {
                value: Argument("number", 0),
              }),
              Block(BlockType.REPORTER, "stringReport", "[arg1]", {
                arg1: Argument("string", "Hello"),
              }),
              Block(
                BlockType.REPORTER,
                "ifBoolStringElseString",
                "if [arg1] then [arg2] else [arg3]",
                {
                  arg1: Argument("Boolean"),
                  arg2: Argument("string", "Hello"),
                  arg3: Argument("string", "World"),
                },
              ),
              Block(
                BlockType.REPORTER,
                "outOfBoundsMouseX",
                "Mouse X (works out of bounds)",
                {},
              ),
              Block(
                BlockType.REPORTER,
                "outOfBoundsMouseY",
                "Mouse Y (works out of bounds)",
                {},
              ),
              Block(
                BlockType.BOOLEAN,
                "outOfBoundsMouseDown",
                "Mouse down? (works out of bounds)",
                {},
              ),
              Spacer,
              Block(BlockType.BOOLEAN, "textToBool", "[bool]", {
                bool: Argument("string", "true"),
              }),
              Block(BlockType.REPORTER, "boolToText", "[bool]", {
                bool: Argument("Boolean"),
              }),
              Spacer,
              Block(BlockType.REPORTER, "blankArray", "Blank array"),
              Block(BlockType.REPORTER, "addToArray", "Append [value] to array [array]", {
                value: Argument("string", "Hello"),
                array: Argument("string", "[]"),
              }),
              Block(BlockType.REPORTER, "getFromArray", "Get [index] from array [array]", {
                index: Argument("number", 1),
                array: Argument("string", "[]"),
              }),
              Block(BlockType.REPORTER, "insertIntoArray", "Insert [value] at [index] in array [array]", {
                value: Argument("string", "Hello"),
                index: Argument("number", 1),
                array: Argument("string", "[\"Apple\"]"),
              }),
              Block(BlockType.REPORTER, "replaceInArray", "Replace [index] in array [array] with [value]", {
                index: Argument("number", 1),
                array: Argument("string", "[\"Apple\"]"),
                value: Argument("string", "Banana"),
              }),
              Block(BlockType.REPORTER, "removeFromArray", "Remove [index] from array [array]", {
                index: Argument("number", 1),
                array: Argument("string", "[\"Apple\"]"),
              }),
              Block(BlockType.REPORTER, "mergeArrays", "Merge [array1] and [array2]", {
                array1: Argument("string", "[\"Hello\"]"),
                array2: Argument("string", "[\"World\"]"),
              }),
              Block(BlockType.REPORTER, "lengthOfArray", "Length of array [array]", {
                array: Argument("string", "[\"Apple\", \"Banana\"]"),
              }),
              Block(BlockType.BOOLEAN, "arrayHas", "Array [array] contains [value]", {
                array: Argument("string", "[\"Apple\", \"Banana\"]"),
                value: Argument("string", "Carrot"),
              }),
              Block(BlockType.REPORTER, "indexOf", "Index of [value] in array [array]", {
                value: Argument("string", "Hello"),
                array: Argument("string", "[\"Apple\"]"),
              }),
              Block(BlockType.REPORTER, "splitString", "Split [string] by [delimiter] into array", {
                string: Argument("string", "Hello, World"),
                delimiter: Argument("string", ","),
              }),
              Block(BlockType.REPORTER, "joinArray", "Join array [array] with [delimiter]", {
                array: Argument("string", "[\"Hello\", \"World\"]"),
                delimiter: Argument("string", ","),
              }),
              Spacer,
              Block(BlockType.REPORTER, "blankObject", "Blank object"),
              Block(BlockType.REPORTER, "setInObject", "Set [key] in object [object] to [value]", {
                key: Argument("string", "name"),
                object: Argument("string", "{}"),
                value: Argument("string", "John"),
              }),
              Block(BlockType.REPORTER, "getFromObject", "Get [key] from object [object]", {
                key: Argument("string", "name"),
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.REPORTER, "deleteFromObject", "Delete [key] from object [object]", {
                key: Argument("string", "name"),
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.BOOLEAN, "objectHasKey", "Object [object] has key [key]", {
                object: Argument("string", "{\"name\": \"John\"}"),
                key: Argument("string", "name"),
              }),
              Block(BlockType.REPORTER, "keysOfObject", "Keys of object [object] (array)", {
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.REPORTER, "valuesOfObject", "Values of object [object] (array)", {
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.REPORTER, "entriesOfObject", "Entries of object [object] (array)", {
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.REPORTER, "sizeOfObject", "Size of object [object]", {
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.REPORTER, "pathInObject", "Get path (array) [path] from object [object]", {
                path: Argument("string", "[\"name\"]"),
                object: Argument("string", "{\"name\": \"John\"}"),
              }),
              Block(BlockType.REPORTER, "setPathInObject", "Set path (array) [path] in object [object] to [value]", {
                path: Argument("string", "[\"name\"]"),
                object: Argument("string", "{}"),
                value: Argument("string", "John"),
              }),
            ],
            menus: {
              varMenu: "getVarMenu",
              dateFormatMenu: Menu(
                [
                  MenuItem("date and time", "datetime"),
                  MenuItem("date only", "date"),
                  MenuItem("time only", "time"),
                  MenuItem("timestamp", "timestamp"),
                ],
                "datetime"
              ),
              caseTypeMenu: Menu(
                [
                  MenuItem("UPPERCASE", "uppercase"),
                  MenuItem("lowercase", "lowercase"),
                ],
                "uppercase"
              ),
              userInfoMenu: Menu(
                [
                  MenuItem("operating system", "OS"),
                  MenuItem("browser", "browser"),
                  MenuItem("language", "language"),
                  MenuItem("time zone", "timezone"),
                  MenuItem("screen width", "screenWidth"),
                  MenuItem("screen height", "screenHeight"),
                  MenuItem("window width", "windowWidth"),
                  MenuItem("window height", "windowHeight"),
                  MenuItem("device pixel ratio", "devicePixelRatio"),
                ],
                "OS"
              ),
            },
          };
        }
        getVarMenu(target_id) {
          const vars = this.runtime
            .getTargetById(target_id)
            .getAllVariableNamesInScopeByType("list");
          return vars.length == 0 ? [" "] : vars;
        }
      }
      (function (vm) {
        var extensionInstance = new ScratchJS(vm.extensionManager.runtime);
        var serviceName =
          vm.extensionManager._registerInternalExtension(extensionInstance);
        vm.extensionManager._loadedExtensions.set(
          extensionInstance.getInfo().id,
          serviceName,
        );
      })(vm);
    });
  })();
} catch (e) {
  console.error(e);
}
