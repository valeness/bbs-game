// Load SBBS API
load("sbbsdefs.js");

// Declare Utility Functions
function cls(){console.clear();}

function randRange(min, max) 
{
	return Math.random() * (max - min) + min;
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
function Weapon(min_dmg, max_dmg, accuracy)
{
	this.min_dmg = min_dmg;
	this.max_dmg = max_dmg;
	this.accuracy = accuracy;
}

// Initialize Player Object
var player = new Player();

// Test Weapon
var sword = new Weapon(2, 10, 100);

// Equip Test Weapon
player.eWep = sword;

while(running == true){
	console.clear();
	console.crlf();
	console.writeln("HP: " + player.hp);
	console.writeln("DMG: " + player.damage);
	console.crlf();
	console.writeln("\tMenu");
	console.crlf();	
	console.writeln("|D|amage yourself");
	console.writeln("|Q|uit");
	var cmd = prompt("Command");
	if(cmd == "D" || cmd == "d"){
		take_damage = player.doDamage(player.eWep);
		player.takeDamage(player.damage);
	}
	else if(cmd == "Q" || cmd == "q") {
		running = false;
	}
}

console.pause();
