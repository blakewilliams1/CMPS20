function Tile(x, y) {
	this.texture = PIXI.Texture.fromImage("../Art Assets/png/bg_tile.png");
	var sprite = new PIXI.Sprite(this.texture);
	sprite.anchor.x = .5;
	sprite.anchor.y = .5;
	sprite.position.x = x;
	sprite.position.y = y;
	sprite.width = 256;
    sprite.height = 256;
	sprite.update = function() {

	}
	return sprite;
}