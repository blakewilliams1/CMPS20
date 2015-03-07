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
		resume_button.position.y = window_height/2-32//resume_button.texture.height;
		console.log(resume_button.position.x, resume_button.position.y);
		resume_button.click=function(event){menu=0;
			menu.owner[menu.owner.length-1].container.removeChild(menu);
			
 		}
		menu.addChild(resume_button);
		var quit_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/quitGameButton.png"));
		quit_button.setInteractive(true);
		quit_button.anchor.x = 0.5;
		quit_button.anchor.y = 0.5;
		quit_button.position.x = window_width/2;
		quit_button.position.y = window_height/2+32//quit_button.texture.height;
		quit_button.click=function(event){
 			owner.signal_pop();
			owner.signal_pop();
 		}
		menu.addChild(quit_button);
 	};
	return menu;
 }

