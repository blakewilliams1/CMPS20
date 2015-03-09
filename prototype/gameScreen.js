/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game

 var mouse_location = {
 	      x: 0,
 	      y: 0
 }
function Game(owner,level_number){
	this.end_game = false;
	this.stage = new PIXI.Stage(0xCCCCCC,true);
	//initialize game attributes
	this.pauseMenu=0;
	this.alarms=[];
 	this.soldiers = [];
	this.soldier_queue = [1,2,1];
	this.icon=[];
 	this.hiding_spots = [];
 	this.walls = [];
 	this.civilians = [];
 	this.grid = [];
 	this.active
	this.latestSoldier
 	this.fps = 60;
 	this.score=0;
 	this.score_text = new PIXI.Text(this.score.toString(), {font:"30px Arial", fill:"black"});
	this.timer = 0
	this.triggeredTime;
 	this.time=new Date().getTime();
 	this.elapsed_t=0;
 	this.time_text = new PIXI.Text("New Soldier in: ", {font:"30px Arial", fill:"black"});

//-------------------------------------------------

// this is the main update function for the game

 	this.update = function() {
		if(this.pauseMenu!=0)return;
		if(this.end_game){
			return;
		}
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

		if(this.triggeredTime!=undefined){
			//if it's been longer than the given milliseconds, signal game over
			if((new Date().getTime() - this.triggeredTime)>1500){
				var end_text = new PIXI.Text("Game Over"+'\n'+"Your score was "+this.score, {font:"30px Arial", fill:"black"});
				//alert("Game Over"+'\n'+"Your score was "+this.score);
				end_text.position.x = 500;
				end_text.position.y = 200;
				var over = new Game_over(owner);
				over.init_();
				this.end_game = true;
				this.stage.addChild(over);
				this.stage.addChild(end_text);
				//owner.signal_pop();
			}
		}
 	};

//-------------------------------------------------

 	this.countdown = function(){
 		this.elapsed_t = 15-parseInt(((new Date().getTime() - this.time)/1000).toString());
 		this.score_text.setText("Score: "+this.score.toString());
 		if(this.elapsed_t<1){
 			this.time=new Date().getTime();
			if(this.soldier_queue.length>0){
				this.create_soldier(this.soldier_queue.shift());
				this.soldier_queue.push(Math.floor(Math.random)*3);
			}else{
				//we need to discuss if there will be a set # of soldiers or not
			}
 			this.elapsed_t=15;
 		}
 		this.time_text.setText("New Soldier in: "+(this.elapsed_t));
 	}

//--------------------------------------------------

 	this.create_soldier = function(type) {
		var player;
		if(type==1){
			player = new Soldier(this);
		}else player=new BuffSoldier(this);
 		this.active = player;
		this.latestSoldier = player;
 		this.soldiers.push(player);
 		this.stage.addChild(player);
 	}

//----------------------------------------------------

	this.hide_active_soldier = function() {
		/*TODO: This should account for the width of the sprites
		//since it doesn't, it thinks the soldier isn't close enough with
		wider objects*/
 		for (var i = 0; i < this.hiding_spots.length; i++) {
			//xDistance will be the horizontal distance between the center of the two objects,
			//minus the "radius" of those two objects
 			var xDistance = Math.abs(this.active.position.x - this.hiding_spots[i].position.x);
			xDistance -= this.active.texture.width/2;
			xDistance -= this.hiding_spots[i].width/2;
			//yDistance will be the vertical distance between the center of the two objects,
			//minus the "radius" of those two objects
 			var yDistance = Math.abs(this.active.position.y - this.hiding_spots[i].position.y);
			yDistance -= this.active.texture.height;
			yDistance -= this.hiding_spots[i].height;
 			if (xDistance<10&&yDistance<10&&this.active.objectBehind==null) {
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
 				console.log("in sight");
 				if(this.active.soldierType==2)this.active.knock_out(this.civilians[i]);
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
		this.stage.addChild(civilian.graphic);
		this.stage.addChild(sprite);
		//civilian.moves = civilian.A_star(this.grid)
	}

//----------------------------------------------------

 	this.create_hiding_spot = function(x,y,empty_tex,filled_tex) {
 		var trashCan = new HidingSpot(x,y,empty_tex,filled_tex);
 		this.stage.addChild(trashCan);
 		this.hiding_spots.push(trashCan);
		this.walls.push(trashCan);
 	}

//----------------------------------------------------

	this.create_wall=function(x,y) {
		var wall = new Wall(x, y);
		this.stage.addChild(wall);
		this.walls.push(wall);
	}

//----------------------------------------------------
	this.create_building=function(x,y,name) {
		var building= new Building(x, y, name);
		this.stage.addChild(building);
		this.walls.push(building);
	}

	this.create_alarm=function(x,y) {
		var alarm = new Alarm(x,y,this);
		this.alarms.push(alarm);
 		this.stage.addChild(alarm);
	}

	this.create_background=function() {
		var x = 0;
		var y = 0;
		//map_width and map_height are defined at the top of main.js
        //This first loop will lay down a nice layer of green.
		while (x < map_width) {
			while(y < map_height) {
				var tile = new Tile(x,y);
				this.stage.addChild(tile);
				y += 256;
			}
			y = 0;
			x += 256;
		}
        //This next loop will draw some cute little shapes and stuff.
        var tileRandomizer;
        var spacingRandomizer;
        x = 0;
        y = 0;
        /*while (x < map_width) {
            tileRandomizer = Math.random()*3 + 1;
            spacingRandomizerX = Math.random()*100+50;
            spacingRandomizerY = Math.random()*100+50;
            console.log("t "+tileRandomizer);
			while(y < map_height) {
				x += Math.random()*200 - 100;
				var tile2 = new Tile(x,y);
                //What texture will be used:
                var num_for_texture = Math.floor(tileRandomizer);
                console.log("n " + num_for_texture);
                if (num_for_texture == 1)
                        tile2.changeTexture1();
                else if(num_for_texture == 2 )
                        tile2.changeTexture2();
                 else if(num_for_texture == 3)
                        tile2.changeTexture3();
                tile2.rotation = Math.random(6.28);
				this.stage.addChild(tile2);
				y += spacingRandomizerY;
			}
			y = 0;
			x += spacingRandomizerX;
		}*/
		var numSquares = 50;
		while (numSquares > 0) {
			var tile2 = new Tile(Math.random()*map_width, Math.random()*map_height);
			tileRandomizer = Math.random()*3 + 1;
			var num_for_texture = Math.floor(tileRandomizer);
            console.log("n " + num_for_texture);
            if (num_for_texture == 1)
                        tile2.changeTexture1();
            else if(num_for_texture == 2 )
                        tile2.changeTexture2();
            else if(num_for_texture == 3)
                        tile2.changeTexture3();
            tile2.rotation = Math.random(6.28);
		    this.stage.addChild(tile2);
			numSquares -= 1;
		}
	}

	this.init_gui=function(){
		var gui_base = PIXI.Texture.fromImage("../Art Assets/png/tempGui.png");
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
		//show upcoming soldiers
		for(var i=0;i<3;i++){
			var t = this.soldier_queue[i]==1?"soldier":"buff";
			this.icon[i]=  new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/"+t+"Forward1.png"));
			this.icon[i].position.x=770+40*i;
			this.icon[i].position.y=window_height-35;
			this.stage.addChild(this.icon[i]);
		}
		var upcoming_text = new PIXI.Text("Upcoming Soldiers: ", {font:"30px Arial", fill:"black"});
		upcoming_text.position.x=500;
		upcoming_text.position.y=window_height-35;
		this.stage.addChild(upcoming_text);
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
		if(event.keyCode == 32)this.knock_out();
		if(event.keyCode == 27){
			//press esc to pause game
			if(this.pauseMenu==0){
				this.pauseMenu = new Pause(owner);
				this.pauseMenu.init_();
				this.stage.addChild(this.pauseMenu);
			}else{
				this.stage.removeChild(this.pauseMenu);
				this.pauseMenu=0;
			}
		}
	}

//--------------------------------------------------

 	this.init_ = function() {
		this.create_background();
 		//The active soldier is the one soldier we just created
 		this.active = this.soldiers[0];
		this.levelManager = new LevelBuilder(this);
		this.levelManager.buildLevel(level_number);
		//initiate the gui
		this.init_gui();
 	};
 }

 //--------------------------------------------------

 function Grid_Tile() {
 	this.x
 	this.y
 	this.width
 	this.free
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


