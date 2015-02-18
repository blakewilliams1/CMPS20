/*
 * This file holds functions like creating a game object and game object
 * function
 */


 /*
  * create an instance of the game
  */

var window_width = 1200;
var window_height = 600;
var angle = Math.PI/2;

function Game(){
    // The pixi.js stage represents the root of
   // our display tree. Can be rendered by one
  // of the pixi.js renderers.
    this.stage = new PIXI.Stage(0xCCCCCC,true);

  console.log("origin", [600,300]);
  console.log("start point ", [600,100]);

  var new_point = get_view_points([600,100],[600,300]);


  console.log("new point ", new_point);

     // Create a renderer instance.
    // We choose Canvas and not webGL.
    this.view = document.getElementById("myCanvas");
    this.renderer = new PIXI.CanvasRenderer(window_width,window_height,this.view);

    console.log(window_width);
    console.log(window_height);

    /*
    * initilize the soliders and enemies array to zero
    */

    this.soldiers = [];
    this.soldier_count = 0;
	this.hiding_spots = [];
	this.walls = [];
    this.enemies = [];
    this.objects = [];
    this.grid = [];
    this.active;

    this.fps = 60;

    this.update = function() {
        game.active.update();
      for(var i = 0; i < game.enemies.length; i++){
            this.enemies[i].update()
          }
     };
 }


function Tile(){
   this.x;
   this.y;
   this.width;
   this.free;
 }

 function create_grid(game){
   for(var i = 4; i < window_width; i += 8){
      var list = [];
      for(var j = 4; j < window_height; j += 8){
        var tile = new Tile();
        tile.x = i;
        tile.y = j;
        tile.width = 4;
        tile.free = false;
        list.push(tile);
      }
      game.grid.push(list);
   }
 }