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

      const BlockType = {
        REPORTER: "reporter",
        COMMAND: "command",
        HAT: "hat",
        BOOL: "Boolean",
      };
      class ScratchJS {
        constructor(runtime) {
          this.runtime = runtime;
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
          return bool.toString();
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

        reloadPage() {
          location.reload();
        }

        currentProjectID() {
          // url format: https://scratch.mit.edu/projects/{projectID}/ or https://scratch.mit.edu/projects/{projectID}/editor
          return window.location.pathname.split("/")[2];
        }

        openInTurbowarp() {
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

        getInfo() {
          return {
            id: "math" /*ID Math because it's one of the only valid IDs that work*/,
            name: "ScratchJS",
            blocks: [
              Block(
                BlockType.REPORTER,
                "powerBlock",
                "[base] ^ [exponent]",
                {
                  base: { type: "number", defaultValue: 2 },
                  exponent: { type: "number", defaultValue: 3 },
                },
              ),
              Block(
                BlockType.REPORTER,
                "clampBlock",
                "Clamp [value] between [min] and [max]",
                {
                  value: { type: "number", defaultValue: 15 },
                  min: { type: "number", defaultValue: 0 },
                  max: { type: "number", defaultValue: 10 },
                },
              ),
              Block(
                BlockType.REPORTER,
                "roundNumber",
                "Round [number] to [decimals] decimal places",
                {
                  number: { type: "number", defaultValue: 3.14159 },
                  decimals: { type: "number", defaultValue: 2 },
                },
              ),
              Block(
                BlockType.REPORTER,
                "percentageBlock",
                "[part]% of [whole]",
                {
                  part: { type: "number", defaultValue: 25 },
                  whole: { type: "number", defaultValue: 100 },
                },
              ),
              "---",
              Block(
                BlockType.REPORTER,
                "strReplaceBlock",
                "Replace all [string] in [text] with [replace]",
                {
                  text: { type: "string", defaultValue: "Hello World" },
                  string: { type: "string", defaultValue: "World" },
                  replace: { type: "string", defaultValue: "Scratch" },
                },
              ),
              Block(
                BlockType.REPORTER,
                "substringBlock",
                "Get substring of [text] from [start] to [end]",
                {
                  text: { type: "string", defaultValue: "Hello World" },
                  start: { type: "number", defaultValue: 1 },
                  end: { type: "number", defaultValue: 5 },
                },
              ),
              Block(
                BlockType.REPORTER,
                "reverseStringBlock",
                "Reverse string [text]",
                {
                  text: { type: "string", defaultValue: "Hello World" },
                },
              ),
              Block(
                BlockType.REPORTER,
                "changeCase",
                "Convert [text] to case [caseType]",
                {
                  text: { type: "string", defaultValue: "Hello World" },
                  caseType: {
                    type: "string",
                    menu: "caseTypeMenu",
                    defaultValue: "uppercase",
                  },
                },
              ),
              "---",
              Block(
                BlockType.REPORTER,
                "getCurrentDateTime",
                "current [format]",
                {
                  format: {
                    type: "string",
                    menu: "dateFormatMenu",
                    defaultValue: "datetime",
                  },
                },
              ),
              Block(BlockType.REPORTER, "currentProjectID", "Current project ID"),
              "---",
              Block(BlockType.COMMAND, "RunJS", "JS| Run JS code [code]", {
                code: { type: "string", defaultValue: "alert('Hello World!')" },
              }),
              Block(
                BlockType.REPORTER,
                "getReturnValOfJS",
                "JS| Get return value of [code]",
                {
                  code: { type: "string", defaultValue: "6473 / 84" },
                },
              ),
              Block(
                BlockType.REPORTER,
                "getUserInfo",
                "Get info on the [what]",
                {
                  what: {
                    type: "string",
                    menu: "userInfoMenu",
                    defaultValue: "OS",
                  },
                },
              ),
              "---",
              Block(BlockType.COMMAND, "OpenSite", "JS| Open site [url]", {
                url: { type: "string", defaultValue: "https://example.com" },
              }),
              Block(BlockType.COMMAND, "OpenInTurbowarp", "JS| Open this project in Turbowarp"),
              Block(BlockType.COMMAND, "ReloadPage", "JS| Reload page"),
              Block(
                BlockType.COMMAND,
                "SaveFile",
                "JS| Save file [name] with contents [contents]",
                {
                  name: { type: "string", defaultValue: "example.txt" },
                  contents: { type: "string", defaultValue: "Hello World!" },
                },
              ),
              Block(
                BlockType.COMMAND,
                "setVar",
                "JS| Set variable [name] to [val]",
                {
                  name: { type: "string", defaultValue: "window.example" },
                  val: { type: "string", defaultValue: "Hello World!" },
                },
              ),
              "---",
              Block(BlockType.HAT, "whenCondition", "when [condit] is true", {
                condit: {
                  type: "Boolean",
                  defaultValue: "Put any boolean block here",
                },
              }),
              Block(BlockType.REPORTER, "stringReport", "[arg1]", {
                arg1: { type: "string", defaultValue: "Hello" },
              }),
              Block(
                BlockType.REPORTER,
                "ifBoolStringElseString",
                "if [arg1] then [arg2] else [arg3]",
                {
                  arg1: { type: "Boolean" },
                  arg2: { type: "string", defaultValue: "Hello" },
                  arg3: { type: "string", defaultValue: "World" },
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
                BlockType.BOOL,
                "outOfBoundsMouseDown",
                "Mouse down? (works out of bounds)",
                {},
              ),
              "---",
              Block(BlockType.BOOL, "textToBool", "[bool]", {
                bool: { type: "string", defaultValue: "true" },
              }),
              Block(BlockType.REPORTER, "boolToText", "[bool]", {
                bool: { type: "Boolean" },
              }),
            ],
            menus: {
              varMenu: "getVarMenu",
              dateFormatMenu: [
                { text: "date and time", value: "datetime" },
                { text: "date only", value: "date" },
                { text: "time only", value: "time" },
                { text: "timestamp", value: "timestamp" },
              ],
              caseTypeMenu: [
                { text: "UPPERCASE", value: "uppercase" },
                { text: "lowercase", value: "lowercase" },
              ],
              userInfoMenu: [
                { text: "operating system", value: "OS" },
                { text: "browser", value: "browser" },
                { text: "language", value: "language" },
                { text: "time zone", value: "timezone" },
                { text: "screen width", value: "screenWidth" },
                { text: "screen height", value: "screenHeight" },
                { text: "window width", value: "windowWidth" },
                { text: "window height", value: "windowHeight" },
                { text: "device pixel ratio", value: "devicePixelRatio" },
              ],
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
      vm = ((node) => {
        node = document.querySelector(
          "div[class*=stage-header_stage-header-wrapper]",
        );
        node =
          node[
            Object.keys(node).find(
              (key) => (
                (key = String(key)),
                key.startsWith("__reactInternal") ||
                  key.startsWith("__reactFiber")
              ),
            )
          ].return.return.return;
        node =
          node.stateNode?.props?.vm ||
          node.return?.updateQueue?.stores?.[0]?.value?.vm;
        if (!node) throw new Error("Could not find VM :(");
        return node;
      })();
      (function () {
        var extensionInstance = new ScratchJS(vm.extensionManager.runtime);
        var serviceName =
          vm.extensionManager._registerInternalExtension(extensionInstance);
        vm.extensionManager._loadedExtensions.set(
          extensionInstance.getInfo().id,
          serviceName,
        );
      })();
    });
  })();
} catch (e) {
  console.error(e);
}
