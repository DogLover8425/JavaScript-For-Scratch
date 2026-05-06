# JavaScript For Scratch

This extension allows you to use various JavaScript features in Scratch!

## Installation

To use ScratchJS, create a bookmarklet with the following code.  
(For non-technical users: Make a bookmark and set the URL to this code.)

```javascript
javascript:(async()=>{try{const r=await fetch("https://raw.githubusercontent.com/Ironbill25/JavaScript-For-Scratch/refs/heads/main/scratchjs.js",{cache:"no-cache" });if (!r.ok)throw new Error("Fetch fail "+r.status);    let c=await r.text();let s=document.createElement("script");s.textContent=c;document.body.appendChild(s);console.log("Loaded");}catch(e){console.error("Fail",e)}})();
```

Go to the Scratch editor and click the bookmarklet to load the extension.

## Safety Notice

When ScratchJS loads, you will see a warning modal indicating that this extension has access to advanced features. Only use projects with ScratchJS from creators you trust, as projects can potentially perform dangerous operations.

## Block Categories

### Math & Numbers

#### `[base] ^ [exponent]`
**Type:** Reporter  
**Returns:** Base raised to the power of exponent

**Parameters:**
- `base` (number, default: 2) - Base number
- `exponent` (number, default: 3) - Exponent

**Example:** `2 ^ 3` returns 8

#### `Clamp [value] between [min] and [max]`
**Type:** Reporter  
**Returns:** Value constrained within min and max range

**Parameters:**
- `value` (number, default: 15) - Value to clamp
- `min` (number, default: 0) - Minimum value
- `max` (number, default: 10) - Maximum value

**Example:** `Clamp 15 between 0 and 10` returns 10

#### `Round [number] to [decimals] decimal places`
**Type:** Reporter  
**Returns:** Number rounded to specified decimal places

**Parameters:**
- `number` (number, default: 3.14159) - Number to round
- `decimals` (number, default: 2) - Number of decimal places

**Example:** `Round 3.14159 to 2 decimal places` returns 3.14

#### `[part]% of [whole]`
**Type:** Reporter  
**Returns:** Percentage calculation

**Parameters:**
- `part` (number, default: 25) - Percentage value
- `whole` (number, default: 100) - Whole value

**Example:** `25% of 100` returns 25

#### `[value]++`
**Type:** Reporter  
**Returns:** Value incremented by 1

**Parameters:**
- `value` (number, default: 5) - Value to increment

**Example:** `5++` returns 6

#### `[value]--`
**Type:** Reporter  
**Returns:** Value decremented by 1

**Parameters:**
- `value` (number, default: 5) - Value to decrement

**Example:** `5--` returns 4

#### `[value1] >= [value2]`
**Type:** Boolean  
**Returns:** True if value1 is greater than or equal to value2

**Parameters:**
- `value1` (number, default: 5) - First value
- `value2` (number, default: 5) - Second value

#### `[value1] <= [value2]`
**Type:** Boolean  
**Returns:** True if value1 is less than or equal to value2

**Parameters:**
- `value1` (number, default: 5) - First value
- `value2` (number, default: 5) - Second value

#### `[value1] ≠ [value2]`
**Type:** Boolean  
**Returns:** True if values are not equal

**Parameters:**
- `value1` (number, default: 5) - First value
- `value2` (number, default: 5) - Second value

### Boolean & Constants

#### `True`
**Type:** Boolean  
**Returns:** Always returns true

#### `False`
**Type:** Boolean  
**Returns:** Always returns false

### String & Text Manipulation

#### `Replace all [string] in [text] with [replace]`
**Type:** Reporter  
**Returns:** Text with all occurrences of string replaced

**Parameters:**
- `text` (string, default: "Hello World") - Original text
- `string` (string, default: "World") - String to replace
- `replace` (string, default: "Scratch") - Replacement string

**Example:** `Replace all "World" in "Hello World" with "Scratch"` returns "Hello Scratch"

#### `Get substring of [text] from [start] to [end]`
**Type:** Reporter  
**Returns:** Portion of text between specified positions (1-based indexing)

**Parameters:**
- `text` (string, default: "Hello World") - Original text
- `start` (number, default: 1) - Start position (1-based)
- `end` (number, default: 6) - End position (1-based)

**Example:** `Get substring of "Hello World" from 1 to 6` returns "Hello"

#### `Reverse string [text]`
**Type:** Reporter  
**Returns:** Text reversed character by character

