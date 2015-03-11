function HidingSpot(x,y,tex) {
	var new_hiding_spot = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/"+tex+".png"));
	new_hiding_spot.emptyTexture=PIXI.Texture.fromImage("../Art Assets/png/"+tex+".png");
	new_hiding_spot.setInteractive(true);
	new_hiding_spot.base_tex=tex;
	new_hiding_spot.position.x = x;
	new_hiding_spot.position.y = y;
	new_hiding_spot.anchor.x = .5;
	new_hiding_spot.anchor.y = .5;
	new_hiding_spot.hiding_soldier;
	new_hiding_spot.occupied = false;
	new_hiding_spot.points = 10;
	new_hiding_spot.changeTexture = function(type) {
		var tex_name;
		if(type==2)tex_name= new_hiding_spot.base_tex+"Occupied1";
		else tex_name = new_hiding_spot.base_tex+"Occupied"+type.toString();
		var new_tex = PIXI.Texture.fromImage("../Art Assets/png/"+tex_name+".png");
		this.setTexture(new_tex);
	};
	new_hiding_spot.mousedown = function(event) {
		if (new_hiding_spot.occupied) {
			this.hiding_soldier.unhide();
			new_hiding_spot.occupied = false;
			this.setTexture(new_hiding_spot.emptyTexture);
		}
	};

	new_hiding_spot.graphic = new PIXI.Graphics();
	new_hiding_spot.graphic.moveTo(x,y);
	new_hiding_spot.graphic.lineStyle(3, 0x0000FF, .3);
	//console.log(new_hiding_spot.texture.width);
	new_hiding_spot.graphic.drawCircle(x ,y, 60);

	return new_hiding_spot;
}