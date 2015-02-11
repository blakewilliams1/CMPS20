function Player(){
  this.sprite;
  // NOTE:
  // Instead of a 'hiding' field we are manipulating sprite.visible
  // both to turn visibility of a solider on/off and to do AI checks, etc.
  // visible is a Pixi.js field that every Sprite has
  this.direction = "none";
  this.objectBehind;
  this.update = function(sprite){
	if(this.sprite != sprite) return;
	  switch (this.direction){
	    case "right":
		this.sprite.position.x += 4;
		break;

		case "left":
		this.sprite.position.x -= 4;
		break;

		case "up":
		this.sprite.position.y -= 4;
		break;

		case "down":
		this.sprite.position.y += 4;
		break;
	}
  }
  this.hide = function(hidingSpot){
    if(!hidingSpot.occupied){
	  //This soldier is now hiding.
	  this.sprite.visible = false;
	  //Show soldier in hiding spot.
	  hidingSpot.setTexture(hidingSpot.hidingTexture);
	  this.objectBehind=hidingSpot;
      //change 'game' to whatever we all the game instance
      //game.score+=hidingSpot.points;
	  //change sprite
	  hidingSpot.occupied=true;
    }
  }
  this.unhide = function(){
    if(!this.visible){
	  this.visible=true;
	  game.score-=objectBehind.points;
	  this.objectBehind=null;
	  //change sprite
	}
  }
}
