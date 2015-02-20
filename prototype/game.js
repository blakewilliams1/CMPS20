/*
  * This file holds functions like creating a game object and game object
  * function
  */


 /*
  * create an instance of the game
  */


function Game(){
	this.stage = new PIXI.Stage(0xCCCCCC,true);

 	this.view = document.getElementById("myCanvas");
 	this.renderer = new PIXI.CanvasRenderer(window_width, window_height, this.view);
	//initialize game attributes
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
 	this.time=new Date().getTime();
 	this.time_text = new PIXI.Text("New Soldier in: ", {font:"30px Arial", fill:"black"});

 	this.update = function() {
 		game.active.update();
 		for (var i = 0; i < game.enemies.length; i++) {
 			this.enemies[i].update();
 		}
 		this.countdown();
		//check if the active soldier is colliding
		for(var i=0;i<this.walls.length;i++){
			if(collided(this.active,this.walls[i].sprite)){
				game.active.revert_step();
			}
		}
 	};
 	this.countdown = function(){
 		var t = 10-parseInt(((new Date().getTime() - this.time)/1000).toString());
 		this.score_text.setText("Score: "+this.score.toString());
 		if(t<0){
 			this.time=new Date().getTime();
 			this.create_soldier();
 		}
 		this.time_text.setText("New Soldier in: "+(t));
 	}
 	this.create_soldier = function() {
 		var player = new Player();
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
	
	this.create_civilian=function(x,y){
		var civilian = new Civilian();
		var texture = PIXI.Texture.fromImage("../Art Assets/png/UkraineForward1.png");
		var sprite = new PIXI.Sprite(texture);
		sprite.anchor.x = sprite.anchor.y =.5;
		sprite.position.x = x;
		sprite.position.y = y;
		civilian.sprite = sprite;
		this.enemies.push(civilian);
		var location = [sprite.position.x,sprite.position.y];
		var position = location_in_grid(location,this.grid);
		civilian.moves = civilian.A_star(game.grid)
		this.stage.addChild(sprite);
	}
 	
 	this.create_hiding_spot = function() {
 		var trashCan = new HidingSpot(100, 100);
 		this.stage.addChild(trashCan);
 		this.hiding_spots.push(trashCan);
 	}
	
	this.create_wall=function(x, y) {
		var wall = new Wall(x, y);
		this.stage.addChild(wall.sprite);
		this.walls.push(wall);
	}
	
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(key=='W')this.active.direction = "up";
		if(key=='A')this.active.direction = "left";
		if(key=='S')this.active.direction = "down";
		if(key=='D')this.active.direction = "right";
		if(key=='E')this.hide_active_soldier();
		if(key=='F')this.create_soldier();
	};
	
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		//the second condition fixes stuttering on direction change
		if(key=='W'&&this.active.direction=="up")this.active.direction = "none";
		if(key=='A'&&this.active.direction=="left")this.active.direction = "none";
		if(key=='S'&&this.active.direction=="down")this.active.direction = "none";
		if(key=='D'&&this.active.direction=="right")this.active.direction = "none";
	}
	
	//NOTE: Currently the only thing being made is a soldier and a wall
	//for collision debugging
 	this.init_game = function() {
 		var gui = new drawGui();
 		this.stage.addChild(gui);
 		this.score_text.position.x=30;
 		this.score_text.position.y=window_height-60;
 		this.stage.addChild(this.score_text);
 		this.stage.addChild(this.time_text);
 		
 		//Create the first soldier
 		for (var i = 0; i < 2; i++) {
 		//	 this.create_civilian(600,250);
 		}
 		this.create_soldier();
 		//The active soldier is the one soldier we just created
 		this.active = this.soldiers[0];
 		this.create_hiding_spot();
 		//var alarm = new Alarm(300,300);
 		//this.stage.addChild(alarm.sprite);
 		this.create_wall(300, 400);
 		this.create_wall(350, 100);
 		this.create_wall(600, 200);
 		this.create_wall(550, 350);
 	};
 }


 function Tile() {
 	this.x
 	this.y
 	this.width
 	this.free
 }
 
 //Temp Gui for score and alarm for soldiers
 function drawGui(){
    var texture = PIXI.Texture.fromImage("../Art Assets/png/guiBase.png");
	var sprite = new PIXI.Sprite(texture);
	sprite.position.x = 0;
	sprite.position.y = 700;
	
	return sprite;
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