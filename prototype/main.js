
var window_width = 1280;
var window_height = 680;
var map_width = 1280;
var map_height = 680;
var music;

var half_x = Math.floor(map_width/64);
var half_y = Math.floor(map_height/64);
var screenManager=[];
screenManager.view=document.getElementById("myCanvas");
screenManager.renderer= new PIXI.CanvasRenderer(window_width, window_height, screenManager.view);
//
window.onload = function init() {
	// Add the renderer view element to the
	// DOM
	screenManager.create_cut_screen();
	document.body.appendChild(screenManager.renderer.view);
	requestAnimFrame(animate);


	function animate() {
		screenManager[screenManager.length-1].update();
		screenManager.renderer.render(screenManager[screenManager.length-1].stage);
		requestAnimFrame(animate);
	}

};


screenManager.create_title_screen=function(){
	var titleScreen = new Title(screenManager);
	titleScreen.init_();
	this.push(titleScreen);
}
screenManager.create_game_screen=function(level_number){
	var gameScreen = new Game(screenManager,level_number);
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

screenManager.create_cut_screen = function() {
	var scene = new cutScreen(screenManager);
	scene.init_();
	this.push(scene);
}
screenManager.create_level_screen=function(){
	var levelScreen = new Levels(screenManager);
	levelScreen.init_();
	this.push(levelScreen);
}
screenManager.create_tutorial_screen=function(){
	var tutScreen = new Tutorial(screenManager);
	tutScreen.level.init_();
	tutScreen.init_tutorial_specific();
	this.push(tutScreen);
}
screenManager.create_easter_screen=function(){
	var easterScreen = new Easter(screenManager);
	easterScreen.init_();
	this.push(easterScreen);
}
screenManager.signal_pop=function(){
	if(screenManager.length>1){
		var oldStage = screenManager[screenManager.length-1].stage
		while(oldStage.children>1){
			oldStage.removeChildAt(0);
		}
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
	//console.log("mouse location", mouse_location);
}