/*
 * This file holds functions like creating a game object and game object
 * function
 */


 /*
  * create an instance of the game
  */

function Game() {
	// The pixi.js stage represents the root of
	// our display tree. Can be rendered by one
	// of the pixi.js renderers.
	this.stage = new PIXI.Stage(0xCCCCCC, true);
	console.log("origin", [600, 300]);
	console.log("start point ", [600, 100]);
	var new_point = get_view_points([600, 100], [600, 300]);
var window_width = 1200;
var window_height = 600;
var angle = Math.PI/2;

function Game(){
    // The pixi.js stage represents the root of
   // our display tree. Can be rendered by one
  // of the pixi.js renderers.
    this.stage = new PIXI.Stage(0xCCCCCC,true);

  console.log("origin", [600,300]);
  console.log("start point ", [600,500]);
  var point = rotate_point(600, 100, 600, 300, 45)
  console.log("new point ", point.x, point.y);
>>>>>>> origin/master

	//console.log("new point ", new_point);
	// Create a renderer instance.
	// We choose Canvas and not webGL.
	this.view = document.getElementById("myCanvas");
	this.renderer = new PIXI.CanvasRenderer(window_width, window_height, this.view);

	/*
	 * initilize the soliders and enemy arrays
	 */

	this.soldiers = [];
	this.soldier_count = 0;
	this.hiding_spots = [];
	this.walls = [];
	this.enemies = [];
	this.objects = [];
	this.grid = [];
	this.active
	this.fps = 60;
	this.score=0;
	this.score_text = new PIXI.Text(this.score.toString(), {font:"30px Arial", fill:"black"});
	this.stage.addChild(this.score_text);
	this.update = function() {
		game.active.update();
		for (var i = 0; i < game.enemies.length; i++) {
			this.enemies[i].update();
		}
		this.score_text.setText(this.score.toString());
	};
<<<<<<< HEAD
=======

>>>>>>> origin/master
	this.create_soldier = function() {
		var player = new Player();
		//center the sprite's anchor point and position
		/*player.mousedown = function(event) {
		 console.log("clicked"+ player);
		 this.active = player;
		 };*/
		this.active = player;
		this.soldiers.push(player);
		this.stage.addChild(player);
	}
	this.hide_active_soldier = function() {
		for (var i = 0; i < this.hiding_spots.length; i++) {
			var xDistance = Math.abs(this.active.position.x - this.hiding_spots[i].position.x);
			var yDistance = Math.abs(this.active.position.y - this.hiding_spots[i].position.y);
			if (xDistance < 32 && yDistance < 32) {
				this.active.hide(this.hiding_spots[i]);
				this.score+=10;
			}
		}
	};
	this.create_hiding_spot = function() {
		var trashCan = new HidingSpot(100, 100);
		this.stage.addChild(trashCan);
		this.hiding_spots.push(trashCan);
	}
	this.init_game = function() {
		//Create the first soldier
		for (var i = 0; i < 2; i++) {
			//   create_civilian();
		}
		this.create_soldier();
		//The active soldier is the one soldier we just created
		this.active = this.soldiers[0];
		this.create_hiding_spot();
		//create_alarm(300, 300);
		//var alarm = new Alarm(300,300);
		//this.stage.addChild(alarm.sprite);
		create_wall(350, 350);
	};
}

function Tile() {
	this.x
	this.y
	this.width
	this.free
}

function create_grid(game) {
	for (var i = 4; i < window_width; i += 8) {
		var list = [];
		for (var j = 4; j < window_height; j += 8) {
			var tile = new Tile();
			tile.x = i;
			tile.y = j;
			tile.width = 4;
			tile.free = false;
			list.push(tile);
		}
		game.grid.push(list);
	}
}