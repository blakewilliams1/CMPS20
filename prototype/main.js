
var window_width = 1184;
var window_height = 600;
var map_width = 1184;
var map_height = 800;

var half_x = Math.floor((map_width/32)/2);
var half_y = Math.floor((map_height/32)/2);
console.log(half_x,half_y);
var screenManager=[];
screenManager.view=document.getElementById("myCanvas");
screenManager.renderer= new PIXI.CanvasRenderer(window_width, window_height, screenManager.view);
//
window.onload = function init() {
	// Add the renderer view element to the
	// DOM
	screenManager.create_title_screen();
	document.body.appendChild(screenManager.renderer.view);
	requestAnimFrame(animate);
//temporarily commented out the FPS meter
/*	var loop = 0,
	    skipTicks = 1000 / game.fps,
	    maxFrameSkip = 10,
	    nextGameTick = (new Date).getTime(),
	    lastGameTick;
 */
	var fpsmeter = new FPSMeter({
		decimals : 0,
		graph : true,
		theme : 'dark',
		heat : 10,
		left : '1000px'
	});

	function animate() {
    fpsmeter.tickStart();
		/*loop = 0;
		while ((new Date).getTime() > nextGameTick) {
			fpsmeter.tickStart();

			nextGameTick += skipTicks;
			loop++;
			fpsmeter.tick();
		}
		if (loop)*/
		screenManager[screenManager.length-1].update();
		screenManager.renderer.render(screenManager[screenManager.length-1].stage);
		requestAnimFrame(animate);
    fpsmeter.tick();
    console.log(screenManager.length);
	}

};
screenManager.create_title_screen=function(){
	var titleScreen = new Title(screenManager);
	titleScreen.init_();
	this.push(titleScreen);
}
screenManager.create_game_screen=function(){
	var gameScreen = new Game(screenManager);
	gameScreen.init_();
	this.push(gameScreen);
}
screenManager.create_pause_menu=function(){
	var pauseScreen = new Pause(this);
	pauseScreen.init_();
	this.push(pauseScreen);
}
screenManager.signal_pop=function(pops){
	while(screenManager.length>1&&screenManager.length>pops){
    screenManager.pop();
  }
}
window.onkeydown = function(event) {
	screenManager[screenManager.length-1].keydown(event);
};
window.onkeyup = function(event) {
	screenManager[screenManager.length-1].keyup(event);
};