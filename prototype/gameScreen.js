/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game

 var mouse_location = {
 	      x: 0,
 	      y: 0
 }
function Game(owner){
	this.container=new PIXI.DisplayObjectContainer();
	this.stage = new PIXI.Stage(0xCCCCCC,true);
	//initialize game attributes

	this.alarms=[];
 	this.soldiers = [];
 	this.soldier_count = 0;
 	this.hiding_spots = [];
 	this.walls = [];
 	this.civilians = [];
 	this.grid = [];
 	this.active
	this.latestSoldier
 	this.fps = 60;
 	this.score=0;
 	this.score_text = new PIXI.Text(this.score.toString(), {font:"30px Arial", fill:"black"});
 	this.time=new Date().getTime();
 	this.elapsed_t=0;
 	this.time_text = new PIXI.Text("New Soldier in: ", {font:"30px Arial", fill:"black"});

//-------------------------------------------------

// this is the main update function for the game
 	this.update = function() {
 			this.active.update();
 			//update civilians
 			for (var i = 0; i < this.civilians.length; i++) {
 				this.civilians[i].update(this.grid, this.soldiers, this.walls, this.alarms);
 			}
			//If the newest soldier has entered the town, start the countdown.
 			//if (this.latestSoldier.position.y < 700) {
				this.countdown();
			//
			//check if the active soldier is colliding
			for(var i=0;i<this.walls.length;i++){
				if(collided(this.active,this.walls[i])){
					this.active.revert_step();
				}
			}
			//check if any alarms have been triggered
			for(var i=0;i<this.alarms.length;i++){
				if(this.alarms[i].triggered){
					//signal game over
				}
			}
			this.scroll_camera();
 	};


 	this.scroll_camera=function(){
		if(mouse_loaction.x+this.container.position.x>window_width*4/5){
			this.container.position.x=window_width*4/5-mouse_loaction.x;
		}
		if(mouse_loaction.x+this.container.position.x<window_width/5){
			this.container.position.x=window_width/5- mouse_loaction.x;
		}
		if( mouse_location.y+this.container.position.y>window_height*4/5){
			this.container.position.y=window_height*4/5- mouse_loaction.y;
		}
		if(mouse_location.y+this.container.position.y<window_height/5){
			this.container.position.y=window_height/5-mouse_loaction.y;
		}
		if(this.container.position.x>0)this.container.position.x=0;
		if(this.container.position.y>0)this.container.position.y=0;
		if(this.container.position.x+map_width<window_width){
			this.container.position.x=window_width-map_width;
		}
		if(this.container.position.y+map_height<window_height){
			this.container.position.y=window_height-map_height;
		}
 	}

//-------------------------------------------------

 	this.countdown = function(){
 		this.elapsed_t = 10-parseInt(((new Date().getTime() - this.time)/1000).toString());
 		this.score_text.setText("Score: "+this.score.toString());
 		if(this.elapsed_t<1){
 			this.time=new Date().getTime();
 			this.create_soldier();
 			this.elapsed_t=10;
 		}
 		this.time_text.setText("New Soldier in: "+(this.elapsed_t));
 	}

//--------------------------------------------------

 	this.create_soldier = function() {
 		var player = new Player(this);
 		this.active = player;
		this.latestSoldier = player;
 		this.soldiers.push(player);
 		this.container.addChild(player);
 	}

//----------------------------------------------------

	this.hide_active_soldier = function() {
 		for (var i = 0; i < this.hiding_spots.length; i++) {
 			var xDistance = Math.abs(this.active.position.x - this.hiding_spots[i].position.x);
 			var yDistance = Math.abs(this.active.position.y - this.hiding_spots[i].position.y);
 			if (xDistance < 45 && yDistance < 45) {
 				this.active.hide(this.hiding_spots[i]);
 				this.score+=10;
 			}
 		}
 	};

//----------------------------------------------------

 	this.knock_out = function() {
 		for (var i = 0; i < this.civilians.length; i++) {
 			var xDistance = Math.abs(this.active.position.x - this.civilians[i].sprite.position.x);
 			var yDistance = Math.abs(this.active.position.y - this.civilians[i].sprite.position.y);
 			if (xDistance < 45 && yDistance < 45) {
 				this.active.knock_out(this.civilians[i].sprite);
 				break;
 			}
 		}
 	};

//----------------------------------------------------

/*
 * Function that creates a civilian
 */

	this.create_civilian=function(x,y){
		var civilian = new Civilian();
		var texture = PIXI.Texture.fromImage("../Art Assets/png/UkraineForward1.png");
		var sprite = new PIXI.Sprite(texture);
		sprite.anchor.x = sprite.anchor.y =.5;
		sprite.position.x = x;
		sprite.position.y = y;
		civilian.sprite = sprite;
		this.civilians.push(civilian);
		for(var i = 0; i < 3; i++){
			civilian.goal_list.push(position_list[Math.floor(Math.random() * position_list.length)]);
		}
		//var location = [sprite.position.x,sprite.position.y];
		//var position = location_in_grid(location,this.grid);
		this.container.addChild(sprite);
		this.container.addChild(civilian.graphic);
		//civilian.moves = civilian.A_star(this.grid)
	}

//----------------------------------------------------

 	this.create_hiding_spot = function(x,y,empty_tex,filled_tex) {
 		var trashCan = new HidingSpot(x,y,empty_tex,filled_tex);
 		this.container.addChild(trashCan);
 		this.hiding_spots.push(trashCan);
		this.walls.push(trashCan);
 	}

//----------------------------------------------------

	this.create_wall=function(x,y) {
		var wall = new Wall(x, y);
		this.container.addChild(wall);
		this.walls.push(wall);
	}

//----------------------------------------------------
	this.create_building=function(x,y) {
		var building= new Building(x, y);
		this.container.addChild(building);
		this.walls.push(building);
	}

	this.create_alarm=function(x,y) {
		var alarm = new Alarm(x,y,this);
		this.alarms.push(alarm);
 		this.container.addChild(alarm);
	}

	this.create_background=function() {
		var x = 0;
		var y = 0;
		//map_width and map_height are defined at the top of main.js
		while (x < map_width) {
			while(y < map_height) {
				var tile = new Tile(x,y);
				this.container.addChild(tile);
				y += 256;
			}
			y = 0;
			x += 256;
		}
	}

	this.init_gui=function(){
		var gui_base = PIXI.Texture.fromImage("../Art Assets/png/guiBase.png");
		var gui = new PIXI.Sprite(gui_base);
		gui.position.x = 0;
		gui.position.y = window_height-40;
 		this.score_text.position.x=30;
 		this.score_text.position.y=window_height-35;
 		this.time_text.position.x=200;
 		this.time_text.position.y=window_height-35;
 		this.stage.addChild(gui);
 		this.stage.addChild(this.score_text);
 		this.stage.addChild(this.time_text);
	}

//----------------------------------------------------

	this.signal_triggered_alarm=function() {
		alert("Game Over"+'\n'+"Your score was "+this.score);
		//Do something better to signal game over
	}

//----------------------------------------------------
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(key=='W')this.active.direction = "up";
		if(key=='A')this.active.direction = "left";
		if(key=='S')this.active.direction = "down";
		if(key=='D')this.active.direction = "right";
		if(key=='E')this.hide_active_soldier();
		if(key=='F')this.time=0;

	};

