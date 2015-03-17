smallTile1 = PIXI.Texture.fromImage("../Art Assets/png/bg_tile1.png");
smallTile2 = PIXI.Texture.fromImage("../Art Assets/png/bg_tile2.png");
smallTile3 = PIXI.Texture.fromImage("../Art Assets/png/bg_tile3.png");

function Tile(x, y) {
	var newTile = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/bg_tile.png"));
	newTile.position.x = x;
    newTile.position.y = y;
    newTile.anchor.x = .5;
    newTile.anchor.y = -2;
    
    newTile.changeTexture1 = function() {
		var new_tex = smallTile1;
		this.setTexture(new_tex);
	};
    
    newTile.changeTexture2 = function() {
		var new_tex = smallTile2;
		this.setTexture(new_tex);
	};
    
    newTile.changeTexture3 = function() {
		var new_tex = smallTile3;
		this.setTexture(new_tex);
	};
    
	return newTile;
}