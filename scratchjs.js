try {
  (function () {
    "use strict";

    console.log("%cScratch%cJS", "color: lime; font-size: 24px; font-weight: bold;", "color: yellow; font-size: 24px; font-weight: bold;");
    console.log(`Thanks for using ScratchJS! This is the developer console, here you can find some debug information and error messages.
If you are a developer of ScratchJS, remember to enable the developer tools on the popup window to see extra logging.
See more about ScratchJS at https://ironbill25.github.io/projects/scratchjs/`);

    let devmode = false;
    let vmtries = 0;
    let viewmode = false;
    let supportedSites = ["scratch.mit.edu", "penguinmod.com", "turbowarp.org", "librekitten.org", "canary.librekitten.org", "ampmod.codeberg.page", "omniblocks.github.io", "snail-ide.js.org", "sheeptester.github.io"];
    let partialSupport = [];
    let canary = false;
    window.sjs_extensionBlocks = [];

    function chkKey(obj, key) {
      if (!obj) return "No object provided";
      return Object.keys(obj).includes(key) ? obj[key] : "Key not found";
    }

    window.sjs_applyViewMode = () => {
      viewmode = true;
      document.getElementById("scratchjs-viewmode-info").style.display = "block";
      document.getElementById("scratchjs-viewmode-button").style.display = "none";
    };

    /**
     * Waits for the Scratch VM to be available and calls the callback with it.
     * @param {Function} callback - The function to call with the VM.
     */
    function waitForVM(callback) {
      let vm;
      if (window.vm) {
        callback(window.vm);
        return console.log("VM already available");
      }
      if (!supportedSites.includes(location.hostname)) {
        console.error("Unsupported site: " + location.hostname);
        if (!confirm("This is an unsupported site! This site has not been tested with ScratchJS and may not work properly. Do you want to continue?")) {
          return;
        }
      }
      if (partialSupport.includes(location.hostname)) {
        console.warn("Partially supported site: " + location.hostname);
        alert("This site is partially supported by ScratchJS. This means that the extension can load, but some features may be unavailable.\n\nIf you encounter any issues, please report them on the ScratchJS GitHub page ( https://github.com/IronBill25/JavaScript-For-Scratch/issues )");
      }
      vmtries++;
      if (vmtries > 15) {
        console.error("VM not found after 15 tries, stopping attempts. Please report this error on the ScratchJS GitHub page ( https://github.com/IronBill25/JavaScript-For-Scratch/issues )");
        return;
      }
      console.log("waiting for VM, try " + vmtries);
      const el = document.querySelector(
        'div[class*="stage-header_stage-header-wrapper"]',
      );
      if (!el) return console.log("No stage header found");

      const reactKey = Object.keys(el).find(
        (k) =>
          k.startsWith("__reactFiber$") ||
          k.startsWith("__reactInternalInstance$"),
      );
      console.log("Check 1 - reactKey:", reactKey);
      if (!reactKey) return console.log("No react key found");

      let fiber = el[reactKey];
      console.log("Check 2 - fiber:", fiber, fiber.memoizedProps);
      while (fiber && (chkKey(fiber.memoizedProps, "ariaLabel") !== "Stage")) {
        fiber = fiber.return;
        if (fiber?.stateNode?.props?.vm) break;
      }
      console.log("Check 3 - fiber after loop:", fiber);
      vm =
        fiber?.stateNode?.props?.vm ||
        fiber?.return?.return?.return?.return?.updateQueue?.stores?.[0]?.value
          ?.vm;
      console.log("Check 4 - vm:", vm);

      if (!vm && fiber?.memoizedProps) {
        vm = fiber.memoizedProps.vm;
        console.log("Check 5 - vm from memoizedProps:", vm);
      }

      if (vm) {
        console.log(
          "%c[ScratchJS]%c VM found!",
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
    
    window.sjs_toggleCanary = (checked) => {
      canary = checked;
    };

    window.sjs_addExtension = () => {
      document.getElementById("sjs-addon-file").click();
      document.getElementById("sjs-addon-file").onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          // load the addon, yeah this is a bit unsafe but i'm too lazy to add a sandbox
          // TODO: add a sandbox
          try {
            let addonblocks = eval(`(${content})`);
            console.log("debug: ", addonblocks);
            window.sjs_addBlocks(addonblocks);
            document.getElementById("scratchjs-addon-status").style.display = "block";
            document.getElementById("scratchjs-addon-status").textContent = "Addon loaded";
          } catch (error) {
            console.error("Error loading addon:", error);
            document.getElementById("scratchjs-addon-status").style.display = "block";
            document.getElementById("scratchjs-addon-status").textContent = "Please report this error to the addon creator. Error loading addon: " + error.message;
          }
        };
        reader.readAsText(file);
      };
    };

    window.sjs_addBlocks = (blocks) => {
      window.sjs_extensionBlocks = [...window.sjs_extensionBlocks, ...blocks];
    };

    function warningModal() {
      let modal = document.createElement("div");
      modal.innerHTML = `<span>Warning!</span>
      <p><b>PLEASE READ THIS!</b></p>
      <p>This extension has access to advanced features. 
      <br>Projects using this extension can potentially do dangerous things.
      <br>A project using this extension can do the following:</p>
      <ul>
      <li> Modify the website
      <li> Open pages and links
      <li> Send data to other websites
      <li> Access stored data
      <li> Get Scratch data
      </ul>
      <p>
      <br><strong>It is strongly recommended that you enable View Mode before you run this project so you can review the code.</strong>
      <br>Please make sure you trust the creator of this project.
      <br>If you don't trust this project, click "Cancel".
      </p>
      <br> <details id="scratchjs-details"><summary>For Project Creators</summary>
      Make sure to include a visible message stating that this project uses ScratchJS, ideally with the link to the bookmarklet. <br>
      It's good practice to do this because they need to know if the project uses ScratchJS. If they don't know, they might not <br>
      run the bookmarklet that is required for the project.<br>
      <br>
      For your convenience, we've made a template you can paste into your description:
      <pre style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">This project uses ScratchJS.
In order for this project to work, you must run the bookmarklet.
You can get the official bookmarklet here: https://scratch.mit.edu/projects/1316301635/</pre>
      </details>
      <button id="scratchjs-ok-button" disabled onclick="window.sjs_userConsent();document.getElementById('scratchjs-warning-modal').remove()">Please wait, extension is loading</button>
      <button onclick="document.getElementById('scratchjs-warning-modal').remove()">Cancel</button><br><br>
      <button id="scratchjs-viewmode-button" onclick="window.sjs_applyViewMode()" title="Adds the extension to the project, but doesn't let blocks run">View Mode</button>
      <p id="scratchjs-viewmode-info" style="display: none;">View Mode is enabled. This means that blocks will not be run, so you can safely view the project and review it for malicious code.</p>
      <button onclick="window.sjs_addExtension()">Load Addon</button>
      <p id="scratchjs-addon-status"></p>
      <div id="sjs-hidden-input" style="display: none;">
        <input type="file" id="sjs-addon-file" accept=".js,.json,.sjsaddon">
      </div>
      <div id="scratchjs-options-row">
      <input type="checkbox" id="scratchjs-devmode-checkbox" onchange="window.sjs_toggleDevMode(this.checked)">
      <label for="scratchjs-devmode-checkbox">Enable Developer Mode</label>
      <input type="checkbox" id="scratchjs-canary-checkbox" onchange="window.sjs_toggleCanary(this.checked)">
      <label for="scratchjs-canary-checkbox" title="Enables experimental features that are not fully tested and may be unstable. Please note that these features may break at any time. We suggest only using this on test projects.">Enable Canary Mode</label>
      </div>`;
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
          display: inline-block;
        }

        #scratchjs-warning-modal span {
          text-align: center;
          font-size: 2rem;
          color: red;
          font-weight: bold;
          -webkit-text-stroke: 1px yellow;
          text-shadow: 0 0 5px yellow;
        }

        #scratchjs-warning-modal ul {
          margin: 0;
          padding-left: 1rem;
          color: black;
        }

        #scratchjs-warning-modal li {
          margin: 0 !important;
          padding: 0 !important;
        }

        #scratchjs-devmode-checkbox {
          display: inline-block;
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
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
        }

        #scratchjs-viewmode-button {
          background: #ff6b6b;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        #scratchjs-details {
          color:white !important;
          border: 1px solid white;
          border-radius: 5px;
          padding: 10px;
          width: fit-content;
        }

        #scratchjs-details[open] {
          width: 60%;
        }

        #scratchjs-details summary {
          cursor: pointer;
          user-select: none;
          font-weight: bold;
          text-align: center;
        }

        #scratchjs-details pre {
          color: black !important;
        }

        #scratchjs-options-row {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: fit-content;
          padding-inline: 20px;
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
        "variables",
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
        "bignum",
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

      window.scratchProjectId = window.location.pathname.split("/")[2];

      async function loadBlockFiles() {
        console.log("Loading blocks file...");

        const loadingButton = document.getElementById("scratchjs-ok-button");
        if (loadingButton) {
          loadingButton.textContent = "Loading blocks...";
        }

        try {
          const timestamp = Date.now();
          const url = canary 
            ? "https://raw.githubusercontent.com/DogLover8425/JavaScript-For-Scratch/canary/dist/bundle.js?t=" 
            : "https://raw.githubusercontent.com/DogLover8425/JavaScript-For-Scratch/main/dist/bundle.js?t="; // NOTE: When pulling, remove this comment, and replace "DogLover8425" with "Ironbill25"
          const response = await fetch(url + timestamp, { cache: "no-store" });
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
      window.Block = (blockType, opcode, text, args = {}, fun = () => { }, othersettings = {}) => {

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
              case BlockType.BOOLEAN:
                return false;
              case BlockType.REPORTER:
              case BlockType.COMMAND:
              case BlockType.HAT:
              case BlockType.LOOP:
                return `An error occured: ${error.message}`;
              default:
                return null;
            }
          }
        };

        window.allBlocks.push({
          blockType: blockType || BlockType.COMMAND,
          opcode,
          text: text.includes("Category") ? `<a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>${text}</a>` : text,
          arguments: args,
          args,
          hideFromPalette: othersettings.hide || false,
          isTerminal: othersettings.terminal || false,
          blockAllThreads: othersettings.blockall || false,
          filter: othersettings.filter || null,
          acceptReporters: true, // literally no idea why i added this
        });

        window.allFunctions[opcode] = wrappedFunction;
        return window.allBlocks[window.allBlocks.length - 1];
      };

      function formatBlocksCategory(name) {
        return (window["sjs_" + name] || []).push(Spacer);
      }

      window.CategoryHeader = (text) => Block(BlockType.BUTTON, text.replaceAll(" ","") + "category", text, {}); // BlockType.,

      window.Argument = (type, defaultValue) => ({
        type,
        defaultValue,
        acceptReporters: true,
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
        acceptReporters: acceptReporters ?? true,
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
        BUTTON: "reporter",
        CONDITIONAL: "conditional",
        EVENT: "event",
        LOOP: "loop"
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
      window.ButtonEvent = {
        MAKE_A_LIST: "MAKE_A_LIST",
        MAKE_A_VARIABLE: "MAKE_A_VARIABLE",
        MAKE_A_PROCEDURE: "MAKE_A_PROCEDURE",
        // These are all that are supported by the Scratch VM right now
      };
      window.VariableType = {
        SCALAR: "",
        LIST: "list",
        BROADCAST: "broadcast_msg",
      };

      class VariableManager {
        constructor() {
          this.variables = new Map();
        }

        createVariable(util, type, name, value) {
          if (type === "global") {
            vm.runtime.createNewGlobalVariable(name);
            const variable = vm.runtime.getTargetForStage().lookupVariableByNameAndType(name, VariableType.SCALAR, true);
            variable.value = value;
            this.variables.set(name, variable);
          } else {
            util.target.createVariable(crypto.randomUUID(), name, value, false); // not cloud
            const variable = util.target.lookupVariableByNameAndType(name, VariableType.SCALAR, true);
            variable.value = value;
            this.variables.set(name, variable);
          }
        }

        getVariable(util, name) {
          return util.target.lookupVariableByNameAndType(name, VariableType.SCALAR, true);
        }

        deleteVariable(util, name) {
          const variable = this.getVariable(util, name);
          if (variable) {
            util.target.deleteVariable(variable.id);
            this.variables.delete(name);
          }
          return variable;
        }
      }

      window.variableManager = new VariableManager();


      await loadBlockFiles();



      window.ScratchJS = class {
        constructor(runtime, addonblocks) {
          this.runtime = runtime;
          this.addonblocks = addonblocks;
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
            docsURI: "https://ironbill25.github.io/projects/scratchjs/docs",
            blocks: (() => {
              const blocks = [
                Block(BlockType.COMMAND, "OpenDocs", "Open Documentation"),
              ];

              categories.forEach((category) => {
                blocks.push(Spacer);
                blocks.push(...(window[`sjs_${category}`] || []));
              });

              return [...this.addonblocks, ...blocks];
            })(),
            menus: window.sjs_menus || {},
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

        const devModeCheckbox = document.getElementById(
          "scratchjs-devmode-checkbox",
        );
        if (devModeCheckbox && devModeCheckbox.checked) {
          localStorage.setItem("scratchjs_devMode", "true");
        }


        const allBlocks = categories.flatMap(
          (category) => window[`sjs_${category}`] || [],
        );
        console.log("debug: ", window.sjs_extensionBlocks || "No blocks!");
        allBlocks.push(...(window.sjs_extensionBlocks || []));
        console.log("debug: ", allBlocks)
        
        console.log(allBlocks);

        const missingFunctions = allBlocks.filter(
          (block) =>
            block.opcode && !(block.opcode in (window.allFunctions || {})),
        );
        if (missingFunctions.length > 0) console.warn(
          "Missing functions for blocks:",
          missingFunctions.map((b) => b.opcode),
        );


        var extensionInstance = new ScratchJS(vm.extensionManager.runtime, window.sjs_extensionBlocks);

        if (viewmode) {
          for (const [opcode, func] of Object.entries(
            window.allFunctions || {},
          )) {
            extensionInstance[opcode] = () => "This block is disabled in view mode";
          }
        } else {
          for (const [opcode, func] of Object.entries(
            window.allFunctions || {},
          )) {
            extensionInstance[opcode] = func;
          }
        };
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
