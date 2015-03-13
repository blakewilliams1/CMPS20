/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game
function Title(owner){
	this.owner=owner;
	this.stage = new PIXI.Stage(0x000000,true);
	this.easter_buttons=[38,38,40,40,37,39,37,39,66,65,13];
	this.easter_index=0;
	this.newspaper = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/newspaper.png"))
	this.new_game_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/newGameButton.png"));
	this.credits_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/creditsButton.png"));
	this.level_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/levelSelectButton.png"));
	//this.title_text = new PIXI.Text("Stealth Invasion", {font:"40px Arial", fill:"black"});
 	this.update = function() {

 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);

	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode==this.easter_buttons[this.easter_index]){
			if(this.easter_index==-1)return;
			this.easter_index++;
		}
		if(this.easter_index==this.easter_buttons.length){
			//konami code
			this.easter_index=-1;
			console.log("konami!!!");
			owner.create_easter_screen();
		}
	}
 	this.init_ = function() {
		this.newspaper.anchor.x=0.5;
		this.newspaper.position.x=window_width/2;
		this.newspaper.position.y=window_height/16;
		this.stage.addChild(this.newspaper);
	
		//this.title_text.anchor.x=0.5;
		//this.title_text.position.x=window_width/2;
		//this.title_text.position.y=window_height/2-100;
		//this.stage.addChild(this.title_text);

		this.new_game_button.setInteractive(true);
		this.new_game_button.anchor.x=0.5;
 		this.new_game_button.position.x=window_width/2;
 		this.new_game_button.position.y=window_height/2;
 		this.new_game_button.click=function(event){
			if(owner.length==1)
 			owner.create_tutorial_screen();

 			//owner.create_game_screen(1);
 		}
		this.stage.addChild(this.new_game_button);

		this.level_button.setInteractive(true);
		this.level_button.anchor.x=0.5;
 		this.level_button.position.x=window_width/2;
 		this.level_button.position.y=window_height/2+50;
 		this.level_button.click=function(event){
			if(owner.length==1)
 			owner.create_level_screen();
	    }
		this.stage.addChild(this.level_button);

		this.credits_button.setInteractive(true);
		this.credits_button.anchor.x=0.5;
 		this.credits_button.position.x=window_width/2;
 		this.credits_button.position.y=window_height/2+100;
 		this.credits_button.click=function(event){
			if(owner.length==1)
 			owner.create_credits_screen();
 		}
 		this.stage.addChild(this.credits_button);
	};
}
