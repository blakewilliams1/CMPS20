var stage;
var soldier_count;
var d = "none";
var soldiers = [];
var current_soldier;

window.onload = function init()
{
  // The pixi.js stage represents the root of
  // our display tree. Can be rendered by one
  // of the pixi.js renderers.
  stage = new PIXI.Stage(0x66FF99,true);
  
  // Create a renderer instance.
  // We choose Canvas and not webGL.
  var view = document.getElementById("myCanvas")
  var renderer = new PIXI.CanvasRenderer(1000, 600,view);
  
  // Add the renderer view element to the
  // DOM
  document.body.appendChild(renderer.view);
  
  requestAnimFrame( animate );
  
  init_game();
  
  function animate() {
	requestAnimFrame( animate );
	update();
	//render the stage
	renderer.render(stage);
  }

  };
  
  function update() {
	//Player motion: Checking and execution
	switch (d){
    case "right":
      current_soldier.position.x += 4;
      break;

    case "left":
      current_soldier.position.x -= 4;
      break;

    case "up":
      current_soldier.position.y -= 4;
      break;

    case "down":
      current_soldier.position.y += 4;
      break;
  }

  }
  
  function init_game() {
	create_soldier(soldiers);
	current_soldier = soldiers[0];
  }
  
  function create_soldier(soldiers) {
  //create a texture from an image path
  var texture = PIXI.Texture.fromImage("soldier.png");
  //create a new Sprite using the texture
  var new_soldier = new PIXI.Sprite(texture);
  
  //center the sprite's anchor point and position
  new_soldier.anchor.x = .5;
  new_soldier.anchor.y = .5;
  new_soldier.position.x = 900;
  new_soldier.position.y = 550;
  new_soldier.gridSize=4;
  new_soldier.setInteractive(true);
  new_soldier.mousedown = function (event) {
	current_soldier = new_soldier;
  }
  current_soldier = new_soldier;
  soldiers.push(new_soldier);
  ++soldier_count;
  
  
  stage.addChild(new_soldier);
  }
  
  window.onkeydown = function(event) {
  var key = String.fromCharCode(event.keyCode);
  switch (key){
    case 'W':
      if(d != "down")
         d = "up"
      break;

    case 'A':
       if(d != "right")
         d ="left"
      break;

    case 'S':
      if(d != "up")
        d = "down"
      break;

    case 'D':
        if(d != "left")
          d = "right"
      break;
	
	case 'F':
		create_soldier(soldiers);
		break;
  }
}

 window.onkeyup = function(event) {
  var key = String.fromCharCode(event.keyCode);
  switch (key){
    case 'W':
      d = "none";
      break;

    case 'A':
      d = "none";
      break;

    case 'S':
      d = "none";
      break;

    case 'D':
      d = "none";
      break;
  }
}