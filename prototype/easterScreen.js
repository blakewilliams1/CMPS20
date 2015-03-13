function Easter(owner){
	this.owner=owner;
	this.stage = new PIXI.Stage(0x000000,true);
	this.team_image = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/TeamIo.png"));
	this.title_text = new PIXI.Text("", {font:"25px Arial", fill:"white",align:"center"});
	this.return_text = new PIXI.Text("Press Esc to return", {font:"20px Arial", fill:"white"});
 	this.update = function() {
 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);

	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode==27){
		  owner.signal_pop();
		}
	}
 	this.init_ = function() {
		this.team_image.anchor.x=0.5;
		this.team_image.anchor.y=0.5;
 		this.team_image.position.x=window_width/2;
 		this.team_image.position.y=window_height/2-75;
 		this.team_image.click=function(event){
			if(owner.length==1)
 			owner.create_credits_screen();
 		}
 		this.stage.addChild(this.team_image);
		this.title_text.setText(
		"Thanks to everyone for their words of encouragement, and for"+
		'\n'+"the never ending support of our friends and families." +
		'\n'+"We hope that you enjoy this game as much"+
		'\n'+" as we enjoyed developing it.");
		this.title_text.position.x=window_width/2;
		this.title_text.position.y=window_height-200;
		this.title_text.anchor.x=0.5;
		this.stage.addChild(this.title_text);
		this.return_text.position.x=30;
		this.return_text.position.y=20;
		this.stage.addChild(this.return_text);
	};
}
