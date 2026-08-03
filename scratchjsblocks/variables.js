window.sjs_variables = [
    Block(BlockType.BUTTON, "variablesCategory", "variables"),
    Block(BlockType.COMMAND, "sjscreateVariable", "create [type] variable [name]", {
        type: ArgumentWithMenu("string", "global", "variableTypeMenu"),
        name: Argument("string", "myVariable"),
    }, ({type, name}, util) => {
        window.variableManager.createVariable(util, type, name, '');
        vm.runtime.requestBlocksUpdate(); // only needed for when we make new variables
    }),
    Block(BlockType.COMMAND, "sjscreateVariableWithValue", "create [type] variable [name] with value [value]", {
        type: ArgumentWithMenu("string", "global", "variableTypeMenu"),
        name: Argument("string", "myVariable"),
        value: Argument("string", "0"),
    }, ({type, name, value}, util) => {
        window.variableManager.createVariable(util, type, name, value);
        vm.runtime.requestBlocksUpdate();
    }),
    Block(BlockType.REPORTER, "sjsgetVariable", "variable [name]", {
        name: Argument("string", "myVariable"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        return variable.value;
    }),
    Block(BlockType.COMMAND, "sjssetVariable", "set variable [name] to [value]", {
        name: Argument("string", "myVariable"),
        value: Argument("string", "0"),
    }, ({name, value}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        variable.value = value;
    }),
    Block(BlockType.COMMAND, "sjschangeVariable", "change variable [name] by [value]", {
        name: Argument("string", "myVariable"),
        value: Argument("string", "1"),
    }, ({name, value}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        variable.value = parseFloat(variable.value) + parseFloat(value);
    }),
    Block(BlockType.BOOLEAN, "sjsvariableExists", "variable [name] exists?", {
        name: Argument("string", "myVariable"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        return variable !== undefined;
    }),
    Block(BlockType.COMMAND, "sjsdeleteVariable", "delete variable [name]", {
        name: Argument("string", "myVariable"),
    }, ({name}, util) => {
        const variable = window.variableManager.getVariable(util, name);
        if (variable) {
            window.variableManager.deleteVariable(util, variable);
        }
    })
]
