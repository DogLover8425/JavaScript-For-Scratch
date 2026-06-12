window.sjs_variables = [
    Block(BlockType.BUTTON, "variablesCategory", "Variables"),
    Block(BlockType.COMMAND, "createVariable", "Create [type] Variable [name]", {
        type: ArgumentWithMenu("string", "global", "variableTypeMenu"),
        name: Argument("string", "myVariable"),
    }, ({type, name}, util) => {
        window.createVariable(util, type, name, '');
        vm.runtime.requestBlocksUpdate(); // only needed for when we make new variables
    }),
    Block(BlockType.COMMAND, "createVariableWithValue", "Create [type] Variable [name] with value [value]", {
        type: ArgumentWithMenu("string", "global", "variableTypeMenu"),
        name: Argument("string", "myVariable"),
        value: Argument("string", "0"),
    }, ({type, name, value}, util) => {
        window.createVariable(util, type, name, value);
        vm.runtime.requestBlocksUpdate();
    }),
    Block(BlockType.REPORTER, "getVariable", "Variable [name]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        return variable.value;
    }),
    Block(BlockType.COMMAND, "setVariable", "Set Variable [name] to [value]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
        value: Argument("string", "0"),
    }, ({name, value}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        variable.value = value;
    }),
    Block(BlockType.COMMAND, "changeVariable", "Change Variable [name] by [value]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
        value: Argument("string", "1"),
    }, ({name, value}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        variable.value = parseFloat(variable.value) + parseFloat(value);
    }),
    Block(BlockType.BOOLEAN, "variableExists", "Variable [name] exists?", {
        name: Argument("string", "myVariable"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        return variable !== undefined;
    }),
    Block(BlockType.COMMAND, "deleteVariable", "Delete Variable [name]", {
        name: ArgumentWithMenu("string", "myVariable", "variableMenu"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        if (variable) {
            window.variableManager.deleteVariable(util, variable);
        }
    })
]