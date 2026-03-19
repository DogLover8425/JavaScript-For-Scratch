try {
  (function () {
    "use strict";
    let devmode = false;

    /**
     * Waits for the Scratch VM to be available and calls the callback with it.
     * @param {Function} callback - The function to call with the VM.
     */
    function waitForVM(callback) {
      if (window.vm) {
        callback(window.vm);
        return;
      }
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
        window.vm = vm;
        callback(vm);
      }
    }
    
    window.sjs_toggleDevMode = (checked) => {
      devmode = checked;
    };

    

    function warningModal() {
      let modal = document.createElement("div");
      modal.innerHTML = `<span>Warning!</span>
      <p>This extension has access to advanced features. 
      <br>Projects using this extension can potentially do dangerous things.
      <br>A project using this extension can do the following:
      <ul>
      <li> Modify the website
      <li> Open pages and links
      <li> Send data to other websites
      <li> Access stored data
      </ul>
      <br>Please make sure you trust the creator of this project.\
      <br>If you don't trust this project, click "Cancel".
      </p>
      <button onclick="window.sjs_userConsent();document.getElementById('scratchjs-warning-modal').remove()">OK</button>
      <button onclick="document.getElementById('scratchjs-warning-modal').remove()">Cancel</button>
      <input type="checkbox" id="scratchjs-devmode-checkbox" onchange="window.sjs_toggleDevMode(this.checked)">
      <label for="scratchjs-devmode-checkbox">Enable Developer Mode</label>`;
      modal.id = "scratchjs-warning-modal";
      document.head.innerHTML += `
      <style>
        #scratchjs-warning-modal button {
          margin-top: 1rem;
          padding: 5px;
          background-color: #10a7ff;
          border-radius: 5px;
          color: white;
          border: 1px solid #ddd;
          cursor: pointer;
          display: inline-block;
        }

        #scratchjs-warning-modal p {
          margin: 0;
          color: black;
          text-align: center;
        }

        #scratchjs-warning-modal span {
          text-align: center;
          font-size: 2rem;
          color: red;
        }

        #scratchjs-warning-modal ul {
          margin: 0;
          padding-left: 1rem;
          color: black;
        }

        #scratchjs-warning-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(4, 122, 233, 1);
          z-index: 9999;
        }
      </style>
      `;
      document.body.appendChild(modal);
    }

    function tryParse(value) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }

    function devLogging(extensionInstance) {
      if (!devmode) return;
      console.log(`ScratchJS currently has ${extensionInstance.getInfo().blocks.length} blocks!`);
      for (const block of extensionInstance.getInfo().blocks) {
        if (!(block.id in extensionInstance) || typeof extensionInstance[block.id] !== 'function') {
          console.warn(`[DEVELOPER WARNING] Missing function for block: ${block.id}`);
        }
      }
    }

    waitForVM((vm) => {
      // Extension code.
      console.log(
        "%c[ScratchJS]%c Using ScratchJS!",
        "color: lime;",
        "color: none;",
      );

      warningModal();

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
      let arri = 0;
      let inArrLoop = false;
      let currentArray = "";
      let currentItem = "";
      let lsnamespace = "";
      let tempVariables = {};

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
          return JSON.stringify([...tryParse(array), value]);
        }

        getFromArray({ array, index }) {
          return tryParse(array)[--index];
        }

        insertIntoArray({ array, index, value }) {
          const arr = tryParse(array);
          arr.splice(--index, 0, value);
          return JSON.stringify(arr);
        }

        replaceInArray({ array, index, value }) {
          const arr = tryParse(array);
          arr[--index] = value;
          return JSON.stringify(arr);
        }

        removeFromArray({ array, index }) {
          const arr = tryParse(array);
          arr.splice(--index, 1);
          return JSON.stringify(arr);
        }

        mergeArrays({ array1, array2 }) {
          return JSON.stringify([...tryParse(array1), ...tryParse(array2)]);
        }

        lengthOfArray({ array }) {
          return tryParse(array).length;
        }

        arrayHas({ array, value }) {
          return tryParse(array).includes(value);
        }

        indexOf({ array, value }) {
          return ++(tryParse(array).indexOf(value));
        }

        splitString({ string, delimiter }) {
          return JSON.stringify(string.split(delimiter));
        }

        joinArray({ array, delimiter }) {
          return tryParse(array).join(delimiter);
        }




        blankObject() {
          return "{}";
        }

        setInObject({ object, key, value }) {
          const obj = tryParse(object);
          obj[key] = value;
          return JSON.stringify(obj);
        }

        getFromObject({ object, key }) {
          return tryParse(object)[key];
        }

        deleteFromObject({ object, key }) {
          const obj = tryParse(object);
          delete obj[key];
          return JSON.stringify(obj);
        }

        objectHasKey({ object, key }) {
          return tryParse(object).hasOwnProperty(key);
        }

        keysOfObject({ object }) {
          return JSON.stringify(Object.keys(tryParse(object)));
        }

        valuesOfObject({ object }) {
          return JSON.stringify(Object.values(tryParse(object)));
        }

        entriesOfObject({ object }) {
          return JSON.stringify(Object.entries(tryParse(object)));
        }

        sizeOfObject({ object }) {
          return Object.keys(tryParse(object)).length;
        }

        pathInObject({ object, path }) {
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
        }

        setPathInObject({ object, path, value }) {
          const obj = tryParse(object);
          const keys = tryParse(path);
          let result = obj;
          for (let i = 0; i < keys.length - 1; i++) {
            result = result[keys[i]];
          }
          result[keys[keys.length - 1]] = value;
          return JSON.stringify(obj);
        }

        fetchSite({ url }) {
          return fetch(url).then((res) => res.text());
        }

        logBlock({ message }) {
          console.log(message);
        }

        warningBlock({ message }) {
          console.warn(message);
        }

        errorBlock({ message }) {
          console.error(message);
        }

        setLocalstorageNamespace({ namespace }) {
          lsnamespace = namespace;
        }

        setLocalstorageKey({ key, value }) {
          localStorage.setItem(lsnamespace + key, value);
        }

        getLocalstorageKey({ key }) {
          return localStorage.getItem(lsnamespace + key);
        }

        removeLocalstorageKey({ key }) {
          localStorage.removeItem(lsnamespace + key);
        }

        clearLocalstorage() {
          localStorage.clear();
        }

        promptBlock({ message }) {
          return prompt(message);
        }

        alertBlock({ message }) {
          alert(message);
        }

        confirmBlock({ message }) {
          return confirm(message);
        }

        clearConsole() {
          console.clear();
        }

        setTemp({ key, value }) {
          tempVariables[key] = value;
        }

        getTemp({ key }) {
          return tempVariables[key];
        }
        
        delTemp({ key }) {
          delete tempVariables[key];
        }

        clearAllTemp() {
          tempVariables = {};
        }

        isObject({ value }) {
          return typeof tryParse(value) === "object";
        }

        isArray({ value }) {
          return Array.isArray(tryParse(value));
        }
        
        swapArrayItems({ index1, index2, array }) {
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
        }

        getItemsFrom({ start, end, array }) {
          let res;
          try {
            res = JSON.parse(array);
          } catch {
            return array;
          }
          return JSON.stringify(res.slice(start - 1, end - 1)); // scratch is one based indexing
        }

        arrayLoop({array}, util) {
          let parsed = tryParse(array);
          if (!inArrLoop) {
            arri = 0;
          }
          if (++arri <= parsed.length) {
            inArrLoop = true;
            currentArray = array;
            currentItem = parsed[arri - 1];
            util.startBranch(1, true);
          } else {
            arri = 0;
            inArrLoop = false;
          }
        }
        
        arrayLoopItem() {
          return currentItem;
        }
        
        arrayLoopIndex() {
          return arri;
        }

        ifBoolString({ arg1, arg2 }) {
          if (arg1) {
            return arg2;
          }
          return "";
        }

        isInt({ number }) {
          return Number.isInteger(Number(number));
        }

        isFloat({ number }) {
          return !Number.isInteger(Number(number));
        }

        isNumber({ number }) {
          return !isNaN(Number(number));
        }

        isEven({ number }) {
          return Number(number) % 2 === 0;
        }
        
        isOdd({ number }) {
          return Number(number) % 2 !== 0;
        }
        
        isFinite({ number }) {
          return isFinite(Number(number));
        }

        piBlock() {
          return Math.PI;
        }

        eBlock() {
          return Math.E;
        }

        infinityBlock() {
          return Infinity;
        }

        negativeInfinityBlock() {
          return -Infinity;
        }

        evalExpr({ expr }) {
          return eval(expr);
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
              Spacer, // Math Blocks
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
              Block(BlockType.BOOLEAN, "isEven", "[number] is even", {
                number: Argument("number", 4),
              }),
              Block(BlockType.BOOLEAN, "isOdd", "[number] is odd", {
                number: Argument("number", 3),
              }),
              Block(BlockType.BOOLEAN, "isInt", "[number] is an integer", {
                number: Argument("number", 3.14),
              }),
              Block(BlockType.BOOLEAN, "isFinite", "[number] is finite", {
                number: Argument("number", 3.14),
              }),
              Block(BlockType.BOOLEAN, "isNumber", "[number] is a number", {
                number: Argument("number", 6),
              }),
              Block(BlockType.BOOLEAN, "isFloat", "[number] has decimals", {
                number: Argument("number", 2.71),
              }),
              Block(BlockType.REPORTER, "evalExpr", "Evaluate math [expr]", {
                expr: Argument("string", "2 + 2"),
              }),
              Spacer, // Constants
              Block(BlockType.BOOLEAN, "trueBlock", "True"),
              Block(BlockType.BOOLEAN, "falseBlock", "False"),
              Block(BlockType.REPORTER, "newlineBlock", "Newline"),
              Block(BlockType.REPORTER, "tabBlock", "Tab"),
              Spacer, // More constants
              Block(BlockType.REPORTER, "piBlock", "π"),
              Block(BlockType.REPORTER, "eBlock", "e"),
              Block(BlockType.REPORTER, "infinityBlock", "∞"),
              Block(BlockType.REPORTER, "negativeInfinityBlock", "-∞"),
              Spacer, // Boolean
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
              Spacer, // Strings
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
              Spacer, // Special reporters
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
              Spacer, // Main JS blocks
              Block(BlockType.COMMAND, "RunJS", "Run JS code [code]", {
                code: Argument("string", "alert('Hello World!')"),
              }),
              Block(
                BlockType.REPORTER,
                "getReturnValOfJS",
                "Get return value of [code]",
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
              Spacer, // Web/extra JS
              Block(BlockType.COMMAND, "OpenSite", "Open site [url]", {
                url: Argument("string", "https://example.com"),
              }),
              Block(
                BlockType.COMMAND,
                "OpenInTurbowarp",
                "Open this project in Turbowarp",
              ),
              Block(BlockType.REPORTER, "fetchSite", "Fetch site [url]", {
                url: Argument("string", "https://example.com"),
              }),
              Block(BlockType.COMMAND, "ReloadPage", "Reload page"),
              Block(
                BlockType.COMMAND,
                "SaveFile",
                "Save file [name] with contents [contents]",
                {
                  name: Argument("string", "example.txt"),
                  contents: Argument("string", "Hello World!"),
                },
              ),
              Block(
                BlockType.COMMAND,
                "setVar",
                "Set variable [name] to [val]",
                {
                  name: Argument("string", "window.example"),
                  val: Argument("string", "Hello World!"),
                },
              ),
              Spacer, // Console and alerts
              Block(BlockType.COMMAND, "logBlock", "Log to console [message]", {
                message: Argument("string", "Something worked!"),
              }),
              Block(BlockType.COMMAND, "warningBlock", "Log warning to console [message]", {
                message: Argument("string", "Something could go wrong!"),
              }),
              Block(BlockType.COMMAND, "errorBlock", "Log error to console [message]", {
                message: Argument("string", "Something went wrong!"),
              }),
              Block(BlockType.COMMAND, "clearConsole", "Clear console"),
              Block(BlockType.COMMAND, "alertBlock", "Show alert [message]", {
                message: Argument("string", "Hello World!"),
              }),
              Block(BlockType.BOOLEAN, "confirmBlock", "Confirm [message]", {
                message: Argument("string", "Are you sure?"),
              }),
              Block(BlockType.REPORTER, "promptBlock", "Prompt [message]", {
                message: Argument("string", "What is your name?"),
              }),
              Spacer, // Conditions and loops
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
              Spacer, // Localstorage
              Block(BlockType.COMMAND, "setLocalstorageNamespace", "Set LocalStorage namespace to [namespace]", {
                namespace: Argument("string", "Replace this with a unique namespace for your project"),
              }),
              Block(BlockType.COMMAND, "setLocalstorageKey", "Set LocalStorage key [key] to [value]", {
                key: Argument("string", "key"),
                value: Argument("string", "value"),
              }),
              Block(BlockType.REPORTER, "getLocalstorageKey", "Get LocalStorage key [key]", {
                key: Argument("string", "key"),
              }),
              Block(BlockType.COMMAND, "removeLocalstorageKey", "Remove LocalStorage key [key]", {
                key: Argument("string", "key"),
              }),
              Block(BlockType.COMMAND, "clearLocalstorage", "Clear LocalStorage"),
              Spacer, // Utility reporters
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
              Block(BlockType.REPORTER, "ifBoolString", "If [arg1] then [arg2]", {
                arg1: Argument("Boolean"),
                arg2: Argument("string", "Hello"),
              }),
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
              Spacer, // Also utility reporters
              Block(BlockType.BOOLEAN, "textToBool", "[bool]", {
                bool: Argument("string", "true"),
              }),
              Block(BlockType.REPORTER, "boolToText", "[bool]", {
                bool: Argument("Boolean"),
              }),
              Spacer, // Temporary variables
              Block(BlockType.REPORTER, "setTemp", "Set temporary [key] to [value]", {
                key: Argument("string", "key"),
                value: Argument("string", "value"),
              }),
              Block(BlockType.REPORTER, "getTemp", "Get temporary [key]", {
                key: Argument("string", "key"),
              }),
              Block(BlockType.COMMAND, "delTemp", "Delete temporary [key]", {
                key: Argument("string", "key"),
              }),
              Block(BlockType.COMMAND, "clearAllTemp", "Clear all temporary variables"),
              Spacer, // Array utilities
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
              Spacer, // Object utilities
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
      window.sjs_userConsent = function () {
        window.sjs_hasUserConsent = true;
        var extensionInstance = new ScratchJS(vm.extensionManager.runtime);
        var serviceName =
          vm.extensionManager._registerInternalExtension(extensionInstance);
        vm.extensionManager._loadedExtensions.set(
          extensionInstance.getInfo().id,
          serviceName,
        );
        devLogging(extensionInstance);
    };
    });
  })();
} catch (e) {
  console.error(e);
}
