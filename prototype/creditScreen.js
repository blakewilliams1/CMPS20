function Credits(owner){
	this.owner=owner;
	this.view=owner.view;
	this.renderer=owner.renderer;
	this.stage = new PIXI.Stage(0xCCCCCC,true);
	this.main_menu_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/quitGameButton.png"));
	this.font = {font:"40px Arial", fill:"black"};
	this.title_text = new PIXI.Text("Credits", this.font);
	this.names_text = new PIXI.Text(
		"Alex Hoyt"+'\n'+
		"Blake Williams"+'\n'+
		"Dante Ruiz"+'\n'+
		"Sam Fields", this.font);
 	this.update = function() {

 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);

	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode=27){
			owner.signal_pop(1);
		}
	}
 	this.init_ = function() {
 		this.main_menu_button.setInteractive(true);
		this.main_menu_button.anchor.x=0.5;
 		this.main_menu_button.position.x=window_width/2;
 		this.main_menu_button.position.y=window_height*3/4;
 		this.main_menu_button.click=function(event){
 			owner.signal_pop(1);
 		}
 		this.stage.addChild(this.main_menu_button);
		this.title_text.anchor.x=0.5;
		this.title_text.position.x=window_width/2;
		this.title_text.position.y=window_height/6;
		this.stage.addChild(this.title_text);
		this.names_text.anchor.x=0.5;
		this.names_text.position.x=window_width/2;
		this.names_text.position.y=window_height/3;
		this.stage.addChild(this.names_text);
 	};
 }