**Parameters:**
- `text` (string, default: "Hello World") - Text to reverse

**Example:** `Reverse string "Hello"` returns "olleH"

#### `Convert [text] to case [caseType]`
**Type:** Reporter  
**Returns:** Text converted to specified case

**Parameters:**
- `text` (string, default: "Hello World") - Text to convert
- `caseType` (menu) - Case conversion type:
  - `UPPERCASE` - Convert to all uppercase
  - `lowercase` - Convert to all lowercase

**Example:** `Convert "hello world" to case UPPERCASE` returns "HELLO WORLD"

#### `Newline`
**Type:** Reporter  
**Returns:** Newline character (\n)

#### `Tab`
**Type:** Reporter  
**Returns:** Tab character (\t)

### Date & Time

#### `current [format]`
**Type:** Reporter  
**Returns:** Current date/time in specified format

**Options:**
- `date and time` - Full date and time string
- `date only` - Current date (locale format)
- `time only` - Current time (locale format)
- `timestamp` - Unix timestamp in milliseconds

**Example:** `current date and time` returns "3/17/2026, 8:06:00 PM"

#### `Current project ID`
**Type:** Reporter  
**Returns:** The current Scratch project ID from the URL

**Example:** If URL is `https://scratch.mit.edu/projects/123456/`, returns "123456"

### System Information

#### `Get info on the [what]`
**Type:** Reporter  
**Returns:** Various system and browser information

**Options:**
- `operating system` - OS platform (e.g., "Win32")
- `browser` - Browser user agent string
- `language` - Browser language (e.g., "en-US")
- `time zone` - User's timezone (e.g., "America/New_York")
- `screen width` - Screen width in pixels
- `screen height` - Screen height in pixels
- `window width` - Browser window width in pixels
- `window height` - Browser window height in pixels
- `device pixel ratio` - Device pixel ratio

**Example:** `Get info on the operating system` returns "Win32"

### JavaScript Execution

#### `JS| Run JS code [code]`
**Type:** Command  
**Action:** Executes the given JavaScript code

**Parameters:**
- `code` (string, default: "alert('Hello World!')") - JavaScript code to execute

**Warning:** This block can execute any JavaScript code and should be used with caution.

#### `JS| Get return value of [code]`
**Type:** Reporter  
**Returns:** The return value of the executed JavaScript code

**Parameters:**
- `code` (string, default: "6473 / 84") - JavaScript code to execute and return value from

**Example:** `JS| Get return value of "Math.random()"` returns a random number between 0 and 1

#### `JS| Set variable [name] to [val]`
**Type:** Command  
**Action:** Creates or updates a JavaScript variable

**Parameters:**
- `name` (string, default: "window.example") - Variable name
- `val` (string, default: "Hello World!") - Value to assign

**Example:** `JS| Set variable "window.myVar" to "test"` creates a global variable

### File & Web Operations

#### `JS| Open site [url]`
**Type:** Command  
**Action:** Opens the specified URL in a new browser tab

**Parameters:**
- `url` (string, default: "https://example.com") - URL to open

**Example:** `JS| Open site "https://scratch.mit.edu"` opens Scratch in a new tab

#### `JS| Open this project in Turbowarp`
**Type:** Command  
**Action:** Opens the current project in Turbowarp

#### `JS| Reload page`
**Type:** Command  
**Action:** Reloads the current page

#### `JS| Save file [name] with contents [contents]`
**Type:** Command  
**Action:** Downloads a text file with the specified name and contents

**Parameters:**
- `name` (string, default: "example.txt") - Filename
- `contents` (string, default: "Hello World!") - File contents

**Example:** `JS| Save file "data.txt" with contents "Hello from Scratch!"` downloads a text file

### Control Flow & Loops

#### `when [condit] is true`
**Type:** Hat  
**Triggers:** When the condition becomes true

**Parameters:**
- `condit` (boolean) - Condition to monitor

**Example:** `when "mouse down?" is true` triggers when mouse is pressed

#### `For i in [value]`
**Type:** Conditional  
**Action:** Loop control block that increments i and checks if i <= value

**Parameters:**
- `value` (string, default: "10") - Maximum value for loop

**Use:** Works with the i reporter and set i blocks for custom loops

#### `i`
**Type:** Reporter  
**Returns:** Current value of loop counter i

#### `Set i to [value]`
**Type:** Command  
**Action:** Sets the loop counter i to specified value

**Parameters:**
- `value` (number, default: 0) - Value to set i to

