var window_width = 1200;
var window_height = 800;
var screenManager=new Array();

	var stage = new PIXI.Stage(0xCCCCCC,true);
 	var view = document.getElementById("myCanvas");
 	var renderer = new PIXI.CanvasRenderer(window_width, window_height, view);
var game = new Game(screenManager,stage,view,renderer);
game.init_();
screenManager.push(game);

window.onload = function init() {
	// Add the renderer view element to the
	// DOM
	document.body.appendChild(renderer.view);
	requestAnimFrame(animate);
//temporarily commented out the FPS meter
/*	var loop = 0,
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
	});*/

	function animate() {
		/*loop = 0;
		while ((new Date).getTime() > nextGameTick) {
			fpsmeter.tickStart();
			
			nextGameTick += skipTicks;
			loop++;
			fpsmeter.tick();
		}
		if (loop)*/
		screenManager[screenManager.length-1].update();
		screenManager[screenManager.length-1].renderer.render(screenManager[screenManager.length-1].stage);
		requestAnimFrame(animate);
	}

};

screenManager.create_pause_menu=function(){
	var pauseScreen = new Pause(this,stage,view,renderer);
	pauseScreen.init_();
	document.body.appendChild(pauseScreen.renderer.view);
	this.push(pauseScreen);
}
screenManager.signal_pop=function(){
	document.body.removeChild(screenManager[screenManager.length-1].renderer.view);
	screenManager.pop();
}
window.onkeydown = function(event) {
	screenManager[screenManager.length-1].keydown(event);
};

window.onkeyup = function(event) {
	screenManager[screenManager.length-1].keyup(event);
};