//----------------------------------------------------

	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		//the second condition fixes stuttering on direction change
		if(key=='W'&&this.active.direction=="up")this.active.direction = "none";
		if(key=='A'&&this.active.direction=="left")this.active.direction = "none";
		if(key=='S'&&this.active.direction=="down")this.active.direction = "none";
		if(key=='D'&&this.active.direction=="right")this.active.direction = "none";
		if(key=='Q')this.knock_out();
		if(event.keyCode==27){
			//press esc to pause game
			owner.create_pause_menu();
		}
	}

//--------------------------------------------------

 	this.init_ = function() {
 		this.stage.addChild(this.container);
 		//initiate the gui
		this.init_gui();

		this.create_background();
 		this.create_soldier();
 		//The active soldier is the one soldier we just created
 		this.active = this.soldiers[0];

		//Build the map:
 		/*this.create_hiding_spot(100,100,"trashcan","trashcanSoldier");
 		this.create_hiding_spot(150,500,"trashcan","trashcanSoldier");
 		this.create_hiding_spot(600,400,"trashcan","trashcanSoldier");
 		this.create_hiding_spot(450,100,"trashcan","trashcanSoldier");
 		this.create_alarm(300,300);
 		this.create_wall(250, 450);
 		this.create_wall(350, 100);
 		this.create_wall(650, 200);
 		this.create_wall(500, 600);
 		this.create_building(200,300);*/
		//Top row of hiding spots.
		this.create_hiding_spot(map_width*9/10,map_height*1/10,"trashcan","trashcanSoldier");
		this.create_hiding_spot(map_width*6/10, map_height*1/8,"trashcan","trashcanSoldier");
		//Street 1
		this.create_building(map_width*6/10, map_height*1/4);
		this.create_building(map_width*15/20, map_height*1/4);
		//Street 2
		this.create_building(map_width*6/10, map_height*4/7);
		this.create_building(map_width*8/10, map_height*4/7);
		//Second row of hiding spots.
		this.create_hiding_spot(map_width*5/10,map_height*4/7,"trashcan","trashcanSoldier");
		this.create_hiding_spot(map_width*9/10,map_height*4/7,"trashcan","trashcanSoldier");
		//Lower left hand hiding spot.
		this.create_hiding_spot(map_width*1/20,map_height*9/10,"trashcan","trashcanSoldier");
		//Upper left hand hiding spots.
		this.create_hiding_spot(map_width*1/10, map_height*1/3,"trashcan","trashcanSoldier");
		this.create_hiding_spot(map_width*1/20,map_height*1/10,"trashcan","trashcanSoldier");
		this.create_hiding_spot(map_width*1/4,map_height*1/3,"trashcan","trashcanSoldier");
		this.create_hiding_spot(map_width*1/4,map_height*1/10,"trashcan","trashcanSoldier");
		//Wallz
		for (var i = 0; i <= map_height ; i+=32){
			if (i < 1/3*map_height || i > 2/3*map_height)
				this.create_wall(map_width*3/8, i);
		}
		//Alarm
		this.create_alarm(map_width/3,map_height/2);
		//Done building the map

    this.create_grid();

    for (var i = 0; i < 5; i++) {
    	  var pos = position_list[Math.floor(Math.random() * position_list.length)]
        this.create_civilian(pos.x,pos.y);
       //this.create_civilian(600,250);
    }
 	};
 }

 //--------------------------------------------------

 function Grid_Tile() {
 	this.x
 	this.y
 	this.width
 	this.free
 }

//--------------------------------------------------

 //Temp Gui for score and alarm for soldiers
 function drawGui(){
  var texture = PIXI.Texture.fromImage("../Art Assets/png/guiBase.png");
	var sprite = new PIXI.Sprite(texture);
	sprite.position.x = 0;
	sprite.position.y = 700;
	return sprite;
 }

//-------------------------------------------------

 Game.prototype = {
     create_grid: function(){
 	        for (var i = 16; i < map_width; i += 32) {
 		           var list = [];
 		           for (var j = 16; j < map_height - 60; j += 32) {
 			              var tile = new Grid_Tile();
 			              tile.x = i;
 			              tile.y = j;
 			              tile.width = 32;
 			              tile.free = check_walls(tile.x, tile.y, this.walls);
 			              list.push(tile);
 		               }
 		           this.grid.push(list);
 	        }
      }
};


