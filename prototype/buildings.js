function Building(x, y, name) {
	var texture = PIXI.Texture.fromImage("../Art Assets/png/"+name+"Building.png");
	var sprite = new PIXI.Sprite(texture);
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.position.x = x;
	sprite.position.y = y;
	sprite.width = 128;
	sprite.height = 128;
	sprite.update = function() {

	}
	return sprite;
}