function Wall(x, y) {
	var texture = PIXI.Texture.fromImage("../Art Assets/png/shittyFence.png");
	var sprite = new PIXI.Sprite(texture);
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.position.x = x;
	sprite.position.y = y;
	sprite.width = 128;
	sprite.height = 32;
	sprite.update = function() {

	}
	return sprite;
}