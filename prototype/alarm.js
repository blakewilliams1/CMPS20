function Alarm(x,y){
  var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/alarm.png"));
  sprite.on_tex = PIXI.Texture.fromImage("../Art Assets/png/alarmTriggered.png");
  sprite.off_tex = PIXI.Texture.fromImage("../Art Assets/png/alarm.png");
  sprite.anchor.x = .5;
  sprite.anchor.y = .5;
  sprite.position.x = x;
  sprite.position.y = y;
  sprite.triggered=false;
  
  sprite.update = function() {
	
  }
  sprite.trigger=function(){
  	if(!sprite.triggered){
	  	sprite.setTexture(sprite.on_tex);
  		sprite.triggered=true;
	  }
  }
  //parent.stage.addChild(sprite);
  return sprite;
}