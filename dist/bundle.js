(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // scratchjsblocks/math.js
  var require_math = __commonJS({
    "scratchjsblocks/math.js"(exports, module) {
      window.sjs_math = [
        Block(BlockType.BUTTON, "mathCategory", "Math"),
        Block(BlockType.REPORTER, "powerBlock", "[base] ^ [exponent]", {
          base: { type: "number", defaultValue: 2 },
          exponent: { type: "number", defaultValue: 3 }
        }, ({ base, exponent }) => Math.pow(base, exponent)),
        Block(
          BlockType.REPORTER,
          "clampBlock",
          "Clamp [value] between [min] and [max]",
          {
            value: Argument("number", 15),
            min: Argument("number", 0),
            max: Argument("number", 10)
          },
          ({ value, min, max }) => Math.min(Math.max(value, min), max)
        ),
        Block(
          BlockType.REPORTER,
          "roundNumber",
          "Round [number] to [decimals] decimal places",
          {
            number: Argument("number", 3.14159),
            decimals: Argument("number", 2)
          },
          ({ number, decimals }) => Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals)
        ),
        Block(BlockType.REPORTER, "percentageBlock", "[percentage]% of [whole]", {
          percentage: Argument("number", 25),
          whole: Argument("number", 100)
        }, ({ percentage, whole }) => percentage / 100 * whole),
        Block(BlockType.REPORTER, "increment", "[value]++", {
          value: Argument("number", 5)
        }, ({ value }) => Number(value) + 1),
        Block(BlockType.REPORTER, "decrement", "[value]--", {
          value: Argument("number", 5)
        }, ({ value }) => Number(value) - 1),
        Block(BlockType.BOOLEAN, "isEven", "[number] is even", {
          number: Argument("number", 4)
        }, ({ number }) => Number(number) % 2 === 0),
        Block(BlockType.BOOLEAN, "isOdd", "[number] is odd", {
          number: Argument("number", 3)
        }, ({ number }) => Number(number) % 2 !== 0),
        Block(BlockType.BOOLEAN, "isInt", "[number] is an integer", {
          number: Argument("number", 3.14)
        }, ({ number }) => Number.isInteger(Number(number))),
        Block(BlockType.BOOLEAN, "isFinite", "[number] is finite", {
          number: Argument("number", 3.14)
        }, ({ number }) => isFinite(Number(number))),
        Block(BlockType.BOOLEAN, "isNumber", "[number] is a number", {
          number: Argument("number", 6)
        }, ({ number }) => !isNaN(Number(number))),
        Block(BlockType.BOOLEAN, "isFloat", "[number] has decimals", {
          number: Argument("number", 2.71)
        }, ({ number }) => !Number.isInteger(Number(number))),
        Block(BlockType.REPORTER, "evalExpr", "Evaluate math [expr]", {
          expr: Argument("string", "2 + 2")
        }, ({ expr }) => eval(expr))
      ];
    }
  });

  // scratchjsblocks/corejs.js
  var require_corejs = __commonJS({
    "scratchjsblocks/corejs.js"(exports, module) {
      window.sjs_corejs = [
        Block(BlockType.BUTTON, "corejsCategory", "JS Operations"),
        Block(BlockType.COMMAND, "RunJS", "Run JS code [code]", {
          code: Argument("string", "alert('Hello World!')")
        }, ({ code }) => {
          eval(code);
        }),
        Block(BlockType.REPORTER, "getReturnValOfJS", "Get return value of [code]", {
          code: Argument("string", "6473 / 84")
        }, ({ code }) => {
          return eval(code);
        }),
        Block(BlockType.REPORTER, "getUserInfo", "Get info on the [what]", {
          what: ArgumentWithMenu("string", "OS", "userInfoMenu")
        }, ({ what }) => {
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
        }),
        Spacer,
        // Web/extra JS
        Block(BlockType.COMMAND, "OpenSite", "Open site [url]", {
          url: Argument("string", "https://example.com")
        }, ({ url }) => {
          window.open(url);
        }),
        Block(BlockType.COMMAND, "OpenInTurbowarp", "Open this project in Turbowarp", {}, () => {
          const projectID = window.location.pathname.split("/")[2];
          window.open(`https://turbowarp.org/${projectID}`, "_blank");
        }),
        Block(BlockType.REPORTER, "fetchSite", "Fetch site [url]", {
          url: Argument("string", "https://example.com")
        }, ({ url }) => {
          return fetch(url).then((res) => res.text());
        }),
        Block(BlockType.COMMAND, "ReloadPage", "Reload page", {}, () => {
          location.reload();
        }),
        Block(
          BlockType.COMMAND,
          "SaveFile",
          "Save file [name] with contents [contents]",
          {
            name: Argument("string", "example.txt"),
            contents: Argument("string", "Hello World!")
          },
          ({ name: name2, contents }) => {
            const a = document.createElement("a");
            a.download = name2;
            a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(contents)}`;
            a.click();
          }
        ),
        Block(BlockType.COMMAND, "setVar", "Set variable [name] to [val]", {
          name: Argument("string", "window.example"),
          val: Argument("string", "Hello World!")
        }, ({ name, val }) => {
          eval(`${name}="${val}";`);
        })
      ];
    }
  });

  // scratchjsblocks/timing.js
  var require_timing = __commonJS({
    "scratchjsblocks/timing.js"(exports, module) {
      window.sjs_timing = [
        Block(BlockType.BUTTON, "timingCategory", "Timing"),
        Block(BlockType.COMMAND, "setTimeoutBlock", "After [delay] ms run [code] (timeout)", {
          delay: Argument("number", 1e3),
          code: Argument("string", "alert('Hello!')")
        }, ({ delay, code }) => {
          setTimeout(() => eval(code), parseInt(delay));
        }),
        Block(BlockType.REPORTER, "setIntervalBlock", "Every [delay] ms run [code] (interval)", {
          delay: Argument("number", 1e3),
          code: Argument("string", "console.log('Tick')")
        }, ({ delay, code }) => {
          return setInterval(() => eval(code), parseInt(delay));
        }),
        Block(BlockType.COMMAND, "clearIntervalBlock", "Clear interval [intervalId]", {
          intervalId: Argument("number", 1)
        }, ({ intervalId }) => {
          clearInterval(parseInt(intervalId));
        }),
        Block(BlockType.REPORTER, "currentTimestamp", "Current timestamp", {}, () => {
          return Date.now().toString();
        }),
        Block(BlockType.REPORTER, "formatTime", "Format timestamp [timestamp] as [format]", {
          timestamp: Argument("number", Date.now()),
          format: ArgumentWithMenu("string", "ISO", "timeFormatMenu")
        }, ({ timestamp, format }) => {
          const date = new Date(timestamp);
          switch (format) {
            case "ISO":
              return date.toISOString();
            case "local":
              return date.toLocaleString();
            case "date":
              return date.toLocaleDateString();
            case "time":
              return date.toLocaleTimeString();
            case "unix":
              return Math.floor(timestamp / 1e3).toString();
            default:
              return date.toString();
          }
        })
      ];
    }
  });

  // scratchjsblocks/blockimports.js
  var import_math = __toESM(require_math());

  // scratchjsblocks/constants.js
  window.sjs_constants = [
    Block(BlockType.BUTTON, "constantsCategory", "Constants"),
    Block(BlockType.BOOLEAN, "trueBlock", "True", {}, () => true),
    Block(BlockType.BOOLEAN, "falseBlock", "False", {}, () => false),
    Block(BlockType.REPORTER, "newlineBlock", "Newline", {}, () => "\n"),
    Block(BlockType.REPORTER, "tabBlock", "Tab", {}, () => "	"),
    Spacer,
    // More constants
    Block(BlockType.REPORTER, "piBlock", "\u03C0", {}, () => Math.PI),
    Block(BlockType.REPORTER, "eBlock", "e", {}, () => Math.E),
    Block(BlockType.REPORTER, "phiBlock", "\u03C6", {}, () => (1 + Math.sqrt(5)) / 2),
    Block(BlockType.REPORTER, "eulergammaBlock", "\u03B3", {}, () => 0.5772156649015329),
    Block(BlockType.REPORTER, "infinityBlock", "\u221E", {}, () => Infinity),
    Block(BlockType.REPORTER, "negativeInfinityBlock", "-\u221E", {}, () => -Infinity)
  ];

  // scratchjsblocks/booleans.js
  window.sjs_booleans = [
    Block(BlockType.BUTTON, "booleansCategory", "Booleans"),
    Block(BlockType.BOOLEAN, "boolOperation", "[val1] [op] [val2]", {
      val1: Argument("string", "true"),
      op: ArgumentWithMenu("string", "and", "boolOpMenu"),
      val2: Argument("string", "false")
    }, ({ val1, val2, op }) => {
      switch (op) {
        case "and":
          return val1 && val2;
        case "or":
          return val1 || val2;
        case "xor":
          return val1 !== val2;
        case "nand":
          return !(val1 && val2);
        case "nor":
          return !(val1 || val2);
        case "xnor":
          return val1 === val2;
        case "implies":
          return !val1 || val2;
        case "n-implies":
          return val1 && !val2;
        case "greater":
          return val1 > val2;
        case "less":
          return val1 < val2;
        case "greater-equal":
          return val1 >= val2;
        case "less-equal":
          return val1 <= val2;
        case "equal":
          return val1 == val2;
        case "not-equal":
          return val1 != val2;
        case "exactly-equal":
          return val1 === val2;
        case "bitwise-and":
          return val1 & val2;
        case "bitwise-or":
          return val1 | val2;
        case "bitwise-xor":
          return val1 ^ val2;
        case "bitwise-not":
          return ~val1;
        case "left-shift":
          return val1 << val2;
        case "right-shift":
          return val1 >> val2;
        case "zero-fill-right-shift":
          return val1 >>> val2;
        case "add":
          return val1 + val2;
        case "subtract":
          return val1 - val2;
        case "multiply":
          return val1 * val2;
        case "divide":
          return val1 / val2;
        case "modulo":
          return val1 % val2;
        case "power":
          return val1 ** val2;
        case "scientific":
          return Number(`${val1}e+${val2}`);
        case "join":
          return val1 + val2;
        case "contains":
          return val1.includes(val2);
        case "startsWith":
          return val1.startsWith(val2);
        case "endsWith":
          return val1.endsWith(val2);
        case "repeated":
          return val1.repeat(val2);
        case "padstart":
          return val1.padStart(val2, " ");
        case "padend":
          return val1.padEnd(val2, " ");
        default:
          return false;
      }
    }),
    Block(BlockType.BOOLEAN, "moreOrEqualsBlock", "[value1] >= [value2]", {
      value1: Argument("number", 5),
      value2: Argument("number", 5)
    }, ({ value1, value2 }) => value1 >= value2),
    Block(BlockType.BOOLEAN, "lessOrEqualsBlock", "[value1] <= [value2]", {
      value1: Argument("number", 5),
      value2: Argument("number", 5)
    }, ({ value1, value2 }) => value1 <= value2),
    Block(BlockType.BOOLEAN, "inequalityBlock", "[value1] \u2260 [value2]", {
      value1: Argument("number", 5),
      value2: Argument("number", 5)
    }, ({ value1, value2 }) => value1 != value2)
  ];

  // scratchjsblocks/strings.js
  window.sjs_strings = [
    Block(BlockType.BUTTON, "stringsCategory", "Strings"),
    Block(
      BlockType.REPORTER,
      "strReplaceBlock",
      "Replace all [string] in [text] with [replace]",
      {
        text: Argument("string", "Hello World"),
        string: Argument("string", "World"),
        replace: Argument("string", "Scratch")
      },
      ({ text, string, replace }) => text.replace(string, replace)
    ),
    Block(
      BlockType.REPORTER,
      "substringBlock",
      "Get substring of [text] from [start] to [end]",
      {
        text: Argument("string", "Hello World"),
        start: Argument("number", 1),
        end: Argument("number", 6)
      },
      ({ text, start, end }) => {
        return text.substring(start - 1, end);
      }
    ),
    Block(BlockType.REPORTER, "reverseStringBlock", "Reverse string [text]", {
      text: Argument("string", "Hello World")
    }, ({ text }) => text.split("").reverse().join("")),
    Block(BlockType.REPORTER, "changeCase", "Convert [text] to case [caseType]", {
      text: Argument("string", "Hello World"),
      caseType: ArgumentWithMenu("string", "uppercase", "caseTypeMenu")
    }, ({ text, caseType }) => {
      switch (caseType) {
        case "uppercase":
          return text.toUpperCase();
        case "lowercase":
          return text.toLowerCase();
        default:
          return text;
      }
    }),
    Block(BlockType.REPORTER, "padString", "Pad [text] to length [length] characters on [side] with [char]", {
      text: Argument("string", "Hello"),
      length: Argument("number", 10),
      side: ArgumentWithMenu("string", "left", "padSideMenu"),
      char: Argument("string", " ")
    }, ({ text, length, side, char }) => {
      if (side === "left") {
        return text.padStart(length, char);
      } else {
        return text.padEnd(length, char);
      }
    }),
    Block(BlockType.REPORTER, "repeatString", "Repeat [text] [times] times", {
      text: Argument("string", "Hello"),
      times: Argument("number", 3)
    }, ({ text, times }) => text.repeat(times)),
    Block(BlockType.REPORTER, "countOccurrences", "Count occurrences of [text] in [string]", {
      text: Argument("string", "l"),
      string: Argument("string", "Hello World")
    }, ({ text, string }) => {
      let count = 0;
      let pos = 0;
      while ((pos = string.indexOf(text, pos)) !== -1) {
        count++;
        pos += text.length;
      }
      return count;
    }),
    Block(BlockType.REPORTER, "matchRegex", "Match regular expression [regex] in [text]", {
      regex: Argument("string", "[a-z]+"),
      text: Argument("string", "Hello World")
    }, ({ regex, text }) => {
      const matches = text.match(new RegExp(regex, "g"));
      return matches ? JSON.stringify(matches) : "";
    }),
    Block(BlockType.REPORTER, "joinLen3", "Join [t1] [t2] [t3]", {
      t1: Argument("string", "Hello"),
      t2: Argument("string", " "),
      t3: Argument("string", "World")
    }, ({ t1, t2, t3 }) => t1 + t2 + t3),
    Block(BlockType.REPORTER, "joinLen4", "Join [t1] [t2] [t3] [t4]", {
      t1: Argument("string", "Hello"),
      t2: Argument("string", " "),
      t3: Argument("string", "World"),
      t4: Argument("string", "!")
    }, ({ t1, t2, t3, t4 }) => t1 + t2 + t3 + t4),
    Block(BlockType.REPORTER, "joinLen5", "Join [t1] [t2] [t3] [t4] [t5]", {
      t1: Argument("string", "Hello"),
      t2: Argument("string", " "),
      t3: Argument("string", "World"),
      t4: Argument("string", "!"),
      t5: Argument("string", "?")
    }, ({ t1, t2, t3, t4, t5 }) => t1 + t2 + t3 + t4 + t5),
    Block(BlockType.REPORTER, "joinLen6", "Join [t1] [t2] [t3] [t4] [t5] [t6]", {
      t1: Argument("string", "Hello"),
      t2: Argument("string", " "),
      t3: Argument("string", "World"),
      t4: Argument("string", "!"),
      t5: Argument("string", "?"),
      t6: Argument("string", "!")
    }, ({ t1, t2, t3, t4, t5, t6 }) => t1 + t2 + t3 + t4 + t5 + t6)
  ];

  // scratchjsblocks/specialreporters.js
  window.sjs_specialreporters = [
    Block(BlockType.BUTTON, "specialreportersCategory", "Special Reporters"),
    Block(BlockType.REPORTER, "getCurrentDateTime", "current [format]", {
      format: ArgumentWithMenu("string", "datetime", "dateFormatMenu")
    }, ({ format }) => {
      const date = /* @__PURE__ */ new Date();
      switch (format) {
        case "datetime":
          return date.toLocaleString();
        case "date":
          return date.toLocaleDateString();
        case "time":
          return date.toLocaleTimeString();
        default:
          return date.toLocaleString();
      }
    }),
    Block(BlockType.REPORTER, "currentProjectID", "Current project ID", {}, () => {
      return window.scratchProjectId || "Unknown";
    })
  ];

  // scratchjsblocks/blockimports.js
  var import_corejs = __toESM(require_corejs());

  // scratchjsblocks/console.js
  window.sjs_console = [
    Block(BlockType.BUTTON, "consoleCategory", "Console"),
    Block(BlockType.COMMAND, "logBlock", "Log to console [message]", {
      message: Argument("string", "Something worked!")
    }, ({ message }) => {
      console.log(message);
    }),
    Block(BlockType.COMMAND, "warningBlock", "Log warning to console [message]", {
      message: Argument("string", "Warning!")
    }, ({ message }) => {
      console.warn(message);
    }),
    Block(BlockType.COMMAND, "errorBlock", "Log error to console [message]", {
      message: Argument("string", "Error!")
    }, ({ message }) => {
      console.error(message);
    }),
    Block(BlockType.COMMAND, "clearConsole", "Clear console", {}, () => {
      console.clear();
    }),
    Block(BlockType.COMMAND, "alertBlock", "Show alert [message]", {
      message: Argument("string", "Hello World!")
    }, ({ message }) => {
      alert(message);
    }),
    Block(BlockType.BOOLEAN, "confirmBlock", "Confirm [message]", {
      message: Argument("string", "Are you sure?")
    }, ({ message }) => {
      return confirm(message);
    }),
    Block(BlockType.REPORTER, "promptBlock", "Prompt [message]", {
      message: Argument("string", "What is your name?")
    }, ({ message }) => {
      return prompt(message);
    })
  ];

  // scratchjsblocks/controlflow.js
  window.sjs_controlflow = [
    Block(BlockType.BUTTON, "controlflowCategory", "Control Flow"),
    Block(BlockType.HAT, "whenCondition", "when [condit] is true", {
      condit: {
        type: "Boolean",
        defaultValue: "Put any boolean block here"
      }
    }, ({ condit }) => {
      return Boolean(condit);
    }),
    Block(BlockType.LOOP, "forInLoop", "For i in [value]", {
      value: Argument("string", "10")
    }, ({ value }, util) => {
      if (!window.sjs_inLoop) {
        window.sjs_i = 0;
      }
      if (++window.sjs_i <= value) {
        window.sjs_inLoop = true;
        util.startBranch(1, true);
      } else {
        window.sjs_i = 0;
        window.sjs_inLoop = false;
      }
    }),
    Block(BlockType.REPORTER, "iReporter", "i", {}, () => window.sjs_i),
    Block(BlockType.COMMAND, "setI", "Set i to [value]", {
      value: Argument("number", 0)
    }, ({ value }) => {
      window.sjs_i = value;
    })
  ];

  // scratchjsblocks/storage.js
  window.sjs_storage = [
    Block(BlockType.BUTTON, "storageCategory", "Storage"),
    Block(BlockType.COMMAND, "setLocalstorageNamespace", "Set LocalStorage namespace to [namespace]", {
      namespace: Argument("string", "Replace this with a unique namespace for your project")
    }, ({ namespace }) => {
      window.sjs_lsnamespace = namespace;
    }),
    Block(BlockType.COMMAND, "setLocalstorageKey", "Set LocalStorage key [key] to [value]", {
      key: Argument("string", "key"),
      value: Argument("string", "value")
    }, ({ key, value }) => {
      localStorage.setItem(window.sjs_lsnamespace + key, value);
    }),
    Block(BlockType.REPORTER, "getLocalstorageKey", "Get LocalStorage key [key]", {
      key: Argument("string", "key")
    }, ({ key }) => {
      return localStorage.getItem(window.sjs_lsnamespace + key);
    }),
    Block(BlockType.COMMAND, "removeLocalstorageKey", "Remove LocalStorage key [key]", {
      key: Argument("string", "key")
    }, ({ key }) => {
      localStorage.removeItem(window.sjs_lsnamespace + key);
    }),
    Block(BlockType.COMMAND, "clearLocalstorage", "Clear LocalStorage", {}, () => {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(window.sjs_lsnamespace)) {
          localStorage.removeItem(key);
        }
      });
    })
  ];

  // scratchjsblocks/utilities.js
  window.sjs_utilities = [
    Block(BlockType.BUTTON, "utilitiesCategory", "General Utilities"),
    Block(BlockType.REPORTER, "stringReport", "[arg1]", {
      arg1: Argument("string", "Hello")
    }, ({ arg1 }) => arg1),
    Block(BlockType.REPORTER, "ifBoolStringElseString", "If [arg1] then [arg2] else [arg3]", {
      arg1: Argument("Boolean"),
      arg2: Argument("string", "Hello"),
      arg3: Argument("string", "World")
    }, ({ arg1, arg2, arg3 }) => arg1 ? arg2 : arg3),
    Block(BlockType.REPORTER, "ifBoolString", "If [arg1] then [arg2]", {
      arg1: Argument("Boolean"),
      arg2: Argument("string", "Hello")
    }, ({ arg1, arg2 }) => {
      if (arg1) {
        return arg2;
      }
      return "";
    }),
    Block(BlockType.REPORTER, "outOfBoundsMouseX", "Mouse X (works out of bounds)", {}, () => window.cursor_x),
    Block(BlockType.REPORTER, "outOfBoundsMouseY", "Mouse Y (works out of bounds)", {}, () => window.cursor_y),
    Block(BlockType.BOOLEAN, "outOfBoundsMouseDown", "Mouse down? (works out of bounds)", {}, () => window.cursor_down),
    Block(BlockType.BOOLEAN, "textToBool", "[bool]", {
      bool: Argument("string", "true")
    }, ({ bool }) => bool === "true" || bool === "1" || bool === "True" || bool !== "0" && bool !== "false" && bool !== "False"),
    Block(BlockType.REPORTER, "boolToText", "[bool]", {
      bool: Argument("Boolean")
    }, ({ bool }) => new Boolean(bool).toString())
  ];

  // scratchjsblocks/tempvars.js
  window.sjs_tempvars = [
    Block(BlockType.BUTTON, "tempvarsCategory", "Temporary Variables"),
    Block(BlockType.COMMAND, "setTemp", "Set temporary [key] to [value]", {
      key: Argument("string", "key"),
      value: Argument("string", "value")
    }, ({ key, value }) => {
      window.sjs_tempVariables[key] = value;
    }),
    Block(BlockType.REPORTER, "getTemp", "Get temporary [key]", {
      key: Argument("string", "key")
    }, ({ key }) => {
      return window.sjs_tempVariables[key];
    }),
    Block(BlockType.COMMAND, "delTemp", "Delete temporary [key]", {
      key: Argument("string", "key")
    }, ({ key }) => {
      delete window.sjs_tempVariables[key];
    }),
    Block(BlockType.COMMAND, "clearAllTemp", "Clear all temporary variables", {}, () => {
      Object.keys(window.sjs_tempVariables).forEach((key) => delete window.sjs_tempVariables[key]);
    }),
    Block(BlockType.REPORTER, "allTempVars", "All temporary variables", {}, () => {
      return JSON.stringify(window.sjs_tempVariables);
    })
  ];

  // scratchjsblocks/arrays.js
  window.sjs_arrays = [
    Block(BlockType.BUTTON, "arraysCategory", "Arrays"),
    Block(BlockType.BOOLEAN, "isValidJson", "Is [text] valid JSON?", {
      text: Argument("string", '{"key":"value"}')
    }, ({ text }) => {
      try {
        JSON.parse(text);
        return true;
      } catch (e) {
        return false;
      }
    }),
    Spacer,
    Block(BlockType.REPORTER, "blankArray", "ARRAY | Blank array", {}, () => "[]"),
    Block(BlockType.REPORTER, "addToArray", "ARRAY | Append [value] to array [array]", {
      value: Argument("string", "Hello"),
      array: Argument("string", "[]")
    }, ({ array, value }) => JSON.stringify([...tryParse(array), value])),
    Block(BlockType.REPORTER, "getFromArray", "ARRAY | Get [index] from array [array]", {
      index: Argument("number", 1),
      array: Argument("string", "[]")
    }, ({ array, index }) => tryParse(array)[--index]),
    Block(BlockType.REPORTER, "insertIntoArray", "ARRAY | Insert [value] at [index] in array [array]", {
      value: Argument("string", "Hello"),
      index: Argument("number", 1),
      array: Argument("string", '["Apple"]')
    }, ({ array, index, value }) => {
      const arr = tryParse(array);
      arr.splice(--index, 0, value);
      return JSON.stringify(arr);
    }),
    Block(BlockType.REPORTER, "replaceInArray", "ARRAY | Replace [index] in array [array] with [value]", {
      index: Argument("number", 1),
      array: Argument("string", '["Apple"]'),
      value: Argument("string", "Banana")
    }, ({ array, index, value }) => {
      const arr = tryParse(array);
      arr[--index] = value;
      return JSON.stringify(arr);
    }),
    Block(BlockType.REPORTER, "removeFromArray", "ARRAY | Remove [index] from array [array]", {
      index: Argument("number", 1),
      array: Argument("string", '["Apple"]')
    }, ({ array, index }) => {
      const arr = tryParse(array);
      arr.splice(--index, 1);
      return JSON.stringify(arr);
    }),
    Block(BlockType.REPORTER, "mergeArrays", "ARRAY | Merge [array1] and [array2]", {
      array1: Argument("string", '["Hello"]'),
      array2: Argument("string", '["World"]')
    }, ({ array1, array2 }) => JSON.stringify([...tryParse(array1), ...tryParse(array2)])),
    Block(BlockType.REPORTER, "lengthOfArray", "ARRAY | Length of array [array]", {
      array: Argument("string", '["Apple", "Banana"]')
    }, ({ array }) => tryParse(array).length),
    Block(BlockType.BOOLEAN, "arrayHas", "ARRAY | Array [array] contains [value]", {
      array: Argument("string", '["Apple", "Banana"]'),
      value: Argument("string", "Carrot")
    }, ({ array, value }) => tryParse(array).includes(value)),
    Block(BlockType.REPORTER, "indexOf", "ARRAY | Index of [value] in array [array]", {
      value: Argument("string", "Hello"),
      array: Argument("string", '["Apple"]')
    }, ({ array, value }) => {
      const index = tryParse(array).indexOf(value);
      return index === -1 ? 0 : index + 1;
    }),
    Block(BlockType.REPORTER, "splitString", "ARRAY | Split [string] by [delimiter] into array", {
      string: Argument("string", "Hello, World"),
      delimiter: Argument("string", ",")
    }, ({ string, delimiter }) => JSON.stringify(string.split(delimiter))),
    Block(BlockType.REPORTER, "joinArray", "ARRAY | Join array [array] with [delimiter]", {
      array: Argument("string", '["Hello", "World"]'),
      delimiter: Argument("string", ",")
    }, ({ array, delimiter }) => tryParse(array).join(delimiter)),
    Block(BlockType.REPORTER, "swapArrayItems", "ARRAY | Swap [index1] and [index2] in array [array]", {
      index1: Argument("number", 1),
      index2: Argument("number", 2),
      array: Argument("string", '["Apple", "Banana"]')
    }, ({ index1, index2, array }) => {
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
    }),
    Block(BlockType.REPORTER, "getItemsFrom", "ARRAY | Get items from [start] to [end] from array [array]", {
      start: Argument("number", 2),
      end: Argument("number", 3),
      array: Argument("string", '["Apple", "Banana", "Carrot"]')
    }, ({ start, end, array }) => {
      let res;
      try {
        res = JSON.parse(array);
      } catch {
        return array;
      }
      return JSON.stringify(res.slice(start - 1, end - 1));
    }),
    Block(BlockType.LOOP, "arrayLoop", "ARRAY | For each item in array [array] do", {
      array: Argument("string", '["Apple", "Banana"]')
    }, ({ array }, util) => {
      let parsed = tryParse(array);
      if (!window.sjs_inArrLoop) {
        window.sjs_arri = 0;
      }
      if (++window.sjs_arri <= parsed.length) {
        window.sjs_inArrLoop = true;
        window.sjs_currentArray = array;
        window.sjs_currentItem = parsed[window.sjs_arri - 1];
        util.startBranch(1, true);
      } else {
        window.sjs_arri = 0;
        window.sjs_inArrLoop = false;
      }
    }),
    Block(BlockType.REPORTER, "arrayLoopItem", "ARRAY | Current item", {}, () => window.sjs_currentItem),
    Block(BlockType.REPORTER, "arrayLoopIndex", "ARRAY | Current index", {}, () => window.sjs_arri),
    Block(BlockType.REPORTER, "rawArray", "ARRAY | Raw array [array]", {
      array: Argument("string", '["Apple", "Banana"]')
    }, ({ array }) => tryParse(array))
  ];

  // scratchjsblocks/objects.js
  window.sjs_objects = [
    Block(BlockType.BUTTON, "objectsCategory", "Objects"),
    Block(BlockType.REPORTER, "blankObject", "OBJECT | Blank object", {}, () => "{}"),
    Block(BlockType.BOOLEAN, "isObject", "OBJECT | Is [value] an object?", {
      value: Argument("string", "{}")
    }, ({ value }) => typeof tryParse(value) === "object"),
    Block(BlockType.REPORTER, "setInObject", "OBJECT | Set [key] in object [object] to [value]", {
      key: Argument("string", "name"),
      object: Argument("string", "{}"),
      value: Argument("string", "John")
    }, ({ object, key, value }) => {
      const obj = tryParse(object);
      obj[key] = value;
      return JSON.stringify(obj);
    }),
    Block(BlockType.REPORTER, "getFromObject", "OBJECT | Get [key] from object [object]", {
      key: Argument("string", "name"),
      object: Argument("string", '{"name": "John"}')
    }, ({ object, key }) => tryParse(object)[key]),
    Block(BlockType.REPORTER, "deleteFromObject", "OBJECT | Delete [key] from object [object]", {
      key: Argument("string", "name"),
      object: Argument("string", '{"name": "John"}')
    }, ({ object, key }) => {
      const obj = tryParse(object);
      delete obj[key];
      return JSON.stringify(obj);
    }),
    Block(BlockType.BOOLEAN, "objectHasKey", "OBJECT | Object [object] has key [key]", {
      object: Argument("string", '{"name": "John"}'),
      key: Argument("string", "name")
    }, ({ object, key }) => tryParse(object).hasOwnProperty(key)),
    Block(BlockType.REPORTER, "keysOfObject", "OBJECT | Keys of object [object] (array)", {
      object: Argument("string", '{"name": "John"}')
    }, ({ object }) => JSON.stringify(Object.keys(tryParse(object)))),
    Block(BlockType.REPORTER, "valuesOfObject", "OBJECT | Values of object [object] (array)", {
      object: Argument("string", '{"name": "John"}')
    }, ({ object }) => JSON.stringify(Object.values(tryParse(object)))),
    Block(BlockType.REPORTER, "entriesOfObject", "OBJECT | Entries of object [object] (array)", {
      object: Argument("string", '{"name": "John"}')
    }, ({ object }) => JSON.stringify(Object.entries(tryParse(object)))),
    Block(BlockType.REPORTER, "sizeOfObject", "OBJECT | Size of object [object]", {
      object: Argument("string", '{"name": "John"}')
    }, ({ object }) => Object.keys(tryParse(object)).length),
    Block(BlockType.REPORTER, "pathInObject", "OBJECT | Get path (array) [path] from object [object]", {
      path: Argument("string", '["name"]'),
      object: Argument("string", '{"name": "John"}')
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
      path: Argument("string", '["name"]'),
      object: Argument("string", "{}"),
      value: Argument("string", "John")
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
    Block(BlockType.REPORTER, "rawObject", "OBJECT | Raw object [object]", {
      object: Argument("string", '{"name": "John"}')
    }, ({ object }) => tryParse(object))
  ];

  // scratchjsblocks/data.js
  window.sjs_data = [
    Block(BlockType.BUTTON, "dataCategory", "Data"),
    Block(BlockType.REPORTER, "parseCsv", "Parse CSV [csv]", {
      csv: Argument("string", "Name,Age,City\nJohn,25,NYC\nJane,30,LA")
    }, ({ csv }) => {
      try {
        const lines = csv.trim().split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        const data = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map((v) => v.trim());
          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || "";
          });
          data.push(row);
        }
        return JSON.stringify(data);
      } catch (e) {
        return "[]";
      }
    }),
    Block(BlockType.REPORTER, "arrayToCsv", "Array [array] to CSV", {
      array: Argument("string", '[{"Name":"John","Age":25},{"Name":"Jane","Age":30}]')
    }, ({ array }) => {
      try {
        const data = JSON.parse(array);
        if (!Array.isArray(data) || data.length === 0) return "";
        const headers = Object.keys(data[0]);
        const csvLines = [headers.join(",")];
        data.forEach((row) => {
          const values = headers.map((header) => {
            const value = row[header] || "";
            return typeof value === "string" && value.includes(",") ? `"${value}"` : value;
          });
          csvLines.push(values.join(","));
        });
        return csvLines.join("\n");
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "formatNumber", "Format [number] to [decimals] decimals", {
      number: Argument("number", 3.141592),
      decimals: Argument("number", 2)
    }, ({ number, decimals }) => {
      return parseFloat(number).toFixed(parseInt(decimals));
    }),
    Block(BlockType.REPORTER, "generateUuid", "Generate UUID", {}, () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }),
    Block(BlockType.REPORTER, "base64Encode", "Base64 encode [text]", {
      text: Argument("string", "Hello World")
    }, ({ text }) => {
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "base64Decode", "Base64 decode [text]", {
      text: Argument("string", "SGVsbG8gV29ybGQ=")
    }, ({ text }) => {
      try {
        return decodeURIComponent(escape(atob(text)));
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "hashString", "Hash [text] with [algorithm]", {
      text: Argument("string", "Hello World"),
      algorithm: ArgumentWithMenu("string", "simple", "hashAlgorithmMenu")
    }, ({ text, algorithm }) => {
      if (algorithm === "simple") {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
          const char = text.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
      }
      return "";
    }),
    Block(BlockType.REPORTER, "parseXml", "Parse XML [xml]", {
      xml: Argument("string", "<root><item>test</item></root>")
    }, ({ xml }) => {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        return doc.documentElement.outerHTML;
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "jsonToTable", "Convert JSON [json] to table", {
      json: Argument("string", '[{"name":"John","age":25},{"name":"Jane","age":30}]')
    }, ({ json }) => {
      try {
        const data = JSON.parse(json);
        if (!Array.isArray(data) || data.length === 0) return "";
        const headers = Object.keys(data[0]);
        let table = "<table border='1'>";
        table += "<tr>" + headers.map((h) => `<th>${h}</th>`).join("") + "</tr>";
        data.forEach((row) => {
          table += "<tr>" + headers.map((h) => `<td>${row[h] || ""}</td>`).join("") + "</tr>";
        });
        table += "</table>";
        return table;
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "compressString", "Compress [text] (simple)", {
      text: Argument("string", "aaaaabbbbcc")
    }, ({ text }) => {
      let compressed = "";
      let count = 1;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === text[i + 1]) {
          count++;
        } else {
          compressed += text[i] + (count > 1 ? count : "");
          count = 1;
        }
      }
      return compressed;
    }),
    Block(BlockType.REPORTER, "decompressString", "Decompress [text] (simple)", {
      text: Argument("string", "a4b4c2")
    }, ({ text }) => {
      let decompressed = "";
      let i = 0;
      while (i < text.length) {
        const char = text[i];
        let count = "";
        while (i + 1 < text.length && !isNaN(text[i + 1])) {
          count += text[i + 1];
          i++;
        }
        const repeatCount = count ? parseInt(count) : 1;
        decompressed += char.repeat(repeatCount);
        i++;
      }
      return decompressed;
    }),
    Block(BlockType.BOOLEAN, "isValidEmail", "Is [email] a valid email?", {
      email: Argument("string", "user@example.com")
    }, ({ email }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }),
    Block(BlockType.BOOLEAN, "isValidUrl", "Is [url] a valid URL?", {
      url: Argument("string", "https://example.com")
    }, ({ url }) => {
      try {
        new URL(url);
        return true;
      } catch (e) {
        return false;
      }
    }),
    Block(BlockType.REPORTER, "extractUrls", "Extract URLs from [text]", {
      text: Argument("string", "Visit https://example.com and http://test.org")
    }, ({ text }) => {
      const urlRegex = /https?:\/\/[^\s]+/g;
      const urls = text.match(urlRegex) || [];
      return JSON.stringify(urls);
    }),
    Block(BlockType.REPORTER, "extractEmails", "Extract emails from [text]", {
      text: Argument("string", "Contact user@example.com or admin@test.org")
    }, ({ text }) => {
      const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
      const emails = text.match(emailRegex) || [];
      return JSON.stringify(emails);
    }),
    Block(BlockType.REPORTER, "calculateAge", "Calculate age from birthdate [birthdate]", {
      birthdate: Argument("string", "2000-01-01")
    }, ({ birthdate }) => {
      try {
        const birth = new Date(birthdate);
        const today = /* @__PURE__ */ new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
          age--;
        }
        return age.toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "daysBetween", "Days between [date1] and [date2]", {
      date1: Argument("string", "2024-01-01"),
      date2: Argument("string", "2024-01-15")
    }, ({ date1, date2 }) => {
      try {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        const diffTime = Math.abs(d2 - d1);
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        return diffDays.toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "formatFileSize", "Format [bytes] as file size", {
      bytes: Argument("number", 1048576)
    }, ({ bytes }) => {
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (bytes === 0) return "0 Bytes";
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + " " + sizes[i];
    }),
    Block(BlockType.REPORTER, "formatNumberWithSuffix", "Format [number] with [decimals] decimals", {
      number: Argument("number", 1234.567),
      decimals: Argument("number", 2)
    }, ({ number, decimals }) => {
      const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "D", "Ud"];
      let absNumber = Math.abs(number);
      let suffixIndex = 0;
      while (absNumber >= 1e3 && suffixIndex < suffixes.length - 1) {
        absNumber /= 1e3;
        suffixIndex++;
      }
      const formatted = (number / Math.pow(1e3, suffixIndex)).toFixed(parseInt(decimals));
      return formatted + suffixes[suffixIndex];
    }),
    Block(BlockType.REPORTER, "generateRandomString", "Generate random string length [length]", {
      length: Argument("number", 10)
    }, ({ length }) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < parseInt(length); i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }),
    Block(BlockType.BOOLEAN, "isJsonEmpty", "Is JSON [json] empty?", {
      json: Argument("string", "{}")
    }, ({ json }) => {
      try {
        const parsed = JSON.parse(json);
        if (Array.isArray(parsed)) return parsed.length === 0;
        if (typeof parsed === "object") return Object.keys(parsed).length === 0;
        return false;
      } catch (e) {
        return true;
      }
    })
  ];

  // scratchjsblocks/games.js
  window.sjs_games = [
    Block(BlockType.BUTTON, "gamesCategory", "Games"),
    Block(BlockType.REPORTER, "rollDice", "Roll [sides] sided dice", {
      sides: ArgumentWithMenu("number", "6", "diceSidesMenu")
    }, ({ sides }) => {
      return Math.floor(Math.random() * parseInt(sides)) + 1;
    }),
    Block(BlockType.REPORTER, "randomChoice", "Random choice from [choices]", {
      choices: Argument("string", '["rock","paper","scissors"]')
    }, ({ choices }) => {
      try {
        const array = JSON.parse(choices);
        if (Array.isArray(array) && array.length > 0) {
          return array[Math.floor(Math.random() * array.length)];
        }
        return "";
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "shuffleArray", "Shuffle [array]", {
      array: Argument("string", '["A","B","C","D"]')
    }, ({ array }) => {
      try {
        const arr = JSON.parse(array);
        if (!Array.isArray(arr)) return "[]";
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return JSON.stringify(shuffled);
      } catch (e) {
        return "[]";
      }
    }),
    Block(BlockType.REPORTER, "dealCards", "Deal [count] cards from [deck]", {
      count: Argument("number", 5),
      deck: Argument("string", '["A\u2660","K\u2660","Q\u2660","J\u2660","10\u2660"]')
    }, ({ count, deck }) => {
      try {
        const cards = JSON.parse(deck);
        if (!Array.isArray(cards)) return "[]";
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        const dealt = shuffled.slice(0, parseInt(count));
        return JSON.stringify(dealt);
      } catch (e) {
        return "[]";
      }
    }),
    Block(BlockType.REPORTER, "generatePassword", "Generate password length [length] with [options]", {
      length: Argument("number", 12),
      options: ArgumentWithMenu("string", "letters+numbers", "passwordOptionsMenu")
    }, ({ length, options }) => {
      let chars = "";
      switch (options) {
        case "letters":
          chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "numbers":
          chars = "0123456789";
          break;
        case "letters+numbers":
          chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          break;
        case "all":
          chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
          break;
        default:
          chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      }
      let password = "";
      for (let i = 0; i < parseInt(length); i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    }),
    Block(BlockType.BOOLEAN, "isRockPaperScissorsWin", "Did [player] beat [opponent]?", {
      player: ArgumentWithMenu("string", "rock", "rpsMenu"),
      opponent: ArgumentWithMenu("string", "scissors", "rpsMenu")
    }, ({ player, opponent }) => {
      const winConditions = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
      };
      return winConditions[player] === opponent;
    }),
    Block(BlockType.BOOLEAN, "chance", "[percent]% chance", {
      percent: Argument("number", 50)
    }, ({ percent }) => {
      return Math.random() * 100 < parseInt(percent);
    }),
    Block(BlockType.REPORTER, "weightedRandom", "Weighted random from [choices] with [weights]", {
      choices: Argument("string", '["common","rare","epic"]'),
      weights: Argument("string", "[70,20,10]")
    }, ({ choices, weights }) => {
      try {
        const items = JSON.parse(choices);
        const weightArray = JSON.parse(weights);
        if (!Array.isArray(items) || !Array.isArray(weightArray) || items.length !== weightArray.length) {
          return "";
        }
        const totalWeight = weightArray.reduce((sum, w) => sum + parseInt(w), 0);
        let random = Math.random() * totalWeight;
        for (let i = 0; i < items.length; i++) {
          random -= parseInt(weightArray[i]);
          if (random <= 0) {
            return items[i];
          }
        }
        return items[items.length - 1];
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "diceRollSum", "Roll [dice]d[sides] dice", {
      dice: Argument("number", 2),
      sides: ArgumentWithMenu("number", "6", "diceSidesMenu")
    }, ({ dice, sides }) => {
      const numDice = parseInt(dice);
      const numSides = parseInt(sides);
      let sum = 0;
      for (let i = 0; i < numDice; i++) {
        sum += Math.floor(Math.random() * numSides) + 1;
      }
      return sum;
    })
  ];

  // scratchjsblocks/datetime.js
  window.sjs_datetime = [
    Block(BlockType.BUTTON, "datetimeCategory", "Date & Time"),
    Block(BlockType.REPORTER, "addDays", "Add [days] days to [date]", {
      days: Argument("number", 7),
      date: Argument("string", "2026-01-01")
    }, ({ days, date }) => {
      try {
        const d = new Date(date);
        d.setDate(d.getDate() + parseInt(days));
        return d.toISOString().slice(0, 10);
      } catch (e) {
        return date;
      }
    }),
    Block(BlockType.REPORTER, "subtractDays", "Subtract [days] days from [date]", {
      days: Argument("number", 7),
      date: Argument("string", "2026-01-01")
    }, ({ days, date }) => {
      try {
        const d = new Date(date);
        d.setDate(d.getDate() - parseInt(days));
        return d.toISOString().slice(0, 10);
      } catch (e) {
        return date;
      }
    }),
    Block(BlockType.REPORTER, "getDayOfWeek", "Day of week for [date]", {
      date: Argument("string", "2026-01-01")
    }, ({ date }) => {
      try {
        const d = new Date(date);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[d.getDay()];
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "getMonthName", "Month name for [date]", {
      date: Argument("string", "2026-01-01")
    }, ({ date }) => {
      try {
        const d = new Date(date);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        return months[d.getMonth()];
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.BOOLEAN, "isLeapYear", "Is [year] a leap year?", {
      year: Argument("number", 2024)
    }, ({ year }) => {
      const y = parseInt(year);
      return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0;
    }),
    Block(BlockType.REPORTER, "formatDuration", "Format [seconds] seconds as HH:MM:SS", {
      seconds: Argument("number", 3661)
    }, ({ seconds }) => {
      const totalSeconds = parseInt(seconds);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor(totalSeconds % 3600 / 60);
      const secs = totalSeconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }),
    Block(BlockType.REPORTER, "countdown", "Days until [targetDate]", {
      targetDate: Argument("string", "2026-12-25")
    }, ({ targetDate }) => {
      try {
        const target = new Date(targetDate);
        const today = /* @__PURE__ */ new Date();
        const diffTime = target - today;
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        return diffDays.toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "getAgeInDays", "Age in days from [birthdate]", {
      birthdate: Argument("string", "2000-01-01")
    }, ({ birthdate }) => {
      try {
        const birth = new Date(birthdate);
        const today = /* @__PURE__ */ new Date();
        const diffTime = today - birth;
        const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
        return diffDays.toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "getWeekNumber", "Week number for [date]", {
      date: Argument("string", "2026-01-01")
    }, ({ date }) => {
      try {
        const d = new Date(date);
        const firstDayOfYear = new Date(d.getFullYear(), 0, 1);
        const pastDaysOfYear = (d - firstDayOfYear) / 864e5;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7).toString();
      } catch (e) {
        return "1";
      }
    }),
    Block(BlockType.REPORTER, "getQuarter", "Quarter for [date]", {
      date: Argument("string", "2026-01-01")
    }, ({ date }) => {
      try {
        const d = new Date(date);
        return Math.ceil((d.getMonth() + 1) / 3).toString();
      } catch (e) {
        return "1";
      }
    }),
    Block(BlockType.BOOLEAN, "isWeekend", "Is [date] a weekend?", {
      date: Argument("string", "2026-01-01")
    }, ({ date }) => {
      try {
        const d = new Date(date);
        const day = d.getDay();
        return day === 0 || day === 6;
      } catch (e) {
        return false;
      }
    }),
    Block(BlockType.REPORTER, "getDaysInMonth", "Days in month for [date]", {
      date: Argument("string", "2026-01-01")
    }, ({ date }) => {
      try {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        return new Date(year, month, 0).getDate().toString();
      } catch (e) {
        return "30";
      }
    }),
    Block(BlockType.REPORTER, "formatDate", "Format [date] as [format]", {
      date: Argument("string", "2026-01-01"),
      format: ArgumentWithMenu("string", "MM/DD/YYYY", "dateFormatMenu")
    }, ({ date, format }) => {
      try {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");
        switch (format) {
          case "MM/DD/YYYY":
            return `${month}/${day}/${year}`;
          case "DD/MM/YYYY":
            return `${day}/${month}/${year}`;
          case "YYYY-MM-DD":
            return `${year}-${month}-${day}`;
          case "Month DD, YYYY":
            const months = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ];
            return `${months[d.getMonth()]} ${day}, ${year}`;
          default:
            return `${month}/${day}/${year}`;
        }
      } catch (e) {
        return date;
      }
    }),
    Block(BlockType.REPORTER, "getTimeAgo", "Time ago from [timestamp]", {
      timestamp: Argument("number", 17619952e5)
    }, ({ timestamp }) => {
      try {
        const past = new Date(parseInt(timestamp));
        const now = /* @__PURE__ */ new Date();
        const diffMs = now - past;
        const diffSeconds = Math.floor(diffMs / 1e3);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays > 0) return `${diffDays} days ago`;
        if (diffHours > 0) return `${diffHours} hours ago`;
        if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
        return `${diffSeconds} seconds ago`;
      } catch (e) {
        return "Unknown";
      }
    })
  ];

  // scratchjsblocks/statistics.js
  window.sjs_statistics = [
    Block(BlockType.BUTTON, "statisticsCategory", "Statistics"),
    Block(BlockType.REPORTER, "calculateMean", "Mean of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        const sum = nums.reduce((acc, num) => acc + parseFloat(num), 0);
        return (sum / nums.length).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "calculateMedian", "Median of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        const sorted = nums.map((num) => parseFloat(num)).sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
          return ((sorted[mid - 1] + sorted[mid]) / 2).toString();
        } else {
          return sorted[mid].toString();
        }
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "calculateMode", "Mode of [numbers]", {
      numbers: Argument("string", "[1, 2, 2, 3, 3, 3]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "";
        const frequency = {};
        nums.forEach((num) => {
          frequency[num] = (frequency[num] || 0) + 1;
        });
        let maxFreq = 0;
        let mode = "";
        for (const [num, freq] of Object.entries(frequency)) {
          if (freq > maxFreq) {
            maxFreq = freq;
            mode = num;
          }
        }
        return mode;
      } catch (e) {
        return "";
      }
    }),
    Block(BlockType.REPORTER, "calculateRange", "Range of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        const min = Math.min(...nums.map((num) => parseFloat(num)));
        const max = Math.max(...nums.map((num) => parseFloat(num)));
        return (max - min).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "calculateStandardDeviation", "Standard deviation of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        const values = nums.map((num) => parseFloat(num));
        const mean = values.reduce((acc, val2) => acc + val2, 0) / values.length;
        const squaredDiffs = values.map((val2) => Math.pow(val2 - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((acc, val2) => acc + val2, 0) / values.length;
        return Math.sqrt(avgSquaredDiff).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "findPercentile", "Percentile [percent] of [numbers]", {
      percent: Argument("number", 50),
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ percent, numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        const sorted = nums.map((num) => parseFloat(num)).sort((a, b) => a - b);
        const p = parseInt(percent) / 100;
        const index = p * (sorted.length - 1);
        if (index === Math.floor(index)) {
          return sorted[index].toString();
        } else {
          const lower = sorted[Math.floor(index)];
          const upper = sorted[Math.ceil(index)];
          const fraction = index - Math.floor(index);
          return (lower + fraction * (upper - lower)).toString();
        }
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "calculateVariance", "Variance of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        const values = nums.map((num) => parseFloat(num));
        const mean = values.reduce((acc, val2) => acc + val2, 0) / values.length;
        const squaredDiffs = values.map((val2) => Math.pow(val2 - mean, 2));
        const variance = squaredDiffs.reduce((acc, val2) => acc + val2, 0) / values.length;
        return variance.toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "findMin", "Minimum of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        return Math.min(...nums.map((num) => parseFloat(num))).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "findMax", "Maximum of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        return Math.max(...nums.map((num) => parseFloat(num))).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "calculateSum", "Sum of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums)) return "0";
        return nums.reduce((acc, num) => acc + parseFloat(num), 0).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "calculateProduct", "Product of [numbers]", {
      numbers: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ numbers }) => {
      try {
        const nums = JSON.parse(numbers);
        if (!Array.isArray(nums) || nums.length === 0) return "0";
        return nums.reduce((acc, num) => acc * parseFloat(num), 1).toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "countOccurrences", "Count occurrences of [value] in [array]", {
      value: Argument("string", "apple"),
      array: Argument("string", '["apple","banana","apple","orange"]')
    }, ({ value, array }) => {
      try {
        const arr = JSON.parse(array);
        if (!Array.isArray(arr)) return "0";
        return arr.filter((item) => item === value).length.toString();
      } catch (e) {
        return "0";
      }
    }),
    Block(BlockType.REPORTER, "getFrequency", "Frequency of all values in [array]", {
      array: Argument("string", '["apple","banana","apple","orange"]')
    }, ({ array }) => {
      try {
        const arr = JSON.parse(array);
        if (!Array.isArray(arr)) return "{}";
        const frequency = {};
        arr.forEach((item) => {
          frequency[item] = (frequency[item] || 0) + 1;
        });
        return JSON.stringify(frequency);
      } catch (e) {
        return "{}";
      }
    }),
    Block(BlockType.BOOLEAN, "isOutlier", "Is [value] an outlier in [array]?", {
      value: Argument("number", 100),
      array: Argument("string", "[1, 2, 3, 4, 5]")
    }, ({ value, array }) => {
      try {
        const nums = JSON.parse(array);
        if (!Array.isArray(nums) || nums.length < 4) return false;
        const sorted = nums.map((num) => parseFloat(num)).sort((a, b) => a - b);
        const q1Index = Math.floor(sorted.length * 0.25);
        const q3Index = Math.floor(sorted.length * 0.75);
        const q1 = sorted[q1Index];
        const q3 = sorted[q3Index];
        const iqr = q3 - q1;
        const lowerBound = q1 - 1.5 * iqr;
        const upperBound = q3 + 1.5 * iqr;
        const val2 = parseFloat(value);
        return val2 < lowerBound || val2 > upperBound;
      } catch (e) {
        return false;
      }
    }),
    Block(BlockType.REPORTER, "correlation", "Correlation between [array1] and [array2]", {
      array1: Argument("string", "[1, 2, 3, 4, 5]"),
      array2: Argument("string", "[2, 4, 6, 8, 10]")
    }, ({ array1, array2 }) => {
      try {
        const arr1 = JSON.parse(array1);
        const arr2 = JSON.parse(array2);
        if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
          return "0";
        }
        const n = arr1.length;
        const sum1 = arr1.reduce((acc, val2) => acc + parseFloat(val2), 0);
        const sum2 = arr2.reduce((acc, val2) => acc + parseFloat(val2), 0);
        const sum1Sq = arr1.reduce((acc, val2) => acc + Math.pow(parseFloat(val2), 2), 0);
        const sum2Sq = arr2.reduce((acc, val2) => acc + Math.pow(parseFloat(val2), 2), 0);
        const sum12 = arr1.reduce((acc, val2, i) => acc + parseFloat(val2) * parseFloat(arr2[i]), 0);
        const numerator = n * sum12 - sum1 * sum2;
        const denominator = Math.sqrt((n * sum1Sq - sum1 * sum1) * (n * sum2Sq - sum2 * sum2));
        return denominator === 0 ? "0" : (numerator / denominator).toString();
      } catch (e) {
        return "0";
      }
    })
  ];

  // scratchjsblocks/browser.js
  window.sjs_browser = [
    Block(BlockType.BUTTON, "browserCategory", "Browser"),
    Block(BlockType.REPORTER, "currentUrl", "Current page URL", {}, () => {
      return window.location.href;
    }),
    Block(BlockType.REPORTER, "getUrlParameter", "Get URL parameter [param]", {
      param: Argument("string", "id")
    }, ({ param }) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param) || "";
    }),
    Block(BlockType.COMMAND, "browserHistory", "Browser history [action]", {
      action: ArgumentWithMenu("string", "back", "historyActionMenu")
    }, ({ action }) => {
      if (action === "back") window.history.back();
      if (action === "forward") window.history.forward();
    }),
    Block(BlockType.COMMAND, "copyToClipboard", "Copy [text] to clipboard", {
      text: Argument("string", "Hello World")
    }, ({ text }) => {
      navigator.clipboard.writeText(text);
    }),
    Block(BlockType.REPORTER, "readClipboard", "Read from clipboard", {}, () => {
      return navigator.clipboard.readText();
    }),
    Block(BlockType.COMMAND, "toggleFullscreen", "Toggle fullscreen", {}, () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }),
    Block(BlockType.BOOLEAN, "isFullscreen", "Is fullscreen?", {}, () => {
      return !!document.fullscreenElement;
    }),
    Block(BlockType.COMMAND, "setPageTitle", "Set page title to [title]", {
      title: Argument("string", "My Scratch Project")
    }, ({ title }) => {
      document.title = title;
    }),
    Block(BlockType.REPORTER, "pageTitle", "Page title", {}, () => {
      return document.title;
    }),
    Block(BlockType.REPORTER, "scrollPosition", "Scroll position", {}, () => {
      return JSON.stringify([window.scrollX, window.scrollY]);
    }),
    Block(BlockType.COMMAND, "scrollTo", "Scroll to [x][y]", {
      x: Argument("number", 0),
      y: Argument("number", 0)
    }, ({ x, y }) => {
      window.scrollTo(parseInt(x), parseInt(y));
    })
  ];

  // scratchjsblocks/color.js
  window.sjs_color = [
    Block(BlockType.BUTTON, "colorCategory", "Color"),
    Block(BlockType.REPORTER, "randomColor", "Random color", {}, () => {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
    }),
    Block(BlockType.REPORTER, "hexToRgb", "HEX [hex] to RGB", {
      hex: Argument("string", "#FF6600")
    }, ({ hex }) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
    }),
    Block(BlockType.REPORTER, "rgbToHex", "RGB [r][g][b] to HEX", {
      r: Argument("number", 255),
      g: Argument("number", 102),
      b: Argument("number", 0)
    }, ({ r, g, b }) => {
      return "#" + [r, g, b].map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join("");
    }),
    Block(BlockType.REPORTER, "colorBlend", "Blend color [color1] and [color2]", {
      color1: Argument("string", "#FF6600"),
      color2: Argument("string", "#0066FF")
    }, ({ color1, color2 }) => {
      const hex1 = color1.replace("#", "");
      const hex2 = color2.replace("#", "");
      const r1 = parseInt(hex1.substr(0, 2), 16);
      const g1 = parseInt(hex1.substr(2, 2), 16);
      const b1 = parseInt(hex1.substr(4, 2), 16);
      const r2 = parseInt(hex2.substr(0, 2), 16);
      const g2 = parseInt(hex2.substr(2, 2), 16);
      const b2 = parseInt(hex2.substr(4, 2), 16);
      const r = Math.round((r1 + r2) / 2);
      const g = Math.round((g1 + g2) / 2);
      const b = Math.round((b1 + b2) / 2);
      return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
    })
  ];

  // scratchjsblocks/input.js
  window.sjs_input = [
    Block(BlockType.BUTTON, "inputCategory", "Input"),
    Block(BlockType.REPORTER, "lastKeyPressed", "Last key pressed", {}, () => {
      return window.sjs_lastKey;
    }),
    Block(BlockType.REPORTER, "mouseWheelDelta", "Mouse wheel delta", {}, () => {
      return window.sjs_wheelDelta;
    }),
    Block(BlockType.REPORTER, "mouseX", "Mouse X position", {}, () => {
      return window.cursor_x;
    }),
    Block(BlockType.REPORTER, "mouseY", "Mouse Y position", {}, () => {
      return window.cursor_y;
    }),
    Block(BlockType.REPORTER, "getPressedKeys", "Get all pressed keys", {}, () => {
      return JSON.stringify(Object.keys(window.pressedKeys).filter((key) => window.pressedKeys[key]));
    }),
    Block(BlockType.HAT, "whenKeyPressed", "When key [key] is pressed", {
      key: Argument("string", "a")
    }, ({ key }) => {
      return Boolean(window.pressedKeys.includes(key));
    })
  ];

  // scratchjsblocks/blockimports.js
  var import_timing = __toESM(require_timing());

  // scratchjsblocks/enhanced.js
  window.sjs_enhanced = [
    Block(BlockType.BUTTON, "enhancedCategory", "Miscellaneous"),
    Block(BlockType.REPORTER, "httpRequest", "HTTP [method] to [url] with [data]", {
      method: ArgumentWithMenu("string", "GET", "httpMethodMenu"),
      url: Argument("string", "https://example.com"),
      data: Argument("string", '{"key":"value"}')
    }, ({ method, url, data }) => {
      return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data
      }).then((res) => res.text());
    })
  ];

  // scratchjsblocks/unicode.js
  window.sjs_unicode = [
    Block(BlockType.BUTTON, "unicodeCategory", "Unicode"),
    Block(BlockType.REPORTER, "textToHexUnicode", "Text [text] to Hex Unicode", {
      text: Argument("string", "Hello")
    }, ({ text }) => {
      return text.split("").map((c) => "U+" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ");
    }),
    Block(BlockType.REPORTER, "hexUnicodeToText", "Hex Unicode [hex] to Text", {
      hex: Argument("string", "U+0048 U+0065 U+006C U+006C U+006F")
    }, ({ hex }) => {
      return hex.split(" ").map((c) => String.fromCharCode(parseInt(c.replace("U+", ""), 16))).join("");
    }),
    Block(BlockType.REPORTER, "textToUnicode", "Text [text] to Unicode", {
      text: Argument("string", "Hello")
    }, ({ text }) => {
      return text.split("").map((c) => c.charCodeAt(0)).join(" ");
    }),
    Block(BlockType.REPORTER, "unicodeToText", "Unicode [uni] to Text", {
      uni: Argument("string", "72 101 108 108 111")
    }, ({ uni }) => {
      return uni.split(" ").map((c) => String.fromCharCode(parseInt(c))).join("");
    })
  ];

  // scratchjsblocks/bignum.js
  window.sjs_bignum = [
    Block(BlockType.BUTTON, "bignumCategory", "Big Numbers", {}, () => "IMPORTANT: Make sure to stringify numbers BEFORE you put them in variables or lists, or the Scratch editor could crash!"),
    Block(BlockType.REPORTER, "parseAsBignum", "Convert to big number [num]", {
      num: Argument("string", "123")
    }, ({ num }) => {
      return BigInt(num);
    }),
    Block(BlockType.BOOLEAN, "isBignum", "Is [num] a big number?", {
      num: Argument("string", "123")
    }, ({ num }) => {
      try {
        return typeof BigInt(num) === "bigint";
      } catch {
        return false;
      }
    }),
    Block(BlockType.REPORTER, "bignumToString", "Big number [num] to string", {
      num: Argument("string", "123n")
    }, ({ num }) => {
      try {
        return BigInt(num).toString();
      } catch {
        return num.toString();
      }
    }),
    Block(BlockType.REPORTER, "bignumAdd", "[num1] + [num2]", {
      num1: Argument("string", "100000000000000000000"),
      num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) + BigInt(num2);
    }),
    Block(BlockType.REPORTER, "bignumSubtract", "[num1] - [num2]", {
      num1: Argument("string", "300000000000000000000"),
      num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) - BigInt(num2);
    }),
    Block(BlockType.REPORTER, "bignumMultiply", "[num1] \xD7 [num2]", {
      num1: Argument("string", "100000000000000000000"),
      num2: Argument("string", "2")
    }, ({ num1, num2 }) => {
      return BigInt(num1) * BigInt(num2);
    }),
    Block(BlockType.REPORTER, "bignumDivide", "[num1] \xF7 [num2]", {
      num1: Argument("string", "200000000000000000000"),
      num2: Argument("string", "2")
    }, ({ num1, num2 }) => {
      return BigInt(num1) / BigInt(num2);
    }),
    Block(BlockType.REPORTER, "bignumModulo", "[num1] mod [num2]", {
      num1: Argument("string", "100000000000000000001"),
      num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) % BigInt(num2);
    }),
    Block(BlockType.REPORTER, "bignumPower", "[num1] ^ [num2]", {
      num1: Argument("string", "2"),
      num2: Argument("number", 10)
    }, ({ num1, num2 }) => {
      return BigInt(num1) ** BigInt(num2);
    }),
    Block(BlockType.BOOLEAN, "bignumEqual", "[num1] = [num2]", {
      num1: Argument("string", "100000000000000000000"),
      num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) === BigInt(num2);
    }),
    Block(BlockType.BOOLEAN, "bignumNotEqual", "[num1] \u2260 [num2]", {
      num1: Argument("string", "100000000000000000000"),
      num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) !== BigInt(num2);
    }),
    Block(BlockType.BOOLEAN, "bignumGreater", "[num1] > [num2]", {
      num1: Argument("string", "200000000000000000000"),
      num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) > BigInt(num2);
    }),
    Block(BlockType.BOOLEAN, "bignumLess", "[num1] < [num2]", {
      num1: Argument("string", "100000000000000000000"),
      num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) < BigInt(num2);
    }),
    Block(BlockType.BOOLEAN, "bignumGreaterEqual", "[num1] \u2265 [num2]", {
      num1: Argument("string", "200000000000000000000"),
      num2: Argument("string", "100000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) >= BigInt(num2);
    }),
    Block(BlockType.BOOLEAN, "bignumLessEqual", "[num1] \u2264 [num2]", {
      num1: Argument("string", "100000000000000000000"),
      num2: Argument("string", "200000000000000000000")
    }, ({ num1, num2 }) => {
      return BigInt(num1) <= BigInt(num2);
    }),
    Block(BlockType.REPORTER, "bignumAbs", "Absolute value of [num]", {
      num: Argument("string", "-100000000000000000000")
    }, ({ num }) => {
      return BigInt(num) < 0n ? -BigInt(num) : BigInt(num);
    }),
    Block(BlockType.REPORTER, "bignumNegate", "-[num]", {
      num: Argument("string", "100000000000000000000")
    }, ({ num }) => {
      return -BigInt(num);
    })
  ];
})();
