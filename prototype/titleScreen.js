/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game
function Title(owner){
	this.owner=owner;
	this.view=owner.view;
	this.renderer=owner.renderer;
	this.stage = new PIXI.Stage(0xCCCCCC,true);
	this.new_game_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/newGameButton.png"));
 	this.update = function() {
 		
 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);
		
	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);

	}
	this.drawGui=function(){
	    
 }
 
 	this.init_ = function() {
 		this.new_game_button.setInteractive(true);
 		this.new_game_button.position.x=window_width/2;
 		this.new_game_button.position.y=window_height/2;
 		this.new_game_button.mousedown=function(event){
 			owner.create_game_screen();
 		}
 		this.stage.addChild(this.new_game_button);
 		//initiate the gui
 		this.drawGui();
 		console.log("asdfasd");
 	};
 }

 //Temp Gui for score and alarm for soldiers