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
      console.log(
        `ScratchJS currently has ${extensionInstance.getInfo().blocks.length} blocks!`,
      );
      for (const block of extensionInstance.getInfo().blocks) {
        if (
          !(block.opcode in extensionInstance) ||
          typeof extensionInstance[block.opcode] !== "function"
        ) {
          console.warn(
            `[DEVELOPER WARNING] Missing function for block: ${block.opcode}`,
          );
        }
      }
    }

    waitForVM(async (vm) => {
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

      let pressedKeys = {};
      let lastKey = "";
      let wheelDelta = 0;

      window.allBlocks = [];

      window.allFunctions = {};

      async function loadBlockFiles() {
        const blockFiles = [
          "scratchjsblocks/math.js",
          "scratchjsblocks/constants.js",
          "scratchjsblocks/booleans.js",
          "scratchjsblocks/strings.js",
          "scratchjsblocks/specialreporters.js",
          "scratchjsblocks/corejs.js",
          "scratchjsblocks/console.js",
          "scratchjsblocks/controlflow.js",
          "scratchjsblocks/storage.js",
          "scratchjsblocks/utilities.js",
          "scratchjsblocks/tempvars.js",
          "scratchjsblocks/arrays.js",
          "scratchjsblocks/objects.js",
          "scratchjsblocks/enhanced.js",
        ];

        console.log("Loading block files...");
        
        for (const file of blockFiles) {
          try {
            const response = await fetch(
              "https://raw.githubusercontent.com/Ironbill25/JavaScript-For-Scratch/refs/heads/main/" +
                file,
            );
            if (response.ok) {
              const code = await response.text();
              eval(code);
              console.log(`[OK] Loaded ${file}`);
            } else {
              console.warn(`Failed to load ${file}: ${response.status}`);
            }
          } catch (e) {
            console.warn(`Failed to load ${file}:`, e);
          }
        }

        // Debug: Check what was loaded
        console.log("Checking loaded arrays:");
        console.log("sjs_math:", window.sjs_math?.length || "undefined");
        console.log("sjs_constants:", window.sjs_constants?.length || "undefined");
        console.log("sjs_booleans:", window.sjs_booleans?.length || "undefined");
        console.log("sjs_strings:", window.sjs_strings?.length || "undefined");
        console.log("sjs_specialreporters:", window.sjs_specialreporters?.length || "undefined");
        console.log("sjs_corejs:", window.sjs_corejs?.length || "undefined");
        console.log("sjs_console:", window.sjs_console?.length || "undefined");
        console.log("sjs_controlflow:", window.sjs_controlflow?.length || "undefined");
        console.log("sjs_storage:", window.sjs_storage?.length || "undefined");
        console.log("sjs_utilities:", window.sjs_utilities?.length || "undefined");
        console.log("sjs_tempvars:", window.sjs_tempvars?.length || "undefined");
        console.log("sjs_arrays:", window.sjs_arrays?.length || "undefined");
        console.log("sjs_objects:", window.sjs_objects?.length || "undefined");
        console.log("sjs_enhanced:", window.sjs_enhanced?.length || "undefined");
      }

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

      document.onkeydown = function (event) {
        pressedKeys[event.key.toLowerCase()] = true;
        lastKey = event.key;
      };

      document.onkeyup = function (event) {
        pressedKeys[event.key.toLowerCase()] = false;
      };

      document.onwheel = function (event) {
        wheelDelta = event.deltaY;
        setTimeout(() => (wheelDelta = 0), 100);
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
       * @param {Function} fun - The function to execute when the block is run.
       * @returns {Object} - The block object.
       */
      window.Block = (blockType, opcode, text, args, fun) => {
        window.allBlocks.push({
          blockType: blockType || BlockType.COMMAND,
          opcode,
          text,
          arguments: args,
          args,
          hideFromPalette: false,
        });

        window.allFunctions[opcode] = fun;
      };

      window.Argument = (type, defaultValue) => ({
        type,
        defaultValue,
      });

      window.ArgumentWithMenu = (
        type,
        defaultValue,
        menu,
        acceptReporters = true,
      ) => ({
        type,
        defaultValue,
        menu,
        acceptReporters,
      });

      window.Menu = (items, defaultValue) => ({
        items,
        defaultValue,
      });

      window.MenuItem = (label, value) => ({
        text: label,
        value,
      });

      window.Spacer = "---";

      window.BlockType = {
        REPORTER: "reporter",
        COMMAND: "command",
        HAT: "hat",
        BOOLEAN: "Boolean", // Yes, this is supposed to be capitalized, I looked
        BUTTON: "button",
        CONDITIONAL: "conditional",
        EVENT: "event",
        LOOP: "loop",
      };
      window.ArgumentType = {
        STRING: "string",
        NUMBER: "number",
        BOOLEAN: "Boolean", // again, this is supposed to be capitalized
        COLOR: "color",
        MATRIX: "matrix",
        ANGLE: "angle",
        NOTE: "note",
        IMAGE: "image",
      };
      window.ReporterScope = {
        GLOBAL: "global",
        TARGET: "target",
      };
      window.TargetType = {
        SPRITE: "sprite",
        STAGE: "stage",
      };

      await loadBlockFiles();
      window.ScratchJS = class {
        constructor(runtime) {
          this.runtime = runtime;
        }
        OpenDocs() {
          window.open(
            "https://github.com/Ironbill25/JavaScript-For-Scratch/blob/main/README.md",
          );
        }
        getInfo() {
          return {
            id: "math" /* ID Math because it's one of the only valid IDs that work */,
            name: "ScratchJS",
            blocks: [
              Block(BlockType.COMMAND, "OpenDocs", "Open Documentation"),
              Spacer,
              ...(window.sjs_math || []),
              Spacer,
              ...(window.sjs_constants || []),
              Spacer,
              ...(window.sjs_booleans || []),
              Spacer,
              ...(window.sjs_strings || []),
              Spacer,
              ...(window.sjs_specialreporters || []),
              Spacer,
              ...(window.sjs_corejs || []),
              Spacer,
              ...(window.sjs_console || []),
              Spacer,
              ...(window.sjs_controlflow || []),
              Spacer,
              ...(window.sjs_storage || []),
              Spacer,
              ...(window.sjs_utilities || []),
              Spacer,
              ...(window.sjs_tempvars || []),
              Spacer,
              ...(window.sjs_arrays || []),
              Spacer,
              ...(window.sjs_objects || []),
              Spacer,
              ...(window.sjs_enhanced || []),
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
                "datetime",
              ),
              caseTypeMenu: Menu(
                [
                  MenuItem("UPPERCASE", "uppercase"),
                  MenuItem("lowercase", "lowercase"),
                ],
                "uppercase",
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
                "OS",
              ),
              boolOpMenu: Menu(
                [
                  MenuItem("AND", "and"),
                  MenuItem("OR", "or"),
                  MenuItem("XOR", "xor"),
                  MenuItem("NAND", "nand"),
                  MenuItem("NOR", "nor"),
                  MenuItem("XNOR", "xnor"),
                  MenuItem("Implies", "implies"),
                  MenuItem("Not-Implies", "n-implies"),
                  MenuItem(">", "greater"),
                  MenuItem("<", "less"),
                  MenuItem("≥", "greater-equal"),
                  MenuItem("≤", "less-equal"),
                  MenuItem("=", "equal"),
                  MenuItem("===", "exactly-equal"),
                  MenuItem("≠", "not-equal"),
                  MenuItem("+", "add"),
                  MenuItem("-", "subtract"),
                  MenuItem("×", "multiply"),
                  MenuItem("÷", "divide"),
                  MenuItem("%", "modulo"),
                  MenuItem("^", "power"),
                  MenuItem("* 10^", "scientific"),
                ],
                "and",
              ),
              padSideMenu: Menu(
                [MenuItem("left", "left"), MenuItem("right", "right")],
                "left",
              ),
              historyActionMenu: Menu(
                [MenuItem("back", "back"), MenuItem("forward", "forward")],
                "back",
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
      };
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
