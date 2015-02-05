
var snake_obj;
var snake_head;
var food;
var walls;
var score;
var stage;
var d = "right"
var count;
var score;
var countingText;
var bitmapFontText;

window.onload = function init()
{
  //onAssetsLoaded()
  stage = new PIXI.Stage(0x66FF99);
  // create a renderer instance
  var view = document.getElementById("myCanvas")
  var renderer = new PIXI.CanvasRenderer(1000, 600,view);


  init_game();
  // create a texture from an image pat
  animate();

  function animate() {

      requestAnimFrame( animate );
      update();
      // render the stage
      renderer.render(stage);
    }

  };

  function restart(){
    countingText.setText("COUNT: " + 0);
    for (var i = stage.children.length - 1; i >= 0; i--) {
     stage.removeChild(stage.children[i]);
   }
    snake_obj =[]
    walls = []
    init_game();
    d = "right"
  }

  function add(){
   nx = food.position.x;
   ny = food.position.y;

   var snake_body_texture = PIXI.Texture.fromImage("http://people.ucsc.edu/~druiz4/body.png");
       var snake_body = new PIXI.Sprite(snake_body_texture);
       snake_body.anchor.x = 0.5;
       snake_body.anchor.y = 0.5;

       snake_body.position.x = nx
       snake_body.position.y = ny


       snake_body.height = 5;
       snake_body.width = 5;
       snake_obj.push(snake_body);
       stage.addChild(snake_body);

       console.log("added")
  }


   function check_collision(a,b){

      distx = (b.position.x) - a.position.x;

      if( distx > -b.width/2 && distx < b.width/2){
        disty = (b.position.y) - a.position.y;

       if( disty > -b.height/2 && disty < b.height/2){
         return true;
        }
      }
    return false;
   }

  function update(){
     check_apple();
     var index = snake_obj.length;
     var nx = snake_obj[index - 1].position.x;
     var ny = snake_obj[index - 1].position.y;

     if (d == "right") nx += 3;
     if (d == "left")  nx -= 3;
     if (d == "up")    ny -= 3;
     if (d == "down")  ny  += 3;

      var last = snake_obj[0];
      snake_obj.splice(0,1);

      last.position.x = nx;
      last.position.y = ny;
      snake_obj.push(last);
      if(nx <= -1 || ny <= -1 || nx >= 1000 || ny >= 600){
          restart();
          return
      }
      //add(nx,ny);
      a = snake_obj[index -1]
      if (check_collision(a,food)){
       console.log("added");
        add();
        food.position.x = Math.floor(Math.random() * 900 + 50);
        food.position.y = Math.floor(Math.random() * 500 + 50);
        score++;
        countingText.setText("COUNT: " + score);
      }
      check_snake();
      check_self();

  }



  function init_game(){
    snake_obj = [];
    walls = [];
    //stage.addChild(alienContainer)
    var apple_texture = PIXI.Texture.fromImage("http://people.ucsc.edu/~druiz4/golden-apple.png");

    for( var i = 1; i < 10; i++){
       var snake_body_texture = PIXI.Texture.fromImage("http://people.ucsc.edu/~druiz4/body.png");
       var snake_body = new PIXI.Sprite(snake_body_texture);
       snake_body.anchor.x = 0.5;
       snake_body.anchor.y = 0.5;
       snake_body.height = 5;
       snake_body.width = 5;
       snake_body.position.x = (i * 25);
       snake_body.position.y = 100;


       snake_obj.push(snake_body);
       stage.addChild(snake_body);
    }


    for(var i = 0; i < 15; i++){
       var snake_body_texture = PIXI.Texture.fromImage("http://people.ucsc.edu/~druiz4/body.png");
       var snake_body = new PIXI.Sprite(snake_body_texture);
       snake_body.anchor.x = 0.5;
       snake_body.anchor.y = 0.5;
       snake_body.height = Math.floor(Math.random() * 100 + 10);
       snake_body.width = Math.floor(Math.random() * 100 + 10);
       snake_body.position.x = Math.floor(Math.random() * 900 + 50);
       snake_body.position.y = Math.floor(Math.random() * 500 + 50);


       walls.push(snake_body);

       stage.addChild(snake_body);
    }

    food = new PIXI.Sprite(apple_texture);

     food.anchor.x = 0.5;
     food.anchor.y = 0.5;

     food.height = 25;
     food.width = 25;

     food.position.x = Math.floor(Math.random() * 900 + 50);
     food.position.y = Math.floor(Math.random() * 500 + 50);

     countingText = new PIXI.Text("COUNT: 0",{font:"50px Arial", fill:"red"});

     countingText.position.x = 150;
     countingText.position.y = 500;
     countingText.anchor.x = 0.5;
     count = 0;
     score = 0;
     stage.addChild(countingText);
     stage.addChild(food);
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
  }
}

   function check_apple(){
  for(var i = 0; i < walls.length - 1; i++){
       var current_wall = walls[i];
      if(check_collision(food,current_wall)){
        food.position.x = Math.floor(Math.random() * 900 + 50);
        food.position.y = Math.floor(Math.random() * 500 + 50);
      }
  }
}

function check_snake(){
  for(var i =0; i < walls.length -1; i++){
     var tail = snake_obj[snake_obj.length -1];

     if(check_collision(tail, walls[i])){
        restart();
     }
  }
}


function check_self(){
  for(var i =0; i < snake_obj.length -1; i++){
     var tail = snake_obj[snake_obj.length -1];

     if(check_collision(tail, snake_obj[i])){
        restart();
     }
  }
}

function onAssetsLoaded()
        {
            bitmapFontText = new PIXI.BitmapText("bitmap fonts are\n now supported!", {font: "35px Desyrel", align: "right"});
            bitmapFontText.position.x = 620 - bitmapFontText.width - 20;
            bitmapFontText.position.y = 20;
}

