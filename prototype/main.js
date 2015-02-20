var window_width = 1200;
var window_height = 600;
var screenManager=[];
var game = new Game();
create_grid(game);
screenManager.push(game);
window.onload = function init() {
   game.init_game();
	// Add the renderer view element to the
	// DOM
	document.body.appendChild(game.renderer.view);
	requestAnimFrame(animate);

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
	screenManager[screenManager.length-1].keydown(event);
};

window.onkeyup = function(event) {
	screenManager[screenManager.length-1].keyup(event);
};