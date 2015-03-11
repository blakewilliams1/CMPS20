function LevelBuilder(game){
	this.buildLevel=function(num){
		switch(num){
			case 0:this.buildLevelZero();break;
			case 1:this.buildLevelOne();break;
			case 2:this.buildLevelTwo();break;
			default: alert("Error with the levelBuilder! "+num+" is invalid.");
		}
	}

	this.buildLevelZero=function(){
		game.create_hiding_spot(map_width*9/10,map_height*8,"trashcan");
		game.create_building(map_width*6/10, map_height*4/7,"small");
		game.create_alarm(map_width/3,map_height/2);
		game.create_grid();
		game.create_civilian(100,100);
		game.create_soldier();
	}
	
	this.buildLevelOne=function(){
		game.create_building(90,300,"small");
		game.create_building(150,75,"small");
		game.create_building(220,470,"small");
		game.create_building(360,120,"small");
		game.create_building(440,420,"small");
		game.create_building(580,90,"small");
		game.create_building(780,150,"small");
		game.create_building(900,350,"small");
		game.create_building(1100,200,"small");

		game.create_hiding_spot(65,125,"bush");
		game.create_hiding_spot(290,180,"bush");
		game.create_hiding_spot(430,180,"bush");
		game.create_hiding_spot(360,470,"bush");
		game.create_hiding_spot(980,410,"bush");
		game.create_hiding_spot(980,120,"bush");

		game.create_hiding_spot(140,510,"trashcan");
		game.create_hiding_spot(225,120,"trashcan");
		game.create_hiding_spot(270,320,"trashcan");
		game.create_hiding_spot(700,190,"trashcan");

		game.create_hiding_spot(600,320,"bench");
		game.create_hiding_spot(800,215,"bench");
		game.create_hiding_spot(1000,255,"bench");

		game.create_hiding_spot(640,480,"well");

		game.create_alarm(399,300);

		game.create_grid();
		for (var i = 0; i < 5; i++) {
    	  var pos = position_list[Math.floor(Math.random() * position_list.length)]
          game.create_civilian(pos.x,pos.y);
		}
		game.create_soldier(2);
	}

	//----------------------------------

	this.buildLevelTwo=function(){
		game.create_hiding_spot(map_width*9/10,map_height*8,"trashcan");
		game.create_building(map_width*6/10, map_height*4/7,"small");
		game.create_alarm(map_width/3,map_height/2);
		game.create_grid();
		game.create_civilian(100,100);
		game.create_soldier();
	}

	//----------------------------------

	this.clearLevel=function(){
		game.container=new PIXI.DisplayObjectContainer();
		game.create_background();
	}
}