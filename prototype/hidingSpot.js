function HidingSpot(x, y) {
	var texture = PIXI.Texture.fromImage("trashcan.png");
	var new_hiding_spot = new PIXI.Sprite(texture);
	new_hiding_spot.hidingTexture = PIXI.Texture.fromImage("trashcanSoldier.png");
	new_hiding_spot.setInteractive(true);
	new_hiding_spot.position.x = x;
	new_hiding_spot.position.y = y;
	new_hiding_spot.anchor.x = .5;
	new_hiding_spot.anchor.y = .5;
	new_hiding_spot.hiding_soldier;
	new_hiding_spot.occupied = false;
	new_hiding_spot.points = 10;
	//arbitrary so far
	new_hiding_spot.mousedown = function(event) {
		if (new_hiding_spot.occupied) {
			//TODO: unhide doesn't work
			this.hiding_soldier.unhide();
			new_hiding_spot.occupied = false;
			this.setTexture(PIXI.Texture.fromImage("trashcan.png"));
		}
	};
	return new_hiding_spot;
}

function create_hiding_spot() {
	var trashCan = HidingSpot(100, 100);
	game.stage.addChild(trashCan);
	game.hiding_spots.push(trashCan);
}