window.sjs_unicode = [
    Block(BlockType.REPORTER, "textToUni", "Text [text] to Unicode", {
        text: Argument("string", "Hello")
    }, ({ text }) => {
        return text.split("").map(c => "\\" + c.charCodeAt(0).toString(16)).join("");
    }),
    Block(BlockType.REPORTER, "uniToText", "Unicode [uni] to Text", {
        uni: Argument("string", "\\48\\65\\6c\\6c\\6f")
    }, ({ uni }) => {
        return uni.split("\\").map(c => String.fromCharCode(parseInt(c, 16))).join("");
    })
]