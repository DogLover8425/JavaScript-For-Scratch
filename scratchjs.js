try {
  (function () {
    "use strict";

    console.log("%cScratch%cJS", "color: lime; font-size: 24px; font-weight: bold;", "color: yellow; font-size: 24px; font-weight: bold;");
    console.log(`Thanks for using ScratchJS! This is the developer console, here you can find some debug information and error messages.
If you are a developer of ScratchJS, remember to enable the developer tools on the popup window to see extra logging.
See more about ScratchJS at https://ironbill25.github.io/projects/scratchjs/`);

    let devmode = false;
    let vmtries = 0;

    /**
     * Waits for the Scratch VM to be available and calls the callback with it.
     * @param {Function} callback - The function to call with the VM.
     */
    function waitForVM(callback) {
      if (window.vm) {
        callback(window.vm);
        return console.log("VM already available");
      }
      vmtries++;
      if (vmtries > 15) {
        console.error("VM not found after 15 tries, stopping attempts. Please report this error on the ScratchJS GitHub page (https://github.com/IronBill25/JavaScript-For-Scratch/issues)");
        return;
      }
      console.log("waiting for VM, try " + vmtries);
      const el = document.querySelector(
        'div[class*="stage-header_stage-header-wrapper"]',
      );
      console.log("Check 1 - el:", el);
      if (!el) return console.log("No stage header found");
      console.log("Check 2 - el keys:", Object.keys(el));

      const reactKey = Object.keys(el).find(
        (k) =>
          k.startsWith("__reactFiber$") ||
          k.startsWith("__reactInternalInstance$"),
      );
      console.log("Check 3 - reactKey:", reactKey);
      if (!reactKey) return console.log("No react key found");

      let fiber = el[reactKey];
      console.log("Check 4 - fiber:", fiber);
      while (fiber && !fiber.stateNode) fiber = fiber.return;
      console.log("Check 5 - fiber after loop:", fiber);
      const vm =
        fiber?.stateNode?.props?.vm ||
        fiber?.return?.return?.return?.return?.updateQueue?.stores?.[0]?.value
          ?.vm;
      console.log("Check 6 - vm:", vm);

      if (vm) {
        console.log(
          "%c[Scratch Injector]%c VM found!",
          "color: lime;",
          "color: none;",
        );
        window.vm = vm;
        callback(vm);
      } else {
        setTimeout(() => waitForVM(callback), 1000);
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
      <br>A project using this extension can do the following:</p>
      <ul>
      <li> Modify the website
      <li> Open pages and links
      <li> Send data to other websites
      <li> Access stored data
      </ul>
      <p>
      <br>Please make sure you trust the creator of this project.
      <br>If you don't trust this project, click "Cancel".
      </p>
      <button id="scratchjs-ok-button" disabled onclick="window.sjs_userConsent();document.getElementById('scratchjs-warning-modal').remove()">Please wait, extension is loading</button>
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

        #scratchjs-warning-modal button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          opacity: 0.7;
        }

        #scratchjs-warning-modal p {
          margin: 0;
          color: black !important;
          text-align: center;
        }

        #scratchjs-warning-modal label {
          color: black !important;
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
      modal.querySelector("#scratchjs-devmode-checkbox").checked =
        localStorage.getItem("scratchjs_devMode") === "true";
      devmode = localStorage.getItem("scratchjs_devMode") === "true" || false;
      document.body.appendChild(modal);
    }

    window.tryParse = function (value) {
      try {
        return JSON.parse(value);
      } catch {
        console.log("Failed to parse:", value);
        return value;
      }
    };

    window.devLogging = function (extensionInstance) {
      if (!devmode) return;
      console.log(
        `ScratchJS currently has ${extensionInstance.getInfo().blocks.length} blocks!`,
      );
      for (const block of extensionInstance.getInfo().blocks) {
        if (
          block.opcode &&
          (!(block.opcode in extensionInstance) ||
            typeof extensionInstance[block.opcode] !== "function")
        ) {
          console.warn(
            `[DEVELOPER WARNING] Missing function for block: ${block.opcode}`,
          );
        }
      }
    };

    waitForVM(async (vm) => {
      // Extension code.
      console.log(
        "%c[ScratchJS]%c Using ScratchJS!",
        "color: lime;",
        "color: none;",
      );

      window.categories = [
        "math",
        "constants",
        "booleans",
        "strings",
        "specialreporters",
        "corejs",
        "console",
        "controlflow",
        "storage",
        "utilities",
        "tempvars",
        "arrays",
        "objects",
        "data",
        "games",
        "datetime",
        "statistics",
        "browser",
        "color",
        "input",
        "timing",
        "enhanced",
        "unicode",
      ];

      warningModal();

      window.cursor_x = -1;
      window.cursor_y = -1;
      window.cursor_down = false;

      window.pressedKeys = {};
      window.lastKey = "";
      window.wheelDelta = 0;

      window.allBlocks = [];

      window.allFunctions = {};

      async function loadBlockFiles() {
        console.log("Loading blocks file...");

        const loadingButton = document.getElementById("scratchjs-ok-button");
        if (loadingButton) {
          loadingButton.textContent = "Loading blocks...";
        }

        try {
          const timestamp = Date.now();
          const response = await fetch(
            "https://cdn.jsdelivr.net/gh/Ironbill25/JavaScript-For-Scratch@refs/heads/main/dist/bundle.js?t=" +
              timestamp,
          );
          if (response.ok) {
            const code = await response.text();
            eval(code);
            console.log("[OK] Loaded bundled blocks");
          } else {
            console.warn(`Failed to load bundle: ${response.status}`);
          }
        } catch (e) {
          console.warn(`Failed to load bundle:`, e);
        }

        console.log("Checking arrays");

        for (const category of categories) {
          console.log(
            `${category}:`,
            window["sjs_" + category]?.length || "undefined",
          );
        }

        const readyButton = document.getElementById("scratchjs-ok-button");
        if (readyButton) {
          readyButton.disabled = false;
          readyButton.textContent = "OK";
        }
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
        window.sjs_lastKey = event.key;
      };

      document.onkeyup = function (event) {
        pressedKeys[event.key.toLowerCase()] = false;
      };

      document.onwheel = function (event) {
        wheelDelta = event.deltaY;
        window.sjs_wheelDelta = event.deltaY;
        setTimeout(() => {
          wheelDelta = 0;
          window.sjs_wheelDelta = 0;
        }, 100);
      };

      window.sjs_i = 0;
      window.sjs_inLoop = false;
      window.sjs_arri = 0;
      window.sjs_inArrLoop = false;
      window.sjs_currentArray = "";
      window.sjs_currentItem = "";
      window.sjs_lsnamespace = "";
      window.sjs_tempVariables = {};

      window.sjs_errorCount = 0;
      window.sjs_errorLog = [];
      window.sjs_maxErrors = 50;

      window.sjs_getErrorStats = function () {
        return {
          totalErrors: window.sjs_errorCount,
          recentErrors: window.sjs_errorLog.length,
          errorLog: [...window.sjs_errorLog],
          mostCommonError: window.sjs_errorLog.reduce((acc, err) => {
            acc[err.error] = (acc[err.error] || 0) + 1;
            return acc;
          }, {}),
        };
      };

      window.sjs_clearErrorLog = function () {
        window.sjs_errorCount = 0;
        window.sjs_errorLog = [];
        console.log("[ScratchJS] Error log cleared");
      };

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

        const wrappedFunction = function (...args) {
          try {
            return fun.apply(this, args);
          } catch (error) {
            window.sjs_errorCount++;

            const errorInfo = {
              opcode,
              blockType,
              error: error.message,
              timestamp: new Date().toISOString(),
              args: args.length,
            };

            window.sjs_errorLog.unshift(errorInfo);
            if (window.sjs_errorLog.length > window.sjs_maxErrors) {
              window.sjs_errorLog = window.sjs_errorLog.slice(
                0,
                window.sjs_maxErrors,
              );
            }

            console.error(
              `[ScratchJS] A block has thrown an error! Please report this to the developer at https://github.com/Ironbill25/JavaScript-For-Scratch/issues`,
            );
            console.error(
              `[ScratchJS] Error #${window.sjs_errorCount}: Block "${opcode}" (${blockType}) failed:`,
              error,
            );
            console.error(
              `[ScratchJS] Arguments received: ${args.length} | Error: ${error.message}`,
            );

            switch (blockType) {
              case BlockType.REPORTER:
                return `Error: ${error.message}`;
              case BlockType.BOOLEAN:
                return false;
              case BlockType.COMMAND:
              case BlockType.HAT:
              case BlockType.LOOP:
                return undefined;
              default:
                return null;
            }
          }
        };

        window.allFunctions[opcode] = wrappedFunction;
        return window.allBlocks[window.allBlocks.length - 1];
      };

      function formatBlocksCategory(name) {
        return (window["sjs_" + name] || []).push(Spacer);
      }

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
          window.open("https://ironbill25.github.io/projects/scratchjs/docs");
        }

        getInfo() {
          return {
            id: "math" /* ID Math because it's one of the only valid IDs that work */,
            name: "ScratchJS",
            color1: "#FF6600",
            color2: "#E65C00",
            color3: "#CC5200",
            blocks: (() => {
              const blocks = [
                Block(BlockType.COMMAND, "OpenDocs", "Open Documentation"),
              ];

              categories.forEach((category) => {
                blocks.push(Spacer);
                blocks.push(...(window[`sjs_${category}`] || []));
              });

              return blocks;
            })(),
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
              httpMethodMenu: Menu(
                [
                  MenuItem("GET", "GET"),
                  MenuItem("POST", "POST"),
                  MenuItem("PUT", "PUT"),
                  MenuItem("DELETE", "DELETE"),
                ],
                "GET",
              ),
              timeFormatMenu: Menu(
                [
                  MenuItem("ISO", "ISO"),
                  MenuItem("local", "local"),
                  MenuItem("date", "date"),
                  MenuItem("time", "time"),
                  MenuItem("unix", "unix"),
                ],
                "ISO",
              ),
              hashAlgorithmMenu: Menu([MenuItem("simple", "simple")], "simple"),
              diceSidesMenu: Menu(
                [
                  MenuItem("4", "4"),
                  MenuItem("6", "6"),
                  MenuItem("8", "8"),
                  MenuItem("10", "10"),
                  MenuItem("12", "12"),
                  MenuItem("20", "20"),
                  MenuItem("100", "100"),
                ],
                "6",
              ),
              passwordOptionsMenu: Menu(
                [
                  MenuItem("letters", "letters"),
                  MenuItem("numbers", "numbers"),
                  MenuItem("letters+numbers", "letters+numbers"),
                  MenuItem("all", "all"),
                ],
                "letters+numbers",
              ),
              rpsMenu: Menu(
                [
                  MenuItem("rock", "rock"),
                  MenuItem("paper", "paper"),
                  MenuItem("scissors", "scissors"),
                ],
                "rock",
              ),
              dateFormatMenu: Menu(
                [
                  MenuItem("MM/DD/YYYY", "MM/DD/YYYY"),
                  MenuItem("DD/MM/YYYY", "DD/MM/YYYY"),
                  MenuItem("YYYY-MM-DD", "YYYY-MM-DD"),
                  MenuItem("Month DD, YYYY", "Month DD, YYYY"),
                ],
                "MM/DD/YYYY",
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

      window.sjs_userConsent = async function () {
        window.sjs_hasUserConsent = true;

        const dontShowAgainCheckbox = document.getElementById(
          "scratchjs-dontshowagain-checkbox",
        );
        if (dontShowAgainCheckbox && dontShowAgainCheckbox.checked) {
          localStorage.setItem("scratchjs_dontShowAgain", "true");
        }

        const devModeCheckbox = document.getElementById(
          "scratchjs-devmode-checkbox",
        );
        if (devModeCheckbox && devModeCheckbox.checked) {
          localStorage.setItem("scratchjs_devMode", "true");
        }

        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
          if (retryCount === maxRetries - 1) {
            const allBlocks = categories.flatMap(
              (category) => window[`sjs_${category}`] || [],
            );

            console.log(allBlocks);

            const missingFunctions = allBlocks.filter(
              (block) =>
                block.opcode && !(block.opcode in (window.allFunctions || {})),
            );
            console.warn(
              "Missing functions for blocks:",
              missingFunctions.map((b) => b.opcode),
            );
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 500));
          retryCount++;
        }

        var extensionInstance = new ScratchJS(vm.extensionManager.runtime);

        for (const [opcode, func] of Object.entries(
          window.allFunctions || {},
        )) {
          extensionInstance[opcode] = func;
        }
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
