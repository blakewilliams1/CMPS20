/*
  * This file holds functions like creating a game object and game object
  * function
  */

 //create an instance of the game

 var mouse_location = {
 	      x: 0,
 	      y: 0
 }
function Tutorial(owner){
	this.level=new Game(owner,0);
	this.stage=this.level.stage;
 }

//-------------------------------------------------

Tutorial.prototype = {
	create_grid: function(){
		for (var i = 16; i < map_width; i += 32) {
			var list = [];
			for(var j = 16; j < map_height - 60; j += 32) {
				var tile = new Grid_Tile();
				tile.x = i;
				tile.y = j;
				tile.width = 32;
				tile.free = check_walls(tile.x, tile.y, this.walls);
				list.push(tile);
				}
			this.grid.push(list);
		}
	}
};


