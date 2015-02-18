

var window_width = 1200;
var window_height = 600;

var game = new Game()
var trashCan;
window.onload = function init()
{


  // Add the renderer view element to the
  // DOM
  document.body.appendChild(game.renderer.view);
  requestAnimFrame( animate );
  create_grid(game);
  init_game();

  var loop = 0, skipTicks = 1000/game.fps,
        maxFrameSkip = 10,
        nextGameTick = (new Date).getTime(),
        lastGameTick;

 var fpsmeter = new FPSMeter({decimals: 0, graph: true, theme: 'dark',heat:10, left: '1000px' });

 function animate() {
  loop = 0;
        while((new Date).getTime() > nextGameTick){
          fpsmeter.tickStart();
          game.update();
          nextGameTick += skipTicks;
          loop++;
           fpsmeter.tick();
        }
        if(loop) game.renderer.render(game.stage);
    requestAnimFrame( animate );
  }

  };

  function init_game() {
	//Create the first soldier
  for(var i = 0; i < 2; i++){
    create_civilian();
  }
	create_soldier();
	//The active soldier is the one soldier we just created
	game.active = game.soldiers[0];
	create_hiding_spot();
	create_alarm(300,300);
	create_wall(350,350);
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
			var xDistance = Math.abs(game.active.sprite.position.x - game.hiding_spots[i].position.x);
			var yDistance = Math.abs(game.active.sprite.position.y - game.hiding_spots[i].position.y);
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