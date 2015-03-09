function Game_over(owner){
 var menu = new PIXI.DisplayObjectContainer();
  menu.owner=owner;

  menu.init_ = function() {
    var level_button= new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/levelSelectButton.png"));
    level_button.setInteractive(true);
    level_button.anchor.x = 0.5;
    level_button.anchor.y = 0.5;
    level_button.position.x = window_width/2;
    level_button.position.y = window_height/2
    level_button.click=function(event){
      owner.create_level_screen();
    }
    menu.addChild(level_button);
    var quit_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/quitGameButton.png"));
    quit_button.setInteractive(true);
    quit_button.anchor.x = 0.5;
    quit_button.anchor.y = 0.5;
    quit_button.position.x = window_width/2;
    quit_button.position.y = window_height/2+50
    quit_button.click=function(event){
      owner.signal_pop();
      owner.signal_pop();
    }
    menu.addChild(quit_button);
  };
  return menu;
 }
