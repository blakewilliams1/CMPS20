var window_width = 1200;
var window_height = 600;

var game = new Game();
game.init_game();
window.onload = function init() {

	// Add the renderer view element to the
	// DOM
	document.body.appendChild(game.renderer.view);
	requestAnimFrame(animate);
	create_grid(game);
	

	var loop = 0,
	    skipTicks = 1000 / game.fps,
	    maxFrameSkip = 10,
	    nextGameTick = (new Date).getTime(),
	    lastGameTick;

	var fpsmeter = new FPSMeter({
		decimals : 0,
		graph : true,
		theme : 'dark',
		heat : 10,
		left : '1000px'
	});

	function animate() {
		loop = 0;
		while ((new Date).getTime() > nextGameTick) {
			fpsmeter.tickStart();
			game.update();
			nextGameTick += skipTicks;
			loop++;
			fpsmeter.tick();
		}
		if (loop)
			game.renderer.render(game.stage);
		requestAnimFrame(animate);
	}

};


window.onkeydown = function(event) {
	var key = String.fromCharCode(event.keyCode);
	switch (key) {
	case 'W':
		game.active.direction = "up";
		break;

	case 'A':
		game.active.direction = "left";
		break;

	case 'S':
		game.active.direction = "down";
		break;

	case 'D':
		game.active.direction = "right";
		break;

	case 'F':
		game.create_soldier();
		break;
	case 'E':
		game.hide_active_soldier();
		break;
	}
};

window.onkeyup = function(event) {
	var key = String.fromCharCode(event.keyCode);
	switch (key) {
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
}; 