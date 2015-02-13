function HidingSpot(x,y){
  var texture = PIXI.Texture.fromImage("../Art Assets/png/trashcan.png");
  var new_hiding_spot = new PIXI.Sprite(texture);
  new_hiding_spot.hidingTexture = PIXI.Texture.fromImage("../Art Assets/png/trashcanSoldier.png");
  new_hiding_spot.setInteractive(true);
  new_hiding_spot.position.x=x;
  new_hiding_spot.position.y=y;
  new_hiding_spot.anchor.x = .5;
  new_hiding_spot.anchor.y = .5;
  new_hiding_spot.hiding_soldier;
  new_hiding_spot.occupied=false;
  new_hiding_spot.points=10;//arbitrary so far
  new_hiding_spot.mousedown=function(event){
    if(new_hiding_spot.occupied){
	  //TODO: unhide doesn't work
	  hiding_soldier.unhide();
	}
  }
  return new_hiding_spot;
}