try {
(function () {
  "use strict";
  function waitForVM(callback) {
    const check = setInterval(() => {
      const el = document.querySelector(
        'div[class*="stage-header_stage-header-wrapper"]'
      );
      if (!el) return;

      const reactKey = Object.keys(el).find(
        (k) =>
          k.startsWith("__reactFiber$") ||
          k.startsWith("__reactInternalInstance$")
      );
      if (!reactKey) return;

      let fiber = el[reactKey];
      while (fiber && !fiber.stateNode) fiber = fiber.return;
      const vm = fiber?.stateNode?.props?.vm;

      if (vm) {
        clearInterval(check);
        console.log(
          "%c[Scratch Injector]%c VM found!",
          "color: lime;",
          "color: none;"
        );
        callback(vm);
      }
    }, 1000);
  }

  waitForVM((vm) => {
    // this is the main part of the extension; do not modify unless you know what you're doing.
    console.log("using scratchjs");
    const from_s = (s) =>
      ("" + s)
        .split(" ")
        .map((s) => s.split(",").map((v) => (isNaN(+v) ? 0 : +v)));
    const to_s = (m) => m.map((v) => v.join(",")).join(" ");
    const safe_index = (m, i) => m[m.length == 1 ? 0 : i];
    const component_wise = (f) => (a, b) => {
      let [m, n] = a.length > b.length ? [a, b] : [b, a];
      return m.map((v, i) =>
        safe_index(n, i) == undefined
          ? v
          : f(safe_index(a, i), safe_index(b, i))
      );
    };
    var cursor_x = -1;
    var cursor_y = -1;
    var cursor_down = false;
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
    const component_wise2D = (f) => (a, b) =>
      component_wise(component_wise(f))(a, b);
    const add = component_wise((a, b) => a + b);
    const mul = component_wise((a, b) => a * b);
    const add2D = component_wise2D((a, b) => a + b);
    const sub2D = component_wise2D((a, b) => a - b);
    const mul2D = component_wise2D((a, b) => a * b);
    const div2D = component_wise2D((a, b) => a / b);
    const set = (i, m, v) => {
      if (m.length == 1) {
        if (m[0][i - 1] != undefined) m[0][i - 1] = v[0][0];
      } else {
        m[i - 1] = v[0];
      }
      return m;
    };
    const get = (i, m) => [
      m.length == 1 ? [m[0][i - 1]] ?? [] : m[i - 1] ?? [],
    ];
    const dot = (a, b) => {
      if (a.length == 1 && a[0].length == 3) a = a[0].map((v) => [v]);
      return b.map((bv) =>
        a.reduce((acc, av, i) => add(acc, mul(av, [safe_index(bv, i)])), 0)
      );
    };
    const det = (m, i1, i2) =>
      m[0][i1 % 3] * m[1][i2 % 3] - m[0][i2 % 3] * m[1][i1 % 3];
    const cross = component_wise((a, b) =>
      a.map((_, i) => det([a, b], i + 1, i + 2))
    );
    const length = (m) => m.map((v) => dot([v], [v]).map((v) => Math.sqrt(v)));
    const normalize = (m) => div2D(m, length(m));
    const rotate = (a, v) => {
      a = (a[0][0] * Math.PI) / 180;
      v = normalize(v)[0];
      const s = Math.sin(a);
      const c = Math.cos(a);
      const f1 = (i) => c + v[i] * v[i] * (1 - c);
      const f2 = (i, n) =>
        v[(i + 1) % 3] * v[(i + 2) % 3] * (1 - c) + n * v[i] * s;
      return [
        [f1(0), f2(2, 1), f2(1, -1)],
        [f2(2, -1), f1(1), f2(0, 1)],
        [f2(1, 1), f2(0, -1), f1(2)],
      ];
    };
    const letter = (i) => String.fromCharCode(97 + i);
    const auto_block = (blockType, opcode, text, args) => ({
      blockType,
      opcode,
      text,
      arguments: Object.fromEntries(
        new Array(text.split("[").length - 1)
          .fill()
          .map((_, i) => [
            letter(i),
            { type: (args && args[i]) || "string", defaultValue: " " },
          ])
      ),
      hideFromPalette: !0,
    });

    /**
     * Block factory function. Creates a block object with the given parameters.
     * @param {string} blockType - The type of the block (e.g., "reporter", "command", "hat", "bool").
     * @param {string} opcode - The opcode for the block.
     * @param {string} text - The text to display for the block.
     * @param {Array<string>} args - An array of argument types for the block.
     * @returns {Object} - The block object.
     */
    const makeblock = (blockType, opcode, text, args) => ({
      blockType: (blockType => {
        switch (blockType) {
        case "reporter":
          return "reporter";
        case "command":
          return "command";
        case "hat":
          return "hat";
        case "bool":
          return "Boolean";
        default:
          return "command";
        }
      })(blockType),
      opcode,
      text,
      arguments: Object.fromEntries(
        new Array(text.split("[").length - 1)
          .fill()
          .map((_, i) => [
            letter(i),
            { type: (args && args[i]) || "string", defaultValue: " " },
          ])
      ),
      hideFromPalette: false,
    });
    const mat_reporter_f = (f) => (o) =>
      to_s(
        f(
          ...new Array(Object.entries(o).length)
            .fill()
            .map((_, i) => from_s(o[letter(i)]))
        )
      );
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
          contents
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
        case 'date':
          return now.toLocaleDateString();
        case 'time':
          return now.toLocaleTimeString();
        case 'datetime':
          return now.toLocaleString();
        case 'timestamp':
          return now.getTime().toString();
        default:
          return now.toString();
      }
    }

    randomInRange({ min, max }) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    changeCase({ text, caseType }) {
      if (caseType === 'uppercase') return text.toUpperCase();
      if (caseType === 'lowercase') return text.toLowerCase();
      return text;
    }

    stringContains({ text, substring }) {
      return text.includes(substring);
    }

    roundNumber({ number, decimals }) {
      const factor = Math.pow(10, decimals);
      return Math.round(number * factor) / factor;
    }

    getInfo() {
        return {
          id: "scratchjs",
          name: "ScratchJS",
          blocks: [
            makeblock("reporter", "getCurrentDateTime", "current [format]", {
              format: {
                type: "string",
                menu: "dateFormatMenu",
                defaultValue: "datetime"
              }
            }),
            {
              blockType: "reporter",
              opcode: "randomInRange",
              text: "random number between [min] and [max]",
              arguments: {
                min: { type: "number", defaultValue: 1 },
                max: { type: "number", defaultValue: 10 }
              }
            },
            makeblock("reporter", "changeCase", "convert [text] to [caseType]", {
              text: { type: "string", defaultValue: "Hello World" },
                caseType: {
                  type: "string",
                  menu: "caseTypeMenu",
                  defaultValue: "uppercase"
                }
              }
            ),
            makeblock("reporter", "roundNumber", "round [number] to [decimals] decimal places", {
              number: { type: "number", defaultValue: 3.14159 },
                decimals: { type: "number", defaultValue: 2 }
              }
            ),
            "---",

            makeblock("command", "RunJS", "JS| Run JS code [code]", {
              code: { type: "string", defaultValue: "alert('Hello World!')" },
            }),
            "---",
            makeblock("reporter", "getReturnValOfJS", "JS| Get return value of [code]", {
              code: { type: "string", defaultValue: "6473 / 84" },
            }),
            makeblock("command", "OpenSite", "JS| Open site [url]", {
              url: { type: "string", defaultValue: "https://example.com" },
            }),
            makeblock("command", "SaveFile", "JS| Save file [name] with contents [contents]", {
              name: { type: "string", defaultValue: "example.txt" },
              contents: { type: "string", defaultValue: "Hello World!" },
            }),
            makeblock("command", "setVar", "JS| Set variable [name] to [val]", {
              name: { type: "string", defaultValue: "window.example" },
              val: { type: "string", defaultValue: "Hello World!" },
            }),
            "---",
            "---",
            makeblock("hat", "whenCondition", "when [condit] is true", {
              condit: {
                type: "Boolean",
                defaultValue: "Put any boolean block here",
              },
            }),
            makeblock("reporter", "stringReport", "[arg1]", {
              arg1: { type: "string", defaultValue: "Hello" },
            }),
            makeblock("reporter", "ifBoolStringElseString", "if [arg1] then [arg2] else [arg3]", {
              arg1: { type: "Boolean"},
              arg2: { type: "string", defaultValue: "Hello" },
              arg3: { type: "string", defaultValue: "World" },
            }),
            makeblock("reporter", "outOfBoundsMouseX", "Mouse X (works out of bounds)", {}),
            makeblock("reporter", "outOfBoundsMouseY", "Mouse Y (works out of bounds)", {}),
            makeblock("Boolean", "outOfBoundsMouseDown", "Mouse down? (works out of bounds)", {})
          ],
          menus: { 
            varMenu: "getVarMenu",
            dateFormatMenu: [
              { text: "date and time", value: "datetime" },
              { text: "date only", value: "date" },
              { text: "time only", value: "time" },
              { text: "timestamp", value: "timestamp" }
            ],
            caseTypeMenu: [
              { text: "UPPERCASE", value: "uppercase" },
              { text: "lowercase", value: "lowercase" }
            ]
          },
        };
      }
      getVarMenu(target_id) {
        const vars = this.runtime
          .getTargetById(target_id)
          .getAllVariableNamesInScopeByType("list");
        return vars.length == 0 ? [" "] : vars;
      }
      Vec({ a, b, c }) {
        return to_s([[a, b, c]]);
      }
      Out({ a, b }, util) {
        let variable = util.target.lookupOrCreateList(undefined, b);
        if (variable) variable.value = a.split(" ");
      }
      Get = mat_reporter_f(get);
      Set = mat_reporter_f(set);
      Arr = mat_reporter_f((a, b) => [...a, ...b]);
      Rot = mat_reporter_f(rotate);
      Add = mat_reporter_f(add2D);
      Sub = mat_reporter_f(sub2D);
      Mul = mat_reporter_f(mul2D);
      Div = mat_reporter_f(div2D);
      Dot = mat_reporter_f(dot);
      Cross = mat_reporter_f(cross);
      Len = mat_reporter_f(length);
      Norm = mat_reporter_f(normalize);
      Size = mat_reporter_f((m) => [[m.length]]);
      Sqrt = mat_reporter_f((a) =>
        component_wise2D((a, b) => Math.sqrt(a))(a, [[1]])
      );
    }
    (function () {
      var extensionInstance = new ScratchJS(vm.extensionManager.runtime);
      var serviceName =
        vm.extensionManager._registerInternalExtension(extensionInstance);
      vm.extensionManager._loadedExtensions.set(
        extensionInstance.getInfo().id,
        serviceName
      );
    })();
  });
})();
} catch (e) {
  console.error(e);
}