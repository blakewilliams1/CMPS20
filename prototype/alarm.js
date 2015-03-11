function Alarm(x,y,owner){
  var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/alarm.png"));
  sprite.on_tex1 = PIXI.Texture.fromImage("../Art Assets/png/alarmTriggered1.png");
  sprite.on_tex2 = PIXI.Texture.fromImage("../Art Assets/png/alarmTriggered2.png");
  sprite.off_tex = PIXI.Texture.fromImage("../Art Assets/png/alarm.png");
  sprite.owner=owner;
  sprite.anchor.x = .5;
  sprite.anchor.y = .8;
  sprite.position.x = x;
  sprite.position.y = y;
  sprite.triggered=false;
  sprite.flicker;
  sprite.trigger=function(){
  	if(!sprite.triggered){
	  	sprite.setTexture(sprite.on_tex1);
  		sprite.triggered=true;
		owner.triggeredTime=new Date().getTime();
		sprite.flicker=new Date().getTime();
	  }
	  else if((new Date().getTime() - this.flicker)>200){
		  sprite.flicker=new Date().getTime();
		  if(sprite.texture==sprite.on_tex1){
			  sprite.setTexture(sprite.on_tex2);
		  }else sprite.setTexture(sprite.on_tex1);
	  }
  }
  return sprite;
}