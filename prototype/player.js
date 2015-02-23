function Player(owner) {
	var tex = PIXI.Texture.fromImage("../Art Assets/png/soldier(singleframe).png");
	var sprite = new PIXI.Sprite(tex);
	sprite.owner=owner;
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.position.x = 200;
	sprite.position.y = 200;
	sprite.prevX=sprite.position.x;
	sprite.prevY=sprite.position.y;
	sprite.gridSize = 4;
	sprite.setInteractive(true);
	sprite.direction = "none";
	sprite.objectBehind;
	sprite.mousedown = function(event) {
			sprite.owner.active = sprite;
			sprite.direction="none";
		};

	//This is the Player update function, only called on the active soldier
	sprite.update = function() {
		//If this soldier is hiding return and don't do movement.
		if (sprite.objectBehind != null)return;
		//If this soldier is colliding with a wall return and don't do movement
		sprite.prevX=sprite.position.x;
		sprite.prevY=sprite.position.y;
		switch (sprite.direction) {
		case "right":
			sprite.position.x += 4;
			break;
		case "left":
			sprite.position.x -= 4;
			break;
		case "up":
			sprite.position.y -= 4;
			break;
		case "down":
			sprite.position.y += 4;
			break;
		}
	};
	sprite.revert_step=function(){
		sprite.position.x=sprite.prevX;
		sprite.position.y=sprite.prevY;
	}
	sprite.hide = function(hidingSpot) {
		if (!hidingSpot.occupied) {
			sprite.prevX=sprite.position.x;
			sprite.prevY=sprite.position.y;
			//This soldier is now hiding.
			sprite.visible = false;
			//Change sprite
			hidingSpot.setTexture(hidingSpot.hidingTexture);
			//Now this soldier object and the hiding_spot object
			//will store references to each other.
			sprite.objectBehind = hidingSpot;
			hidingSpot.hiding_soldier = sprite;
			//change 'game' to whatever we all the game instance
			//change sprite
			hidingSpot.occupied = true;
		}
	};
	sprite.unhide = function() {
		if (!sprite.visible) {
			sprite.visible = true;
			//stop both sprites from referencing each other
			sprite.objectBehind.hiding_soldier = null;
			sprite.objectBehind = null;
			sprite.owner.score-=10;
			owner.active = this;
		}
	};
	return sprite;
};
