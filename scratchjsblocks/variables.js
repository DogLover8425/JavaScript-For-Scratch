window.sjs_variables = [
    Block(BlockType.BUTTON, "variablesCategory", "Variables"),
    Block(BlockType.COMMAND, "sjscreateVariable", "Create [type] Variable [name]", {
        type: ArgumentWithMenu("string", "global", "variableTypeMenu"),
        name: Argument("string", "myVariable"),
    }, ({type, name}, util) => {
        window.variableManager.createVariable(util, type, name, '');
        vm.runtime.requestBlocksUpdate(); // only needed for when we make new variables
    }),
    Block(BlockType.COMMAND, "sjscreateVariableWithValue", "Create [type] Variable [name] with value [value]", {
        type: ArgumentWithMenu("string", "global", "variableTypeMenu"),
        name: Argument("string", "myVariable"),
        value: Argument("string", "0"),
    }, ({type, name, value}, util) => {
        window.variableManager.createVariable(util, type, name, value);
        vm.runtime.requestBlocksUpdate();
    }),
    Block(BlockType.REPORTER, "sjsgetVariable", "Variable [name]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        return variable.value;
    }),
    Block(BlockType.COMMAND, "sjssetVariable", "Set Variable [name] to [value]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
        value: Argument("string", "0"),
    }, ({name, value}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        variable.value = value;
    }),
    Block(BlockType.COMMAND, "sjschangeVariable", "Change Variable [name] by [value]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
        value: Argument("string", "1"),
    }, ({name, value}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        variable.value = parseFloat(variable.value) + parseFloat(value);
    }),
    Block(BlockType.BOOLEAN, "sjsvariableExists", "Variable [name] exists?", {
        name: Argument("string", "myVariable"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        return variable !== undefined;
    }),
    Block(BlockType.COMMAND, "sjsdeleteVariable", "Delete Variable [name]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        if (variable) {
            window.variableManager.deleteVariable(util, variable);
        }
    })
]