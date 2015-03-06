function Game_over(owner){
  this.owner=owner;
  this.view=owner.view;
  this.renderer=owner.renderer;
  this.stage = new PIXI.Stage(0xCCCCCC,true);

  this.update = function() {

  };

  this.drawGui=function(){

 }

  this.init_ = function() {
    var resume_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/newGameButton.png"));
    resume_button.setInteractive(true);
    resume_button.anchor.x = 0.5;
    resume_button.anchor.y = 0.5;
    resume_button.position.x = window_width/2;
    resume_button.position.y = window_height/2-32//resume_button.texture.height;
    console.log(resume_button.position.x, resume_button.position.y);
    resume_button.click=function(event){
      owner.signal_pop(1);
      owner.create_game_screen();
    }
    this.stage.addChild(resume_button);
    var quit_button = new PIXI.Sprite(PIXI.Texture.fromImage("../Art Assets/png/quitGameButton.png"));
    quit_button.setInteractive(true);
    quit_button.anchor.x = 0.5;
    quit_button.anchor.y = 0.5;
    quit_button.position.x = window_width/2;
    quit_button.position.y = window_height/2+32//quit_button.texture.height;
    quit_button.click=function(event){
      owner.signal_pop(1);
    }
    this.stage.addChild(quit_button);
    //initiate the gui
    this.drawGui();

  };
 }
