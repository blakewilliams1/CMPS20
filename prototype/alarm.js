function Alarm(x,y){
  this.off_tex = PIXI.Texture.fromImage("../Art Assets/png/alarm.png");
  this.on_tex = PIXI.Texture.fromImage("../Art Assets/png/alarmTriggered.png");
  this.sprite = new PIXI.Sprite(this.off_tex);
  this.sprite.anchor.x = .5;
  this.sprite.anchor.y = .5;
  this.sprite.position.x = x;
  this.sprite.position.y = y;
  
  this.update = function() {
	
  }
  this.trigger_alarm=function(){
  	this.sprite.setTexture(this.sprite.on_tex);
  }
}