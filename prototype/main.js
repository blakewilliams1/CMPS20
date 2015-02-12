
var game = new Game()
var trashCan;
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
    game.soldiers[i].update(game.active.sprite);
  }

  }

  function init_game() {
	//Create the first soldier
	create_soldier();
	//The active soldier is the one soldier we just created
	game.active = game.soldiers[0];
	create_hiding_spot();
  }
  
  function create_hiding_spot() {
	var trashCan = HidingSpot(100,100);
	game.stage.addChild(trashCan);
	game.hiding_spots.push(trashCan);
  }

  function create_soldier() {
  //create a texture from an image path
  var texture = PIXI.Texture.fromImage("soldier.png");
  //create a new Sprite using the texture. A Sprite is an actual game object.
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

  player.sprite = new_soldier;
  game.active = player;
  game.soldiers.push(player);
  ++game.soldier_count;


   game.stage.addChild(new_soldier);
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
	case 'E':
		for (var i = 0 ; i < game.hiding_spots.length ; i ++) {
			console.log(typeof(game.active.sprite));
			var xDistance = Math.abs(game.active.sprite.position.x - game.hiding_spots[i].position.x);
			var yDistance = Math.abs(game.active.sprite.position.y - game.hiding_spots[i].position.y);
			console.log(game.hiding_spots[i]);
			console.log(xDistance + " " + yDistance);
			if ( xDistance < 32 && yDistance < 32) {
				game.active.hide(game.hiding_spots[i]);
			}
		}
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