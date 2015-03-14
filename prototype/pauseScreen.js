 //create a container filled with pause menu stuff
function Pause(owner){
	var menu = new PIXI.DisplayObjectContainer();
	menu.owner=owner;

 	menu.init_ = function() {
		var resume_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/resumeGameButton.png"));
		resume_button.setInteractive(true);
		resume_button.anchor.x = 0.5;
		resume_button.anchor.y = 0.5;
		resume_button.position.x = window_width/2;
		resume_button.position.y = window_height/2-50
		console.log(resume_button.position.x, resume_button.position.y);
		resume_button.click=function(event){
			if(owner[owner.length-1].stage!=this.stage)return;
			event.keyCode=27;
			owner[owner.length-1].keyup(event);
 		}
		menu.addChild(resume_button);
		var level_button= new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/levelSelectButton.png"));
		level_button.setInteractive(true);
		level_button.anchor.x = 0.5;
		level_button.anchor.y = 0.5;
		level_button.position.x = window_width/2;
		level_button.position.y = window_height/2
		level_button.click=function(event){
			music.pause();
			inTut = false;
			if(owner[owner.length-1].stage!=this.stage)return;
 			owner.create_level_screen();
 		}
		menu.addChild(level_button);
		var quit_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/quitGameButton.png"));
		quit_button.setInteractive(true);
		quit_button.anchor.x = 0.5;
		quit_button.anchor.y = 0.5;
		quit_button.position.x = window_width/2;
		quit_button.position.y = window_height/2+50
		quit_button.click=function(event){
			music.pause();
			inTut = false;
			if(owner[owner.length-1].stage!=this.stage)return;
 			owner.signal_pop();
			owner.signal_pop();
 		}
		menu.addChild(quit_button);
 	};
	return menu;
 }

