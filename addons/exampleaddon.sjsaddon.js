// Example addon for ScratchJS
[ // This is a bit different from a core ScratchJS block category, instead of defining a category array in the window scope we just return the array
    CategoryHeader("Example Category"), // This is a category header.
    Block(BlockType.COMMAND, "exampleBlock", "Example block", {}, () => {
        alert("This is an example block from an addon.");
    }), // Command block (stack block)
    Block(BlockType.REPORTER, "exampleReporter", "Example reporter", {}, () => {
        return "This is an example reporter from an addon.";
    }), // Reporter block (returns a value)
    Block(BlockType.BOOLEAN, "exampleBoolean", "Example boolean", {}, () => {
        return true;
    }), // Boolean block (returns a boolean value, technically can return anything though)
    Block(BlockType.HAT, "exampleHat", "Example hat", {}, () => {
        return true;
    }) // Hat block (runs when the function returns true)
]