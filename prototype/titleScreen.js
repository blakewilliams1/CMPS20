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
	this.credits_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/creditsButton.png"));
	this.level_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/levelSelectButton.png"));
	this.title_text = new PIXI.Text("Stealth Invasion", {font:"40px Arial", fill:"black"});
 	this.update = function() {

 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);

	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);

	}
 	this.init_ = function() {
		this.title_text.anchor.x=0.5;
		this.title_text.position.x=window_width/2;
		this.title_text.position.y=window_height/2-100;
		this.stage.addChild(this.title_text);
 		
		this.new_game_button.setInteractive(true);
		this.new_game_button.anchor.x=0.5;
 		this.new_game_button.position.x=window_width/2;
 		this.new_game_button.position.y=window_height/2;
 		this.new_game_button.click=function(event){
			if(owner.length==1)
 			owner.create_game_screen(1);
 		}
		this.stage.addChild(this.new_game_button);
		
		this.level_button.setInteractive(true);
		this.level_button.anchor.x=0.5;
 		this.level_button.position.x=window_width/2;
 		this.level_button.position.y=window_height/2+100;
 		this.level_button.click=function(event){
			if(owner.length==1)
 			owner.create_level_screen();
	    }
		this.stage.addChild(this.level_button);
		
		this.credits_button.setInteractive(true);
		this.credits_button.anchor.x=0.5;
 		this.credits_button.position.x=window_width/2;
 		this.credits_button.position.y=window_height/2+50;
 		this.credits_button.click=function(event){
			if(owner.length==1)
 			owner.create_credits_screen();
 		}
 		this.stage.addChild(this.credits_button);
	};
}