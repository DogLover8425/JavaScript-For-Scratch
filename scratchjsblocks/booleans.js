window.sjs_booleans = [
  Block(BlockType.BUTTON, "booleansCategory", "Booleans"),
  Block(BlockType.BOOLEAN, "boolOperation", "[val1] [op] [val2]", {
    val1: Argument("string", "true"),
    op: ArgumentWithMenu("string", "and", "boolOpMenu"),
    val2: Argument("string", "false"),
  }, ({val1, val2, op}) => {
            
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
              if (val2 === 0) return "Error: Division by zero";
              return val1 / val2;
            case "modulo":
              if (val2 === 0) return "Error: Division by zero";
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
    value2: Argument("number", 5),
  }, ({value1, value2}) => value1 >= value2),
  Block(BlockType.BOOLEAN, "lessOrEqualsBlock", "[value1] <= [value2]", {
    value1: Argument("number", 5),
    value2: Argument("number", 5),
  }, ({value1, value2}) => value1 <= value2),
  Block(BlockType.BOOLEAN, "inequalityBlock", "[value1] ≠ [value2]", {
    value1: Argument("number", 5),
    value2: Argument("number", 5),
  }, ({value1, value2}) => value1 != value2),
];
