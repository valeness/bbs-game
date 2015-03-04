// Load SBBS API
load("sbbsdefs.js");

// Declare Utility Functions
function cls(){console.clear();}
function nl(){console.crlf();}

function print(msg){console.writeln(msg);}

function randRange(min, max) 
{
	return Math.random() * (max - min) + min;
}

String.prototype.pad = function(p_string, length)
{
	var str = this;
	while (str.length < length) {
		str = str + p_string;
	}
	return str;
}

// Init Variables
inv_ID = 0;

// Clear Screen of rubbish
cls();

// Directions
console.center("Welcome to the RPG Simulator!");
console.pause();
//console.center("Enter your Name, HP and desired Damage");

// Initialize Game Loop
var running = true;

// Declare Player Structure Class/Function thing
function Player()
{
//	this.name = prompt("Name");
//	this.level = prompt("Level");
//	this.hp = prompt("HP");
	this.hp = 12;
//	this.damage = prompt("Damage");
	this.damage = 0;
	this.eWep = null;
	this.inventory = {}
}

// Player Methods and Junk
Player.prototype = {
	constructor: Player,
	// Damage the Player
	takeDamage:function(take_dmg) {
		this.hp = this.hp - Math.ceil(take_dmg);
	},
	// Do Damage
	doDamage:function(eWep) {
		this.damage = Math.ceil(randRange(eWep.min_dmg, eWep.max_dmg));
	},
	additem:function(obj) {
		this.inventory[inv_ID] = obj;
		inv_ID++;
	},
	equip:function(obj) {
		this.eWep = obj;
	},
	get_avg_dmg:function() {
		avg = Math.ceil((this.eWep.min_dmg + this.eWep.max_dmg) / 2);
		return avg;
	}
}

// Declare Weapon Structure Object Thingamabob
function Weapon(name, min_dmg, max_dmg, accuracy)
{
	this.name = name;
	this.min_dmg = min_dmg;
	this.max_dmg = max_dmg;
	this.accuracy = accuracy;
}

// Initialize Player Object
var player = new Player();

// Test Weapons
// Eventually stick this into a JSON file
var sword = new Weapon("Test Sword", 2, 10, 100);
var dagger = new Weapon("Dagger", 1, 3, 100);

// Equip Test Weapon
player.equip(sword);

// Add it to inventory
player.additem(sword);
player.additem(dagger);

while(running == true){
	cls();
	nl();
	print("HP: " + player.hp);
	print("DMG: " + player.get_avg_dmg());
	print("Weapon: " + player.eWep.name);
	nl();
	print("\tMenu");
	nl();	
	print("|D|amage yourself");
	print("|I|nventory");
	nl("|Q|uit");
	var cmd = prompt("Command");
	if(cmd == "D" || cmd == "d"){
		take_damage = player.doDamage(player.eWep);
		player.takeDamage(player.damage);
	}
	else if(cmd == "Q" || cmd == "q") {
		running = false;
	}
	else if(cmd == "I" || cmd == "i") {
		cls();
		print("\tInventory");
		print("ID | Name          | Min DMG | Max DMG |")
		for(i in player.inventory) {
			//print(player.inventory[i].name);
			pad_length = 14;
			base_name = player.inventory[i].name
			name = base_name.pad(" ", pad_length);
			print(" " + i + " | " + name + "|");
		}
		print("Menu: |E|quip");
		inv_cmd = prompt("Command");

		if (inv_cmd == "e" || inv_cmd == "E") {
			equip_id = parseInt(prompt("ID"));
			//print(player.inventory[equip_id]);
			player.equip(player.inventory[equip_id]);
		}
		
	}
}
