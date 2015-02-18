
var game = new Game()
window.onload = function init()
{

  // Add the renderer view element to the
  // DOM
  document.body.appendChild(game.renderer.view);
  requestAnimFrame( animate );

  init_game();

  function animate() {
	requestAnimFrame( animate );
	update();
	//render the stage
	game.renderer.render(game.stage);
  }

  };

  function update() {
	for(var i = 0; i < game.soldiers.length; i++){
    game.soldiers[i].update(game.active.image);
  }

  }

  function init_game() {
	create_soldier();
	create_building();
	game.active = game.soldiers[0];
  }

  function create_soldier(soldiers) {
  //create a texture from an image path
  var texture = PIXI.Texture.fromImage("soldier.png");
  //create a new Sprite using the texture
  var new_soldier = new PIXI.Sprite(texture);

  var player = new Player(new_soldier);

  //center the sprite's anchor point and position
  new_soldier.anchor.x = .5;
  new_soldier.anchor.y = .5;
  new_soldier.position.x = 900;
  new_soldier.position.y = 550;
  new_soldier.gridSize=4;
  new_soldier.setInteractive(true);
  new_soldier.mousedown = function (event) {
	game.active = player;
  }

  player.image = new_soldier;
  game.active = player;
  game.soldiers.push(player);
  ++game.soldier_count;


   game.stage.addChild(new_soldier);
  }
  
  function create_building(buildings) {
  //create a texture from an image path
  var texture = PIXI.Texture.fromImage("building.png");
  //create a new Sprite using the texture
  var new_building = new PIXI.Sprite(texture);

  //var player = new Player(new_soldier);

  //center the sprite's anchor point and position
  new_building.anchor.x = .5;
  new_building.anchor.y = .5;
  new_building.position.x = 500;
  new_building.position.y = 500;
  new_building.gridSize=4;
  //new_building.setInteractive(true);
   game.stage.addChild(new_building);
  }

  window.onkeydown = function(event) {
  var key = String.fromCharCode(event.keyCode);
  switch (key){
    case 'W':
         game.active.direction = "up"
      break;

    case 'A':
         game.active.direction ="left"
      break;

    case 'S':
        game.active.direction = "down"
      break;

    case 'D':
          game.active.direction = "right"
      break;

	case 'F':
		create_soldier(game.soldiers);
		break;
  }
}

 window.onkeyup = function(event) {
  var key = String.fromCharCode(event.keyCode);
  switch (key){
    case 'W':
      game.active.direction = "none";
      break;

    case 'A':
      game.active.direction = "none";
      break;

    case 'S':
      game.active.direction = "none";
      break;

    case 'D':
      game.active.direction = "none";
      break;
  }
}