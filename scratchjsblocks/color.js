window.sjs_color = [
  Block(BlockType.BUTTON, "colorCategory", "Color"),
  Block(BlockType.REPORTER, "randomColor", "random color", {}, () => {
    return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
  }),
  Block(BlockType.REPORTER, "hexToRgb", "HEX [hex] to RGB", {
    hex: Argument("string", "#FF6600"),
  }, ({ hex }) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
  }),
  Block(BlockType.REPORTER, "rgbToHex", "RGB [r][g][b] to HEX", {
    r: Argument("number", 255),
    g: Argument("number", 102),
    b: Argument("number", 0),
  }, ({ r, g, b }) => {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }),
  Block(BlockType.REPORTER, "colorBlend", "blend color [color1] and [color2]", {
    color1: Argument("string", "#FF6600"),
    color2: Argument("string", "#0066FF"),
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
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
  }),
];
