	var rightTextures = [
		PIXI.Texture.fromImage("../Art Assets/png/soldierRight1.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierRight2.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierRight3.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierRight4.png")
	]

	var leftTextures = [
		PIXI.Texture.fromImage("../Art Assets/png/soldierLeft1.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierLeft2.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierLeft3.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierLeft4.png")
	]

	var upTextures = [
		PIXI.Texture.fromImage("../Art Assets/png/soldierBack1.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierBack2.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierBack3.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierBack4.png")
	]

	var downTextures = [
		PIXI.Texture.fromImage("../Art Assets/png/soldierForward1.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierForward2.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierForward3.png"),
		PIXI.Texture.fromImage("../Art Assets/png/soldierForward4.png")
	]

	var otherTex = PIXI.Texture.fromImage("../Art Assets/png/soldierRight1.png");


function Soldier(owner) {
	var tex = PIXI.Texture.fromImage("../Art Assets/png/soldierForward1.png");
	var sprite = new PIXI.Sprite(tex);
	sprite.owner=owner;
	sprite.soldierType=1;
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.position.x = Math.floor(1222);
	sprite.position.y = Math.floor(606);
	sprite.prevX=sprite.position.x;
	sprite.prevY=sprite.position.y;
	sprite.gridSize = 4;
	//This counter is used below to control the index of the current texture
	sprite.animCounter = 0;
	//This counter is used below to control how fast animation is
	sprite.animCounter2 = 0;
	sprite.setInteractive(true);
	sprite.direction = "none";
	sprite.objectBehind;
	sprite.out_of_spawn = false;
	sprite.spawn_count = 0;
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
			sprite.moveRight();
			break;
		case "left":
			sprite.moveLeft();
			break;
		case "up":
			sprite.moveUp();
			break;
		case "down":
			sprite.moveDown();
			break;
		}
		if(sprite.position.x<0||sprite.position.y<0)sprite.revert_step();
		//TODO: hardcoded the height of the gui base
		if(sprite.position.x>map_width||sprite.position.y>map_height-65)
			sprite.revert_step();
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
			hidingSpot.changeTexture(sprite.soldierType);
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
	sprite.moveRight = function() {
			this.setTexture(rightTextures[sprite.animCounter]);
			if (sprite.animCounter2++ % 10 == 0) ++sprite.animCounter;
			if (sprite.animCounter >= 4) sprite.animCounter = 0;
			sprite.position.x += 4;
	};
	sprite.moveLeft = function() {
			this.setTexture(leftTextures[sprite.animCounter]);
			if (sprite.animCounter2++ % 10 == 0) ++sprite.animCounter;
			if (sprite.animCounter >= 4) sprite.animCounter = 0;
			sprite.position.x -= 4;
	};
	sprite.moveUp = function() {
			this.setTexture(upTextures[sprite.animCounter]);
			if (sprite.animCounter2++ % 10 == 0) ++sprite.animCounter;
			if (sprite.animCounter >= 4) sprite.animCounter = 0;
			sprite.position.y -= 4;
	}
	sprite.moveDown = function() {
			this.setTexture(downTextures[sprite.animCounter]);
			if (sprite.animCounter2++ % 10 == 0) ++sprite.animCounter;
			if (sprite.animCounter >= 4) sprite.animCounter = 0;
			sprite.position.y += 4;
	}

	return sprite;
};
