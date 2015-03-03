// Load SBBS API
load("sbbsdefs.js");

// Declare Utility Functions
function cls(){console.clear();}

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
}

Player.prototype = {
	constructor: Player,
	takeDamage:function(take_dmg) {
		this.hp = this.hp - take_dmg;
	}
}

// Initialize Player
var player = new Player();

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
		take_damage = prompt("Damage");
		player.takeDamage(take_damage);
	}
	else if(cmd == "Q" || cmd == "q") {
		running = false;
	}
}

console.pause();
