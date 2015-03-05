/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game
function Game(parent){
	this.parent=parent;
	this.view=parent.view;
	this.renderer=parent.renderer;
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
 				this.civilians[i].update(this.grid,this.soldiers);
 			}
 			this.countdown();
			//check if the active soldier is colliding
			for(var i=0;i<this.walls.length;i++){
				if(collided(this.active,this.walls[i].sprite)){
					this.active.revert_step();
				}
			}
			//check if any alarms have been triggered
			for(var i=0;i<this.alarms.length;i++){
				if(this.alarms[i].triggered){
				//signal game over
				}
			}
 	};

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
 		this.soldiers.push(player);
 		this.stage.addChild(player);
 	}

//----------------------------------------------------

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
		civilian.moves = civilian.A_star(this.grid)
		this.stage.addChild(sprite);
	}

//----------------------------------------------------

 	this.create_hiding_spot = function(x,y,empty_tex,filled_tex) {
 		var trashCan = new HidingSpot(x,y,empty_tex,filled_tex);
 		this.stage.addChild(trashCan);
 		this.hiding_spots.push(trashCan);
 	}

//----------------------------------------------------

	this.create_wall=function(x,y) {
		var wall = new Wall(x, y);
		this.stage.addChild(wall.sprite);
		this.walls.push(wall);
	}

//----------------------------------------------------
	this.create_building=function(x,y) {
		var building= new Building(x, y);
		this.stage.addChild(building.sprite);
		this.walls.push(building);
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
		if(event.keyCode==27){
			//press esc to pause game
			parent.create_pause_menu();
		}
	};

//----------------------------------------------------

	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		//the second condition fixes stuttering on direction change
		if(key=='W'&&this.active.direction=="up")this.active.direction = "none";
		if(key=='A'&&this.active.direction=="left")this.active.direction = "none";
		if(key=='S'&&this.active.direction=="down")this.active.direction = "none";
		if(key=='D'&&this.active.direction=="right")this.active.direction = "none";
	}

//--------------------------------------------------

 	this.init_ = function() {
 		//initiate the gui
 		var gui = new drawGui();
 		this.stage.addChild(gui);
 		this.score_text.position.x=30;
 		this.score_text.position.y=window_height-60;
 		this.time_text.position.x=200;
 		this.time_text.position.y=window_height-60;
 		this.stage.addChild(this.score_text);
 		this.stage.addChild(this.time_text);

 		this.create_soldier();
 		//The active soldier is the one soldier we just created
 		this.active = this.soldiers[0];
 		this.create_hiding_spot(100,100,"trashcan","trashcanSoldier");
 		this.create_hiding_spot(150,500,"trashcan","trashcanSoldier");
 		this.create_hiding_spot(600,400,"trashcan","trashcanSoldier");
 		this.create_hiding_spot(450,100,"trashcan","trashcanSoldier");
 		var alarm = new Alarm(300,300,this);
 		this.stage.addChild(alarm);
 		this.create_wall(250, 450);
 		this.create_wall(350, 100);
 		this.create_wall(650, 200);
 		this.create_wall(500, 600);
 		this.create_building(200,300);

    this.create_grid();

    for (var i = 0; i < 1; i++) {
        this.create_civilian(16,16);
       //this.create_civilian(600,250);
    }
 	};
 }

 //--------------------------------------------------

 function Tile() {
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
 			              var tile = new Tile();
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




