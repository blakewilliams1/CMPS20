function Player(){
  this.image;
  this.direction = "none";
  this.hiding=false;
  this.objectBehind;
  this.update = function(image){
	if(this.image != image) return;
	  switch (this.direction){
	    case "right":
		this.image.position.x += 4;
		break;

		case "left":
		this.image.position.x -= 4;
		break;

		case "up":
		this.image.position.y -= 4;
		break;

		case "down":
		this.image.position.y += 4;
		break;
	}
  }
  this.hide = function(hidingObject){
    if(!hidingObject.occupied){
      this.hiding=true;
	  this.objectBehind=hidingObject;
      //change 'game' to whatever we all the game instance
      game.score+=hidingObject.points;
	  //change sprite
	  hidingObject.occupied=true;
    }
  }
  this.unhide = function(){
    if(this.hiding){
	  this.hiding=false;
	  game.score-=objectBehind.points;
	  this.objectBehind=null;
	  //change sprite
	}
  }
}
