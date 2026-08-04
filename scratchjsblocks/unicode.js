window.sjs_unicode = [
    Block(BlockType.BUTTON, "unicodeCategory", "Unicode"),
    Block(BlockType.REPORTER, "textToHexUnicode", "text [text] to Hex Unicode", {
        text: Argument("string", "Hello")
    }, ({ text }) => {
        return text.split("").map(c => "U+" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")).join(" ");
    }),
    
    Block(BlockType.REPORTER, "hexUnicodeToText", "hex Unicode [hex] to Text", {
        hex: Argument("string", "U+0048 U+0065 U+006C U+006C U+006F")
    }, ({ hex }) => {
        return hex.split(" ").map(c => String.fromCharCode(parseInt(c.replace("U+", ""), 16))).join("");
    }),
    
    Block(BlockType.REPORTER, "textToUnicode", "text [text] to Unicode", {
        text: Argument("string", "Hello")
    }, ({ text }) => {
        return text.split("").map(c => c.charCodeAt(0)).join(" ");
    }),
    
    Block(BlockType.REPORTER, "unicodeToText", "unicode [uni] to Text", {
        uni: Argument("string", "72 101 108 108 111")
    }, ({ uni }) => {
        return uni.split(" ").map(c => String.fromCharCode(parseInt(c))).join("");
    })
]
