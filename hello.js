// Load SBBS API
load("sbbsdefs.js");

// Declare Utility Functions
function cls(){console.clear();}

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

// Clear Screen of rubbish
cls();

// Directions
console.center("Welcome to the RPG Simulator!");
console.center("Enter your Name, HP and desired Damage");

// Initialize Game Loop
var running = true;

// Declare Player Structure Class/Function thing
function Player()
{
//	this.name = prompt("Name");
//	this.level = prompt("Level");
	this.hp = prompt("HP");
	this.damage = prompt("Damage");
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
var sword = new Weapon("Test Sword", 2, 10, 100);
var dagger = new Weapon("Dagger", 1, 3, 100);

// Equip Test Weapon
player.eWep = sword;
// Add it to inventory
player.inventory[sword.name] = sword;
player.inventory[dagger.name] = dagger;

while(running == true){
	console.clear();
	console.crlf();
	print("HP: " + player.hp);
	console.writeln("DMG: " + player.damage);
	print("Weapon: " + player.eWep.name);
	console.crlf();
	console.writeln("\tMenu");
	console.crlf();	
	console.writeln("|D|amage yourself");
	print("|I|nventory");
	console.writeln("|Q|uit");
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
		print("Name          | Min DMG | Max DMG |")
		for(i in player.inventory) {
			//print(player.inventory[i].name);
			pad_length = 14;
			name = i.pad(" ", pad_length);
			print(name + "|");
		}
		console.pause();
	}
}
