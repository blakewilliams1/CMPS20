/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game
function Pause(parent,stage,view,renderer){
	this.stage=stage;
	this.view=view;
	this.renderer=renderer;
	/*this.stage = new PIXI.Stage(0xCCCCCC,true);
 	this.view = document.getElementById("myCanvas");
 	this.renderer = new PIXI.CanvasRenderer(window_width, window_height, this.view);*/
	//initialize game attributes
	this.parent=parent;


 	this.update = function() {
 		
 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode==27){
			//press esc to un-pause game
			parent.signal_pop();
		}
	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);

	}
	this.drawGui=function(){
	    var texture = PIXI.Texture.fromImage("../Art Assets/png/building.png");
		var sprite = new PIXI.Sprite(texture);
		sprite.position.x = 100;
		sprite.position.y = 500;
		this.stage.addChild(sprite);
 }
 
 	this.init_ = function() {
 		//initiate the gui
 		this.drawGui();
 		
 	};
 }

 //Temp Gui for score and alarm for soldiers
 