### Mouse & Input

#### `Mouse X (works out of bounds)`
**Type:** Reporter  
**Returns:** Mouse X coordinate (works even when mouse is outside stage)

#### `Mouse Y (works out of bounds)`
**Type:** Reporter  
**Returns:** Mouse Y coordinate (works even when mouse is outside stage)

#### `Mouse down? (works out of bounds)`
**Type:** Boolean  
**Returns:** True if mouse button is pressed (works even when mouse is outside stage)

### Boolean & Type Conversion

#### `[bool]`
**Type:** Boolean  
**Returns:** Boolean value converted from text

**Parameters:**
- `bool` (string, default: "true") - Text to convert to boolean

**Accepts:** "true", "1", "True", or any non-empty string (except "0", "false", "False") returns true

#### `[bool]`
**Type:** Reporter  
**Returns:** Text representation of boolean value

**Parameters:**
- `bool` (boolean) - Boolean to convert to text

**Example:** Converts true to "true" and false to "false"

### Utility Blocks

#### `[arg1]`
**Type:** Reporter  
**Returns:** The input argument unchanged

**Parameters:**
- `arg1` (string, default: "Hello") - Input value

**Use:** Useful for type conversion or passing values through blocks

#### `if [arg1] then [arg2] else [arg3]`
**Type:** Reporter  
**Returns:** arg2 if arg1 is true, otherwise arg3

**Parameters:**
- `arg1` (boolean) - Condition
- `arg2` (string, default: "Hello") - Value if true
- `arg3` (string, default: "World") - Value if false

**Example:** `if "mouse down?" then "Pressed" else "Released"` returns "Pressed" when mouse is down

### Array Operations

#### `Blank array`
**Type:** Reporter  
**Returns:** Empty array as JSON string "[]"

#### `Append [value] to array [array]`
**Type:** Reporter  
**Returns:** Array with value appended to end

**Parameters:**
- `value` (string, default: "Hello") - Value to append
- `array` (string, default: "[]") - Array as JSON string

**Example:** `Append "World" to array "[\"Hello\"]"` returns "[\"Hello\",\"World\"]"

#### `Get [index] from array [array]`
**Type:** Reporter  
**Returns:** Item at specified index (1-based)

**Parameters:**
- `index` (number, default: 1) - Index (1-based)
- `array` (string, default: "[]") - Array as JSON string

**Example:** `Get 2 from array "[\"Apple\",\"Banana\"]"` returns "Banana"

#### `Insert [value] at [index] in array [array]`
**Type:** Reporter  
**Returns:** Array with value inserted at specified position

**Parameters:**
- `value` (string, default: "Hello") - Value to insert
- `index` (number, default: 1) - Index position (1-based)
- `array` (string, default: "[\"Apple\"]") - Array as JSON string

#### `Replace [index] in array [array] with [value]`
**Type:** Reporter  
**Returns:** Array with item at index replaced

**Parameters:**
- `index` (number, default: 1) - Index to replace (1-based)
- `array` (string, default: "[\"Apple\"]") - Array as JSON string
- `value` (string, default: "Banana") - New value

#### `Remove [index] from array [array]`
**Type:** Reporter  
**Returns:** Array with item at specified index removed

**Parameters:**
- `index` (number, default: 1) - Index to remove (1-based)
- `array` (string, default: "[\"Apple\"]") - Array as JSON string

#### `Merge [array1] and [array2]`
**Type:** Reporter  
**Returns:** Two arrays combined into one

**Parameters:**
- `array1` (string, default: "[\"Hello\"]") - First array
- `array2` (string, default: "[\"World\"]") - Second array

#### `Length of array [array]`
**Type:** Reporter  
**Returns:** Number of items in array

**Parameters:**
- `array` (string, default: "[\"Apple\", \"Banana\"]") - Array as JSON string

#### `Array [array] contains [value]`
**Type:** Boolean  
**Returns:** True if array contains the specified value

**Parameters:**
- `array` (string, default: "[\"Apple\", \"Banana\"]") - Array as JSON string
- `value` (string, default: "Carrot") - Value to search for

#### `Index of [value] in array [array]`
**Type:** Reporter  
**Returns:** Index of first occurrence of value (1-based, returns 0 if not found)

**Parameters:**
- `value` (string, default: "Hello") - Value to find
- `array` (string, default: "[\"Apple\"]") - Array as JSON string

#### `Split [string] by [delimiter] into array`
**Type:** Reporter  
**Returns:** String split into array by delimiter

