
var window_width = 1184;
var window_height = 600;
var map_width = 1184;
var map_height = 600;

var half_x = Math.floor((map_width/32)/2);
var half_y = Math.floor((map_height/32)/2);
var screenManager=[];
screenManager.view=document.getElementById("myCanvas");
screenManager.renderer= new PIXI.CanvasRenderer(window_width, window_height, screenManager.view);
//
window.onload = function init() {
	// Add the renderer view element to the
	// DOM
	screenManager.create_title_screen();
	document.body.appendChild(screenManager.renderer.view);

	console.log(document.body)
	requestAnimFrame(animate);

	var fpsmeter = new FPSMeter({
		decimals : 0,
		graph : true,
		theme : 'dark',
		heat : 10,
		left : '1000px'
	});

	function animate() {
		fpsmeter.tickStart();
		screenManager[screenManager.length-1].update();
		screenManager.renderer.render(screenManager[screenManager.length-1].stage);
		requestAnimFrame(animate);
		fpsmeter.tick();
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
screenManager.create_credits_screen=function(){
	var creditScreen = new Credits(screenManager);
	creditScreen.init_();
	this.push(creditScreen);
}
screenManager.create_game_over = function(){
 var gameOver = new Game_over(screenManager);
 gameOver.init_();
 this.push(gameOver);
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

window.onmousemove = function(evt){
	var rect = screenManager.renderer.view.getBoundingClientRect();
	mouse_location = {
	 	        x:evt.clientX - rect.left,
	 	        y:evt.clientY - rect.top
	 	      }
}