/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game
function Pause(owner){
	this.owner=owner;
	this.view=owner.view;
	this.renderer=owner.renderer;
	this.stage = new PIXI.Stage(0xCCCCCC,true);

 	this.update = function() {
 		
 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode==27){
			//press esc to un-pause game
			owner.signal_pop();
		}
	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);

	}
	this.drawGui=function(){
	    
 }
 
 	this.init_ = function() {
		var resume_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/resumeGameButton.png"));
		resume_button.setInteractive(true);
		resume_button.position.x = window_width/2;
		resume_button.position.y = window_height/2-resume_button.texture.height;
		resume_button.anchor.x = 0.5;
		resume_button.anchor.y = 0.5;
		resume_button.mousedown=function(event){
 			owner.signal_pop();
 		}
		this.stage.addChild(resume_button);
		var quit_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/quitGameButton.png"));
		quit_button.setInteractive(true);
		quit_button.position.x = window_width/2;
		quit_button.position.y = window_height/2+quit_button.texture.height;
		quit_button.anchor.x = 0.5;
		quit_button.anchor.y = 0.5;
		quit_button.mousedown=function(event){
 			owner.signal_pop();
 			owner.signal_pop();
 		}
		this.stage.addChild(quit_button);
 		//initiate the gui
 		this.drawGui();
 		
 	};
 }

 //Temp Gui for score and alarm for soldiers
 