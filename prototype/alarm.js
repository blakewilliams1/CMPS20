function Alarm(x,y){
  this.texture = PIXI.Texture.fromImage("alarm.png");
  this.sprite = new PIXI.Sprite(this.texture);
  this.sprite.anchor.x = .5;
  this.sprite.anchor.y = .5;
  this.sprite.position.x = x;
  this.sprite.position.y = y;
  
  this.update = function() {
	
  }
  }
  
    function create_alarm(x,y) {
	var alarm = new Alarm(x,y);
	game.stage.addChild(alarm.sprite);
  }