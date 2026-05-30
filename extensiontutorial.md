# How to make an Extension for Scratch

> [!NOTE]
> This tutorial requires an advanced understanding of [JavaScript](https://en.wikipedia.org/wiki/JavaScript).  
> If you are interested in learning how ScratchJS works go to [this page](https://github.com/Ironbill25/projects/blob/main/scratchjs/docs/howitworks.md).

First, fork this repository. Name it whatever you want.  
Feel free to remove scratchjs.js. However, we will be looking at extensiontempl.js.  
First, change the YourExtensionName variable to your extension's name.  
Now we will add some blocks.  
We have added an example block to the extension, it looks something like this:  

```javascript
// ... In your blocks array:
Block(BlockType.REPORTER, "exampleBlock", "Example block [text] [number] [color]", {
  text: Argument(ArgumentType.STRING, "Hello"),
  number: Argument(ArgumentType.NUMBER, 42),
  color: Argument(ArgumentType.COLOR, "#FF0000"),
}, ({text, number, color}) => {
return text + ", " + number.toString() + " colored " + color
}),
// ...
```

Notice the functions `Block` and `Argument`. We will be using these to define our blocks.  
The `Block` function takes 5 arguments: the block type, the block opcode (like an ID), the block label, the block arguments, and the function.  
The `Argument` function takes 2 arguments: the argument type and the default value.  
  
Now let's look at the arguments. The block label uses square brackets to denote arguments.  
For example, the block label "Example block [text] [number] [color]" has 3 arguments: `text`, `number`, and `color`.  
These arguments *must* have the same names as in the block function.  
  
Lastly, we'll look at the block's function. The function's name should match the block's opcode.  
The arguments of the function should also match the arguments of the block. Make sure to enclose them in curly braces.  
Inside the function, you can use the arguments as normal variables. If the block is a reporter/boolean, you must return a value.  
Please note that returning a value in a non-reporter block will cause some strange behavior.  
  
To recap that last section, a typical block looks like this:

```javascript
// ... In the blocks array (should be marked with equals signs)
Block(BlockType.REPORTER /* Change this to either COMMAND, BOOLEAN, or REPORTER */, "yourBlockOpcode", "Your block [arg1] label [arg2]", {
    arg1: Argument(ArgumentType.STRING /* Also change these to the appropriate types */, "default value" /* Default value */),
    arg2: Argument(ArgumentType.NUMBER /* Also change these to the appropriate types */, 0 /* Default value */),
},  ({ arg1, arg2 }) => {
    // do something with arg1 and arg2
    return result;
})

// ...
```

## Formatting Blocks

Some guidelines for blocks:

1. Use proper capitalization and spacing in block labels, we want them to look nice
2. Use descriptive names for block opcodes, but not too long, so just keep it unique
3. Use appropriate block types (e.g. COMMAND, BOOLEAN, REPORTER)
4. Use the right argument types and default values.

Here are all the block types:

- COMMAND: A block that doesn't return a value, can be stacked
- REPORTER: A block that returns a value, can be put into round inputs
- BOOLEAN: A block that returns a boolean value, can be put into boolean or round inputs
- HAT: A block that doesn't return a value to the user, can have blocks stacked below it and is triggered by events.  
The return value is a boolean and determines whether the blocks below it should run.
- BUTTON: A button on the palette, can be used to trigger special actions like making variables
- CONDITIONAL: (Sorry this is a placeholder, we don't know what this is for yet)
- LOOP: A block is shaped like a C, can be stacked and have blocks inside it. We don't currently know how to define these.
- EVENT: (Sorry this is a placeholder, we don't know what this is for yet)

These are the argument types:

- STRING: A string argument. You can put any reporter block inside.
- NUMBER: A number argument. You can put any reporter block inside.
- BOOLEAN: A boolean argument, only BOOLEAN blocks can be put in this input.
- COLOR: A color argument, REPORTER and BOOLEAN blocks can be put in this input, however BOOLEAN blocks probably shouldn't be put in this input.
- MATRIX: A matrix argument. You can put any reporter block inside.
- ANGLE: An angle argument. You can put any reporter block inside.
- NOTE: A note argument. You can put any reporter block inside.
- IMAGE: An image displayed on the block. This does not function as an argument.

Both ReporterScope and TargetType are quite advanced, and we don't know much about them yet.  
  
Lastly, let's make a bookmarklet for the extension. This will load your extension. It should look something like this:

```javascript
javascript: (async () => {
  try {
    const r = await fetch(
      "https://raw.githubusercontent.com/Ironbill25/JavaScript-For-Scratch/refs/heads/main/scratchjs.js", /* Replace this with the URL of your extension code */
      { cache: "no-cache" }
    );
    if (!r.ok) throw new Error("Fetch failed: " + r.status);
    const scriptText = await r.text();
    const s = document.createElement("script");
    s.textContent = scriptText;
    document.body.appendChild(s);
    console.log("Loaded");
  } catch (e) {
    console.error("Failed to load script:", e);
  }
})();
```

You should change the URL in the fetch to the URL of your raw extension file.  
You can find this by going to your repository on GitHub, going to the file, and then clicking on the "Raw" button.
