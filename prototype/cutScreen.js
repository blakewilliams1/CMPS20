function cutScreen(owner){
	this.owner=owner;
	this.stage = new PIXI.Stage(0x000000,true);
	this.text = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/intro_text.png"));
 	this.update = function() {
		this.text.position.y -=1;
		if (this.text.position.y < -100) {
			owner.create_title_screen();
			owner.shift();
		}
 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);

	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode==17){
		  //pressed esc I think
		  owner.signal_pop();
		}
		if(event.keyCode==13){
			owner.create_title_screen();
			owner.shift();
		}
	}
 	this.init_ = function() {
		this.text.anchor.x=0.5;
		this.text.anchor.y=0.5;
		this.text.position.x=window_width/2;
		this.text.position.y=window_height/2+500;
		this.stage.addChild(this.text);
	};
}
