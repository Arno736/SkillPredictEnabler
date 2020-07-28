# Skill Predict Enabler

## Usage

- Automatically disable "Skill Prediction" for selected class



## Command

| Command        | Action                               |
| -------------- | ------------------------------------ |
| /8 spe load    | Enable Skill Prediction              |
| /8 spe unload  | Disable Skill Prediction             |
| /8 spe setting | Change setting for the current class |



#### Requirement

- Skill Prediction need to be installed



##### Settings

By default PSP is disabled for mystic.

###### For Manual Configuration

```js
"disableFor":{
	"0" : false,
	"1" : false,
	"2" : false,
	"3" : false,
	"4" : false,
	"5" : false,
	"6" : false,
	"7" : true,
	"8" : false,
	"9" : false,
	"10" : false,
	"11" : false,
}
```

Number correspond to class (false to activate module, true to deactivate module)

|    0    |   1    |   2    |     3     |    4     |   5    |   6    |   7    |   8    |   9    |   10    |  11   |    12    |
| :-----: | :----: | :----: | :-------: | :------: | :----: | :----: | :----: | :----: | :----: | :-----: | :---: | :------: |
| Warrior | Lancer | Slayer | Berserker | Sorcerer | Archer | Priest | Mystic | Reaper | Gunner | Brawler | Ninja | Valkyrie |

