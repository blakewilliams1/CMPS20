function HidingSpot(x, y) {
	var new_hiding_spot = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/trashcan.png"));
	new_hiding_spot.emptyTexture=PIXI.Texture.fromImage("../Art Assets/png/trashcan.png");
	new_hiding_spot.hidingTexture = PIXI.Texture.fromImage("../Art Assets/png/trashcanSoldier.png");
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
			this.hiding_soldier.unhide();
			new_hiding_spot.occupied = false;
			this.setTexture(new_hiding_spot.emptyTexture);
		}
	};
	return new_hiding_spot;
}