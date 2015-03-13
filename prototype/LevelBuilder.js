function LevelBuilder(game){
	this.buildLevel=function(num){
		switch(num){
			case 0:this.buildLevelZero();break;
			case 1:this.buildLevelOne();break;
			case 2:this.buildLevelTwo();break;
			case 3:this.buildLevelThree();break;
			default: alert("Error with the levelBuilder! "+num+" is invalid number.");
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
		game.level_spots = tutorial_locations;
		//game.create_civilian(100,100,tutorial_locations.one);
		//game.create_civilian(300,300,tutorial_locations.two);
		//game.create_civilian(300,300,tutorial_locations.zero);
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

		game.create_civilian(955,27,level_one[0]);
		game.create_civilian(976,211,level_one[1]);
		game.create_civilian(486,411,level_one[2]);
		game.create_civilian(43,373,level_one[3]);
		game.create_civilian(478,68,level_one[4]);
		game.create_civilian(500,239,level_one[5]);

		game.level_spots = level_one;

		game.create_grid();

		game.create_soldier(2);
	}

	//----------------------------------

	this.buildLevelTwo=function(){
		game.level_spots = level_two;
		game.create_building(1135,307,"small");
		game.create_building(955,463,"small");
		game.create_building(603,326,"small");
		game.create_building(746,584,"small");
		game.create_building(391,529,"small");
		game.create_building(140,120,"small");
		game.create_building(865,120,"small");
		game.create_building(1154,114,"small");
		game.create_building(186,354,"small");
		//game.create_building(591,259,"small");
		//game.create_building(780,135,"small");

		game.create_hiding_spot(730,455,"bush");
		game.create_hiding_spot(184,512,"bush");
		game.create_hiding_spot(148,246,"bush");
		//game.create_hiding_spot(360,470,"bush");
		///game.create_hiding_spot(980,450,"bush");
		//game.create_hiding_spot(980,120,"bush");

	   game.create_hiding_spot(561,543,"trashcan");
		 game.create_hiding_spot(1005,125,"trashcan");
		//game.create_hiding_spot(270,320,"trashcan");
		//game.create_hiding_spot(677,391,"trashcan");

		game.create_hiding_spot(720,320,"bench");
		game.create_hiding_spot(341,166,"bench");
		game.create_hiding_spot(652,100,"bench");

		game.create_hiding_spot(400,300,"well");

		game.create_alarm(800,400);
		game.create_alarm(50,520);
		game.create_alarm(500,100);

		game.create_civilian(1054,531,level_two[0]);
		game.create_civilian(916,547,level_two[1]);
		game.create_civilian(875,280,level_two[2]);
		game.create_civilian(329,222,level_two[3]);
		game.create_civilian(88,471,level_two[4]);
		game.create_civilian(38,41,level_two[5]);
		game.create_civilian(426,55,level_two[6]);
		game.create_civilian(752,31,level_two[7]);
		game.create_civilian(435,437,level_two[8]);

		game.create_grid();

		game.create_soldier(2);

	}

	//----------------------------------
	
	this.buildLevelThree=function(){
		game.create_building(300,90,"small");
		

		game.create_hiding_spot(65,125,"bush");
		

		game.create_hiding_spot(140,510,"trashcan");
		
		game.create_hiding_spot(600,122,"bench");
		
		game.create_hiding_spot(800,300,"well");

		game.create_alarm(800,400);

		game.create_civilian(955,27,level_one[0]);
		game.create_civilian(976,211,level_one[1]);
		game.create_civilian(486,411,level_one[2]);


		game.level_spots = level_one;

		game.create_grid();

		game.create_soldier(2);
	}
	
	this.clearLevel=function(){
		game.container=new PIXI.DisplayObjectContainer();
		game.create_background();
	}
}