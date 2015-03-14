/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game

 var font = "Prestige Elite Std"
 var inTut = false;
 
 var mouse_location = {
 	      x: 0,
 	      y: 0
 }
function Tutorial(owner){
    inTut = true;
	this.pause = false;
	this.goal = false;
	this.hiddden = false;
	this.tut_step = 1;
	//this.seen = false;
	this.level=new Game(owner,0);
	this.stage=this.level.stage;
	this.skip_text;
	this.instruction;
	this.put = true;
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

	this.txt = "Press 'N' to continue.";
	this.update=function(){
		if(this.pause) return;
		this.level.update();
		if(this.level.civilians.length > 0){
		   if(!this.level.civilians[0].sprite.visible){
		   	if(this.level.active.soldierType == 2){
		   		if(this.level.active.carrying == 0)
             if(this.put){
		     	  this.tut_step++;
		   			this.put = false;
		   		}

      }
		}
	}
		this.instruction.visible = false;

		switch(this.tut_step){
			case 1:
           this.check_first();
           break;
			case 2:
           this.check_second();
			     break;

			case 3:
			     this.check_third();
			 break

			case 4:
			   this.check_fourth();
			   break;

			case 7:
			   this.check_fifth();
			   break;

			case 6:
			   this.check_sixth();
			   break;
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
		this.skip_text= new PIXI.Text("Press Enter to skip tutorial.", {font:"20px "+font, fill:"black"});
		this.skip_text.position.x=8;
		this.skip_text.position.y =8;
		this.skip_text.anchor.x=0;
		this.skip_text.anchor.y=0;
		this.instruction = new PIXI.Text("Use (W S A D) or the arrow keys to move. Go to the yellow arrow." +'\n' + this.txt, {font:"20px "+font, fill:"black", align:'center'});
		this.instruction.position.x = window_width/2;
		this.instruction.position.y = 100;
		this.instruction.anchor.x = 0.5;
		this.instruction.anchor.y = 0.5;

		this.level.stage.addChild(this.graphic);
		this.level.stage.addChild(this.instruction);
		this.level.stage.addChild(this.skip_text);
		this.pause = true;
	}

	this.check_first = function(){
		 var player = this.level.active;

     var dist = (Math.abs(player.position.x - 400) + Math.abs(player.position.y - 300));
		 if(dist < 50){
		 	 this.graphic.visible = false;
		 	 this.tut_step++;

		 	 this.instruction.setText("Once you are near a hiding spot press 'E' to hide." +'\n' + "A blue circle indicates this hiding spot is available.\nPress 'N' to continue.");
		 	 this.instruction.visible = true;
       this.pause = true;
		 }
	}

	this.check_second = function(){
		  if(!this.level.active.visible){
		  	this.tut_step++;
		  	this.instruction.setText("Click any soldier to take control of him. Click a hidden soldier to un-hide him." + '\n' + "Press 'N' to continue.");
		  	this.instruction.visible = true;
        this.pause = true;

		  }
	 }

	 this.check_third = function(){
	 	 if(this.level.active.visible){
	 	 	 this.spawn_civilian();
	 	 	 this.tut_step++;
	 	 	 this.instruction.setText("This is a civilian. If he sees you, he will head for the nearest alarm and end the game." + '\n' + "Get spotted by a civilian.\nPress 'N' to continue.");
		   this.instruction.visible = true;
       this.pause = true;

	 	 }


	 	this.check_fourth = function(){
	 	    if(this.level.civilians[0].found){
	 	    	this.tut_step++;
	 	    	this.instruction.setText("Gray (buff) soldiers may knock out a civilian by pressing 'SPACE'" + '\n' + "and hide them in a hiding spot by pressing E.\nPress 'N' to continue.");
		   		this.instruction.visible = true;
       		this.pause = true;
	 	    }
	 	   }

	 	  this.check_fifth = function(){
		    inTut = false;
	 	  	this.instruction.setText("Congratulations, you have completed the tutorial! Press 'ENTER' to proceed.");
		   		this.instruction.visible = true;
       		this.pause = true;

	 	  }

	 	  this.check_sixth = function(){
	 	  	this.tut_step++;
	 	  	this.instruction.setText("For each civilian that you knock out, two more will take his place.\nEach gray soldier can take out a maximum of two civilians! Press 'N' to continue.");
		   	this.instruction.visible = true;
       	this.pause = true;

	 	  }
	 }


	this.spawn_civilian = function(){
 	  this.level.create_civilian(100,100,tutorial_locations[1]);
	  //this.level.create_civilian(300,300,tutorial_locations.two);
	  //this.level.create_civilian(300,300,tutorial_locations.zero);
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


