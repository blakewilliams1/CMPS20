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
		game.create_hiding_spot(300,227,"trashcan");
		game.create_hiding_spot(800,227, "trashcan");
		game.create_building(300, 550,"small");
		game.create_building(960, 454,"small");
		game.create_building(960, 227,"small");


		game.create_alarm(map_width/2,map_height/2);
		game.create_grid();
		game.create_civilian(100,100,tutorial_locations.one);
		game.create_civilian(300,300,tutorial_locations.two);
		game.create_civilian(300,300,tutorial_locations.zero);
		game.create_soldier();
	}

	this.buildLevelOne=function(){
		game.create_building(300,90,"small");
		game.create_building(75,250,"small");
		game.create_building(1098,300,"small");
		game.create_building(1098,100,"small");
		game.create_building(1098,470,"small");
		game.create_building(1220,470,"small");
		game.create_building(900,580,"small");
		game.create_building(600,520,"small");
		game.create_building(300,520,"small");
		game.create_building(591,259,"small");
		game.create_building(780,135,"small");

		game.create_hiding_spot(65,125,"bush");
		game.create_hiding_spot(290,180,"bush");
		game.create_hiding_spot(430,180,"bush");
		game.create_hiding_spot(360,470,"bush");
		game.create_hiding_spot(980,450,"bush");
		game.create_hiding_spot(980,120,"bush");

		game.create_hiding_spot(140,510,"trashcan");
		game.create_hiding_spot(225,120,"trashcan");
		game.create_hiding_spot(270,320,"trashcan");
		game.create_hiding_spot(677,391,"trashcan");

		game.create_hiding_spot(780,250,"bench");
		game.create_hiding_spot(600,122,"bench");
		//game.create_hiding_spot(1000,255,"bench");

		game.create_hiding_spot(400,300,"well");

		game.create_alarm(800,400);
		game.create_alarm(50,520);
		game.create_alarm(500,100);

		game.create_civilian(955,27,level_one.zero);
		game.create_civilian(976,211,level_one.one);
		game.create_civilian(486,411,level_one.two);
		game.create_civilian(43,373,level_one.three);
		game.create_civilian(478,68,level_one.four);
		game.create_civilian(500,239,level_one.five);

		game.create_grid();

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