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
	this.stage = new PIXI.Stage(0x008F61,true);
	//initialize game attributes
	this.pauseMenu=0;
	this.alarms=[];
 	this.soldiers = [];
	this.soldier_queue;
	if (inTut == false)
		this.soldier_queue = [1,1,2];
	if (inTut == true) this.soldier_queue = [2, 1, 2];
	this.icon=[];
 	this.hiding_spots = [];
 	this.walls = [];
 	this.civilians = [];
 	this.level_spots;
 	this.grid = [];
 	this.active
	this.latestSoldier
	this.score_time = 0;
	this.graphic = new PIXI.Graphics();
 	this.fps = 60;
 	this.score=0;
 	this.set = false;
 	this.score_text = new PIXI.Text(this.score.toString(), {font:"30px Arial", fill:"black"});
	this.timer = 0
	this.triggeredTime;
 	this.elapsed_t=0;
 	this.time_text = new PIXI.Text("New Soldier in: ", {font:"30px Arial", fill:"black"});
	this.num_background_tiles = 0;

	this.graphic.beginFill(0x0066FF);
	this.graphic.drawRect (1053, 545,224, 95);
	this.graphic.alpha = 0.2;
	this.graphic.endFill();

		this.spawn_free = false;

//-------------------------------------------------

//this will sort the stage based on y values of all objects except for the little
//squares in the background.

	this.sortStage = function(stage) {
		stage.children.sort(this.childCompare);
	}

	this.childCompare = function(a, b) {
		return a.position.y - b.position.y;
	}

// this is the main update function for the game

 	this.update = function() {
		if(this.pauseMenu!=0)return;
		if(this.end_game){
			return;
		}
		//The following func sorts children by y-value for drawing
		this.sortStage(this.stage);
		for (var i = 0; i < this.soldiers.length; i++){
			if(check_player_in_spawn(this.soldiers[i])){
				this.spawn_free = false;
			}else{
				this.spawn_free = true;
			}
		}
		this.score_time++;
    var n = this.score_time / 60;
		if( (n % 2 == 0) && (this.spawn_free)) this.score += 2;
 		this.active.update();
 		//update civilians
    close_to_hiding(this.hiding_spots,this.active);
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

    if(this.active.spawn_count != 1){
			var bool = !check_player_in_spawn(this.active);
			if(bool){
					this.active.out_of_spawn = bool;
					this.active.spawn_count = 1;
					console.log(this.active.out_of_spawn);
				}
	}


			 if(check_spawn_area(this.active)){
			 	if(this.active.out_of_spawn){
			 	console.log("back in spawn")
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
				var over = new Game_over(owner,level_number);
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
		if(this.pauseMenu!=0)return;
 		this.elapsed_t++;
 		this.score_text.setText("Score: "+this.score.toString());
 		if(this.elapsed_t>15*60){
 			this.elapsed_t=0;
			if(this.soldier_queue.length>0){
				this.create_soldier();
			}
 		}
 		this.time_text.setText("New Soldier in: "+(15-Math.floor(this.elapsed_t/60)));
 	}

//--------------------------------------------------

 	this.create_soldier = function() {
		var player;
		var type = this.soldier_queue.shift();
		var n = Math.floor(Math.random()*5)<1?1:0;
		this.soldier_queue.push(1+n);

		if(type==1){
			player = new Soldier(this);
		}else player=new BuffSoldier(this);
		if((this.active == undefined) || (this.set)){
			this.active = player;
		}
		this.latestSoldier = player;
 		this.soldiers.push(player);
 		this.stage.addChild(player);
 		this.set = false;
 	}


 	this.create_spawn = function(){

 	}

//----------------------------------------------------

	this.hide_active_soldier = function() {
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
				if(this.active.soldierType==2&&this.active.carrying!=0){
					//hide the civilian
					console.log("hide the civilian");
					this.active.hide_civilian(this.hiding_spots[i]);
					this.active.revert_step();
				}else{
					this.active.hide(this.hiding_spots[i]);
					this.score+=10;
				}
				break;
 			}
 		}
 	};

