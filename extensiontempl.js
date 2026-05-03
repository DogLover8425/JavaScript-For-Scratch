const YourExtensionName = "Replace This!";

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
        console.error("VM not found after 15 tries, stopping attempts. Please report this error on [INSERT YOUR WEBSITE LINK HERE]");
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
      let vm =
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
          "%c[Injector]%c VM found!",
          "color: lime;",
          "color: none;",
        );
        window.vm = vm;
        callback(vm);
      } else {
        setTimeout(() => waitForVM(callback), 1000);
      }
    }

waitForVM((vm) => {
  // Extension code.
  console.log(
    `%c[${YourExtensionName}]%c Using ${YourExtensionName}!`,
    "color: lime;",
    "color: none;",
  );

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

  const Argument = (type, defaultValue, acceptReporters = true) => ({
    type,
    defaultValue,
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

  /* These are some enums that should be used in the block definitions */
  const BlockType = {
    REPORTER: "reporter",
    COMMAND: "command",
    HAT: "hat",
    BOOLEAN: "Boolean",
    BUTTON: "button",
    CONDITIONAL: "conditional",
    EVENT: "event",
    LOOP: "loop",
  };

  const ArgumentType = {
    STRING: "string",
    NUMBER: "number",
    BOOLEAN: "Boolean",
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

  class Your_Extension {
    /* You can change the name but make sure to use
    find-and-replace to update all references.
    Underline added to differentiate from other variables. */
    constructor(runtime) {
      this.runtime = runtime;
    }

    exampleBlock({ text, number, color }) {
      return text + " " + number + " " + color;
    }

    getInfo() {
      return {
        id: "math", // Please don't change this, this is the only valid ID that we know works
        color1: "#FF6600", // You can change these colors though
        color2: "#CC5200",
        name: YourExtensionName,
        blocks: [ // Add your blocks here ===========================================================
          Block(BlockType.REPORTER, "exampleBlock", "Example block [text] [number] [color]", {
            text: Argument(ArgumentType.STRING, "Hello"),
            number: Argument(ArgumentType.NUMBER, 42),
            color: Argument(ArgumentType.COLOR, "#FF0000"),
          }),
        ],
      };
    }
  }

  // This will register the extension with the VM, please don't change this code
  (function (vm) {
    var extensionInstance = new Your_Extension(vm.extensionManager.runtime);
    var serviceName =
      vm.extensionManager._registerInternalExtension(extensionInstance);
    vm.extensionManager._loadedExtensions.set(
      extensionInstance.getInfo().id,
      serviceName,
    );
  })(vm);
});
