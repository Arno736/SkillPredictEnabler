module.exports = function SkillPredictEnabler(mod) {
	let command = mod.command;
    let mod_name = "skill-prediction"; //Voir si autre nom ?
    
    mod.hook('S_LOGIN', 14, (event) => {
        // 0 = Warrior, 1 = Lancer, 2 = Slayer, 3 = Berserker, 4 = Sorcerer, 5 = Archer,
        // 6 = Priest, 7 = Mystic, 8 = Reaper, 9 = Gunner, 10 = Brawler, 11 = Ninja,
        // 12 = Valkyrie
		let classId = parseInt(GetClassId(event.templateId)) - 1;
		
        switch (classId) {
            case 7: //Mystic
                if (mod.settings.disableMystic) UnloadSP();
                break;
            default:
                LoadSP();
                break;
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
        







    mod.command.add(['spd'], (y) =>{
        switch (y) {
            case "true":
                FullLoad();
                LoadMod();
                break;
            case "false":
                //UnloadMod();
                FullUnload();
                break;
            case "test":
                TryUnload();
                break;
            default:
                break;
        }
    });

    function UnloadMod () {
        let modRef = mod.manager.get(mod_name);
        if (modRef) { 
            modRef.unloadNetworkInstance(mod.dispatch);
            command.message(null, `Unloaded network instance for mod "${mod_name}" in current connection!`);
        }
        else {
            command.message(null, `Unable to unload network instance for mod "${mod_name}"!`);
        }
        return;
    }
    function LoadMod () {
        let modRef = mod.manager.get(mod_name);
        if (modRef) { 
            modRef.loadNetworkInstance(mod.dispatch);
            command.message(null, `Loaded network instance for mod "${mod_name}" in current connection!`);
        }
        else {
            command.message(null, `Unable to load network instance for mod "${mod_name}"!`);
        }
        return;
    }






    function TryUnload () {
        let modRef = mod.manager.get(mod_name);
        if (modRef) modRef.unloadNetworkInstance(mod.dispatch);
    }







    function FullLoad () {
        const result = mod.manager.load(mod_name);
        if (result)
            command.message(null, `Loaded "${mod_name}"!`);
        else
            command.message(null, `Unable to load "${mod_name}", check log for details!`);
    }
    function FullUnload () {
        const result = mod.manager.unload(mod_name);
        if (result)
            command.message(null, `Unloaded "${mod_name}"!`);
        else
            command.message(null, `Unable to unload "${mod_name}", check log for details!`);
    }
    
}
