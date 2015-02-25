function Tile(x, y) {
	this.texture = PIXI.Texture.fromImage("../Art Assets/png/bg_tile.png");
	this.sprite = new PIXI.Sprite(this.texture);
	this.sprite.anchor.x = .5;
	this.sprite.anchor.y = .5;
	this.sprite.position.x = x;
	this.sprite.position.y = y;
	this.sprite.width = 256;
    this.sprite.height = 256;
	this.update = function() {

	}
}