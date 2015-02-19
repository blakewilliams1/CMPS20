function Wall(x,y){
  this.texture = PIXI.Texture.fromImage("../Art Assets/png/alarm.png");
  this.sprite = new PIXI.Sprite(this.texture);
  this.sprite.anchor.x = .5;
  this.sprite.anchor.y = .5;
  this.sprite.position.x = x;
  this.sprite.position.y = y;
  
  this.update = function() {
	
  }
  }
  
    function create_wall(x,y) {
	var wall = new Wall(x,y);
	game.stage.addChild(wall.sprite);
  }