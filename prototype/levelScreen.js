function Levels(owner){
	this.owner=owner;
	this.stage = new PIXI.Stage(0xCCCCCC,true);
	this.font = {font:"30px Arial", fill:"black"};

	this.names_text = new PIXI.Text("Level 1", this.font);
 	this.update = function() {

 	};
	this.keydown=function(event){
		var key = String.fromCharCode(event.keyCode);

	};
	this.keyup=function(event){
		var key = String.fromCharCode(event.keyCode);
		if(event.keyCode=27){
			owner.signal_pop();
		}
	}
 	this.init_ = function() {
		var numLevels=3;
		for(var i=1;i<=numLevels;i++){
			var level_texture=PIXI.Texture.fromImage("../Art Assets/png/level"+i.toString()+".png");
			var level_icon=new PIXI.Sprite(level_texture);
			level_icon.setInteractive(true);
			level_icon.anchor.x=0.5;
			level_icon.anchor.y=0.5;
			level_icon.position.x=((i-1)*window_width/3)%window_width*3/4+window_width/4;
			level_icon.position.y=Math.floor(1+(i-1)/3)*window_height/3;
			level_icon.num=i;
			level_icon.click=function(event){
				if(owner[owner.length-1].stage!=this.stage)return;
				while(owner.length>1)owner.signal_pop();
				owner.create_game_screen(this.num);
			}
			this.stage.addChild(level_icon);
			//Add level name
			var level_name = new PIXI.Text("Level "+i.toString(), this.font);
			level_name.anchor.x=0.5;
			level_name.position.x=level_icon.position.x;
			level_name.position.y=level_icon.position.y+70;
			this.stage.addChild(level_name);
		}
 	};
 }