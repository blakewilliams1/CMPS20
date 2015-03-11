/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game

 var mouse_location = {
 	      x: 0,
 	      y: 0
 }
function Tutorial(owner){
	this.pause = false;
	this.goal = false;
	this.hiddden = false;
	this.tut_step = 1;
	//this.seen = false;
	this.level=new Game(owner,0);
	this.stage=this.level.stage;
	this.skip_text;
	this.instruction;
	this.graphic = this.graphic = new PIXI.Graphics();
	this.graphic.beginFill(0xFFFF00);
  this.graphic.moveTo(400,300);
	this.graphic.lineTo(400+40,300-20);
	this.graphic.lineTo(400+15,300-20);
	this.graphic.lineTo(400+15,300-50);
	this.graphic.lineTo(400-15,300-50);
	this.graphic.lineTo(400-15,300-20);
	this.graphic.lineTo(400-40,300-20);
	this.graphic.lineTo(400,300)
	this.graphic.endFill()

	this.txt = "press n to continue";
	this.update=function(){
		if(this.pause) return;
		this.level.update();
		this.instruction.visible = false;

		switch(this.tut_step){
			case 1:
           this.check_first();
           break;
			case 2:
           this.check_second();
			     break;

			case 3:
			 break
		}

	}
	this.keydown=function(event){
		this.level.keydown(event);
	};
	this.keyup=function(event){
		this.level.keyup(event);
		if(event.keyCode==13){
			while(owner.length>1)owner.signal_pop();
			owner.create_game_screen(1);
		}
		 if(event.keyCode == 78) {this.pause = false;}
	}

	this.init_tutorial_specific=function(){
		this.skip_text= new PIXI.Text("Press Enter to skip ", {font:"20px Arial", fill:"black"});
		this.skip_text.position.x=window_width;
		this.skip_text.anchor.x=1;
		this.skip_text.anchor.y=0;
		this.instruction = new PIXI.Text("use (W S A D) or the arrow keys to move to the arrow on the map" +'\n' + this.txt, {font:"20px Arial", fill:"black"});
		this.instruction.position.x = window_width/2;
		this.instruction.position.y = 100;
		this.instruction.anchor.x = 0.5;
		this.instruction.anchor.y = 0.5;

		this.level.stage.addChild(this.graphic);
		this.level.stage.addChild(this.instruction);
		this.level.stage.addChild(this.skip_text);
		this.pause = true;
		console.log("asfasdf");
	}

	this.check_first = function(){
		 var player = this.level.active;

     var dist = (Math.abs(player.position.x - 400) + Math.abs(player.position.y - 300));
		 if(dist < 50){
		 	 this.graphic.visible = false;
		 	 this.tut_step++;

		 	 this.instruction.setText("Once you are near a hiding spot press 'E' to hide" +'\n' + " Blue circle indicates it's unoccupied and red indicates it's occupied  press n to continue");
		 	 this.instruction.visible = true;
       this.pause = true;
		 }
	}

	this.check_second = function(){
		  if(!this.level.active.visible){
		  	this.tut_step++;
		  	this.instruction.setText("Click the hiding spot to remove the soldier from the hiding spot or click on another soldier to control that soldier" + '\n' + " press n to continue");
		  	this.instruction.visible = true;
        this.pause = true;

		  }
	 }

 }

//-------------------------------------------------

Tutorial.prototype = {
	create_grid: function(){
		for (var i = 16; i < map_width; i += 32) {
			var list = [];
			for(var j = 16; j < map_height - 60; j += 32) {
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