//----------------------------------------------------

 	this.knock_out = function() {
 		for (var i = 0; i < this.civilians.length; i++) {
 			var xDistance = Math.abs(this.active.position.x - this.civilians[i].sprite.position.x);
 			var yDistance = Math.abs(this.active.position.y - this.civilians[i].sprite.position.y);
 			if (xDistance < 45 && yDistance < 45) {
 				if(this.active.soldierType==2){
 					if(this.active.carrying == 0){
					 this.active.knock_out(this.civilians[i]);
					 this.spawn_new_civilian();
					 this.spawn_new_civilian();
					 break;
				  }
				}
 			}
 		}
 	};

//----------------------------------------------------

/*
 * Function that creates a civilian
 */

	this.create_civilian=function(x,y,goals){
		var civilian = new Civilian();
		var texture = PIXI.Texture.fromImage("../Art Assets/png/UkraineForward1.png");
		var sprite = new PIXI.Sprite(texture);
		sprite.anchor.x = sprite.anchor.y =.5;
		sprite.position.x = x;
		sprite.position.y = y;
		civilian.sprite = sprite;
		this.civilians.push(civilian);
    civilian.goal = goals[Math.floor(Math.random(goals.length))];
		civilian.goal_list = goals;
		this.stage.addChild(civilian.graphic);
		this.stage.addChild(sprite);
	}

//----------------------------------------------------

 	this.create_hiding_spot = function(x,y,empty_tex) {
 		var trashCan = new HidingSpot(x,y,empty_tex);
 		this.stage.addChild(trashCan);
 		this.stage.addChild(trashCan.graphic);
 		this.hiding_spots.push(trashCan);
		this.walls.push(trashCan);
 	}


  this.spawn_new_civilian = function(){
  	 console.log("this is the level spots", this.level_spots);
     var index = Math.floor(Math.random() * this.level_spots.length);
     var random_pos = Math.floor(Math.random() * this.level_spots[index].length);
     var new_pos = this.level_spots[index][random_pos]
     var new_positions = this.level_spots[index];

     this.create_civilian(100,100, new_positions)
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

	//This function will randomly generate the little squares
	//in the background
	this.create_background=function() {
        var tileRandomizer;
        var spacingRandomizer;
        x = 0;
        y = 0;

		var numSquares = 50;
		while (numSquares > 0) {
			var tile2 = new Tile(Math.random()*map_width, Math.random()*map_height);
			tileRandomizer = Math.random()*3 + 1;
			var num_for_texture = Math.floor(tileRandomizer);
            //console.log("n " + num_for_texture);
            if (num_for_texture == 1)
                        tile2.changeTexture1();
            else if(num_for_texture == 2 )
                        tile2.changeTexture2();
            else if(num_for_texture == 3)
                        tile2.changeTexture3();
            tile2.rotation = Math.random(6.28);
		    this.stage.addChild(tile2);
			this.num_background_tiles += 1;
			numSquares -= 1;
		}
		//console.log("NUM TILES: "+this.num_background_tiles);
	}

	this.init_gui=function(){
        music = document.getElementById('music');
        music.loop = true;
        music.play();

		var gui_base = PIXI.Texture.fromImage("../Art Assets/png/tempGui.png");
		var gui = new PIXI.Sprite(gui_base);
		gui.position.x = 0;
		gui.position.y = window_height-40;
    gui.width = map_width;
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
		this.stage.addChild(this.graphic);
	}

//----------------------------------------------------
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(key=='W'||event.keyCode==38)this.active.direction = "up";
		if(key=='A'||event.keyCode==37)this.active.direction = "left";
		if(key=='S'||event.keyCode==40)this.active.direction = "down";
		if(key=='D'||event.keyCode==39)this.active.direction = "right";
		if(key=='E')this.hide_active_soldier();
		if(key=='F'){
			this.elapsed_t=0;
			this.set = true;
			this.create_soldier();
		}
	};

//----------------------------------------------------

	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		//the second condition fixes stuttering on direction change
		if((key=='W'||event.keyCode==38)&&this.active.direction=="up")this.active.direction = "none";
		if((key=='A'||event.keyCode==37)&&this.active.direction=="left")this.active.direction = "none";
		if((key=='S'||event.keyCode==40)&&this.active.direction=="down")this.active.direction = "none";
		if((key=='D'||event.keyCode==39)&&this.active.direction=="right")this.active.direction = "none";


		if(event.keyCode==32)this.knock_out();
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


