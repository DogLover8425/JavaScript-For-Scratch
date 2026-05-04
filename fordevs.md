# Developer Notes

## How to add a new block

1. Create a block using the Block() function
2. Add it to the appropriate category array in scratchjsblocks.js
3. Do `npm run build` in the terminal and commit the changes
4. Test it in the Scratch editor

## Block Types

Make sure to prefix these with "BlockType."

- COMMAND: A regular stack block.
- REPORTER: A round block that returns a value.
  Cannot be used in boolean inputs.
- BOOLEAN: A boolean block that returns true or false, but isn't limited to just booleans.
  Standard practice is to only return true or false.
  Can be used in either boolean or reporter inputs.
- HAT: A hat block that triggers when certain conditions are met.
  Return a boolean value to indicate whether the hat should trigger.
- CONDITIONAL: A conditional block that can have one or more branches.
  When making these blocks, make sure to include the util parameter in the function arguments.
  Use util.startBranch(branchNumber, isLoop) to start a branch.
- LOOP: The exact same as a CONDITIONAL block, but it has an inline arrow icon at the end.
- BUTTON: Places a button in the block palette. This block type currently does not work and corrupts the palette.
  We have defaulted it to REPORTER for now.
- EVENT: A block that triggers when an event occurs.
  We have no idea how to use it yet.
  You should probably just use a HAT block instead.
