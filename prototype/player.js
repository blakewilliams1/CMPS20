function Player() {
	var texture = PIXI.Texture.fromImage("../Art Assets/png/soldier(singleframe).png");
	this.sprite = new PIXI.Sprite(texture);
	this.sprite.anchor.x = .5;
	this.sprite.anchor.y = .5;
	this.sprite.position.x = 200;
	this.sprite.position.y = 200;
	this.sprite.gridSize = 4;
	this.sprite.setInteractive(true);
	// NOTE:
	// Instead of a 'hiding' field we are manipulating sprite.visible
	// both to turn visibility of a solider on/off and to do AI checks, etc.
	// visible is a Pixi.js field that every Sprite has.
	// It is true by default.
	this.direction = "none";
	this.objectBehind;
	//This is the Player update function, only called on the active soldier
	this.update = function() {
		//If this soldier is hiding return and don't do movement.
		if (this.objectBehind != null)
			return;
		//If this soldier is colliding with a wall return and don't do movement
		//CODE

		switch (this.direction) {
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
	};
	this.hide = function(hidingSpot) {
		if (!hidingSpot.occupied) {
			//This soldier is now hiding.
			this.sprite.visible = false;
			//Change sprite
			hidingSpot.setTexture(hidingSpot.hidingTexture);
			//Now this soldier object and the hiding_spot object
			//will store references to each other.
			this.objectBehind = hidingSpot;
			hidingSpot.hiding_soldier = this;
			//change 'game' to whatever we all the game instance
			//game.score+=hidingSpot.points;
			//change sprite
			hidingSpot.occupied = true;
		}
	};
	this.unhide = function() {
		console.log(this.objectBehind);
		if (!this.visible) {
			this.sprite.visible = true;
			game.score -= this.objectBehind.points;
			//stop both sprites from referencing each other
			this.objectBehind.hiding_soldier = null;
			this.objectBehind = null;
			//change sprite
		}
	};
};

function create_soldier() {
	//create a texture from an image path
	
	//create a new Sprite using the texture. A Sprite is an actual game object.
	//var new_soldier 

	var player = new Player();

	//center the sprite's anchor point and position
	
	player.sprite.mousedown = function(event) {
		game.active = player;
	};
	//player.sprite = new_soldier;
	game.active = player;
	game.soldiers.push(player);

	game.stage.addChild(player.sprite);
}
