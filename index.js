module.exports = function SkillPredictEnabler(mod) {
	let command = mod.command;
    let mod_name = "skill-prediction"; // Other names ?
    let curClassId = 0;
    mod.hook('S_LOGIN', 14, (event) => {
        // 0 = Warrior, 1 = Lancer, 2 = Slayer, 3 = Berserker, 4 = Sorcerer, 5 = Archer,
        // 6 = Priest, 7 = Mystic, 8 = Reaper, 9 = Gunner, 10 = Brawler, 11 = Ninja,
        // 12 = Valkyrie
        let classId = parseInt(GetClassId(event.templateId)) - 1;
        curClassId = classId;
        if (mod.settings.disableFor[classId.toString()] == true){
            UnloadSP();
        }
        else{
            LoadSP();
        }
	});
    function GetClassId (str) { return str.toString().substr(3, 5); }
    
    function LoadSP () {
        try {
            const result = mod.manager.load(mod_name);
            if (result)
                command.message(`Loaded "${mod_name}"!`);
            else
                command.message(`Unable to load "${mod_name}", check log for details!`);
                
            let modRef = mod.manager.get(mod_name);
            if (modRef) { 
                modRef.loadNetworkInstance(mod.dispatch);
                command.message(`Loaded network instance for mod "${mod_name}" in current connection!`);
            }
            else {
                command.message(`Unable to load network instance for mod "${mod_name}"!`);
            }
        } catch (error) {
            command.message("Error see log for more information !");
            console.log(error);
        }
    }
    function UnloadSP () {
        try {
            const result = mod.manager.unload(mod_name);
            if (result)
                command.message(`Unloaded "${mod_name}"!`);
            else
                command.message(`Unable to unload "${mod_name}", check log for details!`);
        } catch (error) {
            console.log(error);
        }
    }

    mod.command.add(['spe'], (y) => {
        switch (y) {
            case "load":
                LoadSP();
                break;
            case "unload":
                UnloadSP();
                break;
            case "setting":
                mod.settings.disableFor[curClassId.toString()] == !mod.settings.disableFor[curClassId.toString()];
                command.message('Changed setting for the current class to "Disabled" : ' + mod.settings.disableFor[curClassId.toString()].toString());
                break;
            case "debug":
                Debug();
                break;
            default:
                command.message('Use spe [load/unload] to load or unload skill-prediction');
                break;
        }
    });

    function Debug () {
        let modRef = mod.manager.get(mod_name);
        confirm.log(modRef);
    }
}