**Parameters:**
- `string` (string, default: "Hello, World") - String to split
- `delimiter` (string, default: ",") - Delimiter character

**Example:** `Split "Hello, World" by "," into array` returns "[\"Hello\",\" World\"]"

#### `Join array [array] with [delimiter]`
**Type:** Reporter  
**Returns:** Array elements joined into string with delimiter

**Parameters:**
- `array` (string, default: "[\"Hello\", \"World\"]") - Array as JSON string
- `delimiter` (string, default: ",") - Delimiter character

**Example:** `Join array "[\"Hello\",\"World\"]" with ","` returns "Hello,World"

### Object Operations

#### `Blank object`
**Type:** Reporter  
**Returns:** Empty object as JSON string "{}"

#### `Set [key] in object [object] to [value]`
**Type:** Reporter  
**Returns:** Object with key set to value

**Parameters:**
- `key` (string, default: "name") - Property key
- `object` (string, default: "{}") - Object as JSON string
- `value` (string, default: "John") - Value to set

**Example:** `Set "name" in object "{}" to "John"` returns "{\"name\":\"John\"}"

#### `Get [key] from object [object]`
**Type:** Reporter  
**Returns:** Value of specified key from object

**Parameters:**
- `key` (string, default: "name") - Property key
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

**Example:** `Get "name" from object "{\"name\": \"John\"}"` returns "John"

#### `Delete [key] from object [object]`
**Type:** Reporter  
**Returns:** Object with specified key removed

**Parameters:**
- `key` (string, default: "name") - Property key to delete
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

#### `Object [object] has key [key]`
**Type:** Boolean  
**Returns:** True if object contains the specified key

**Parameters:**
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string
- `key` (string, default: "name") - Key to check

#### `Keys of object [object] (array)`
**Type:** Reporter  
**Returns:** Array of object's keys as JSON string

**Parameters:**
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

**Example:** `Keys of object "{\"name\": \"John\"}" (array)` returns "[\"name\"]"

#### `Values of object [object] (array)`
**Type:** Reporter  
**Returns:** Array of object's values as JSON string

**Parameters:**
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

**Example:** `Values of object "{\"name\": \"John\"}" (array)` returns "[\"John\"]"

#### `Entries of object [object] (array)`
**Type:** Reporter  
**Returns:** Array of [key, value] pairs as JSON string

**Parameters:**
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

**Example:** `Entries of object "{\"name\": \"John\"}" (array)` returns "[[\"name\",\"John\"]]"

#### `Size of object [object]`
**Type:** Reporter  
**Returns:** Number of keys in object

**Parameters:**
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

#### `Get path (array) [path] from object [object]`
**Type:** Reporter  
**Returns:** Value at nested path in object

**Parameters:**
- `path` (string, default: "[\"name\"]") - Path as JSON array
- `object` (string, default: "{\"name\": \"John\"}") - Object as JSON string

**Example:** `Get path "[\"name\"]" from object "{\"name\": \"John\"}"` returns "John"

#### `Set path (array) [path] in object [object] to [value]`
**Type:** Reporter  
**Returns:** Object with nested path set to value

**Parameters:**
- `path` (string, default: "[\"name\"]") - Path as JSON array
- `object` (string, default: "{}") - Object as JSON string
- `value` (string, default: "John") - Value to set

**Example:** `Set path "[\"name\"]" in object "{}" to "John"` returns "{\"name\":\"John\"}"

## Technical Details

### Block Types Used
- **REPORTER**: Returns a value, can be used in round inputs
- **COMMAND**: Performs an action, can be stacked
- **HAT**: Event-triggered block, runs code below when condition is met
- **BOOLEAN**: Returns true/false, can be used in boolean inputs

### Argument Types Used
- **string**: Accepts any text or reporter block
- **number**: Accepts numbers or reporter blocks
- **Boolean**: Accepts only boolean blocks
- **menu**: Dropdown menu with predefined options

### Security Considerations
ScratchJS provides powerful JavaScript execution capabilities. Users should:
- Only use projects from trusted creators
- Be cautious with blocks that execute arbitrary JavaScript
- Understand that file operations and web access are available

## Development

ScratchJS is built using the Scratch extension system. The extension:
1. Waits for the Scratch VM to be available
2. Creates a new ScratchJS extension instance
3. Registers all blocks with the Scratch runtime
4. Provides JavaScript execution environment

For more information on creating Scratch extensions, see `extensiontutorial.md`.

