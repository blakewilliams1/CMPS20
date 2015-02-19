function Player() {
	var sprite = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/soldier(singleframe).png"));
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.position.x = 200;
	sprite.position.y = 200;
	sprite.gridSize = 4;
	sprite.setInteractive(true);
	sprite.direction = "none";
	sprite.objectBehind;
	sprite.mousedown = function(event) {
			//TODO: THIS RELIES ON THE GAME OBJECT BEGIN SPECIFICALLY CALLED GAME! FIX!!!
			game.active = sprite;
		};
	//This is the Player update function, only called on the active soldier
	sprite.update = function() {
		//If this soldier is hiding return and don't do movement.
		if (sprite.objectBehind != null)
			return;
		//If this soldier is colliding with a wall return and don't do movement
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
	sprite.hide = function(hidingSpot) {
		if (!hidingSpot.occupied) {
			//This soldier is now hiding.
			sprite.visible = false;
			//Change sprite
			hidingSpot.setTexture(hidingSpot.hidingTexture);
			//Now this soldier object and the hiding_spot object
			//will store references to each other.
			sprite.objectBehind = hidingSpot;
			hidingSpot.hiding_soldier = sprite;
			//change 'game' to whatever we all the game instance
			//game.score+=hidingSpot.points;
			//change sprite
			hidingSpot.occupied = true;
		}
	};
	sprite.unhide = function() {
		if (!sprite.visible) {
			sprite.visible = true;
			game.score -= sprite.objectBehind.points;
			//stop both sprites from referencing each other
			sprite.objectBehind.hiding_soldier = null;
			sprite.objectBehind = null;
		}
	};
	return sprite;
};

/*function create_soldier() {
	var player = new Player();
	//center the sprite's anchor point and position
	player.sprite.mousedown = function(event) {
		game.active = player;
	};
	game.active = player;
	game.soldiers.push(player);
	game.stage.addChild(player.sprite);
}*/
