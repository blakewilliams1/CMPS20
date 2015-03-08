function LevelBuilder(game){
	this.buildLevel=function(num){
		switch(num){
			case 1:this.buildLevelOne();break;
			case 2:this.buildLevelTwo();break;
			default: alert("Error with the levelBuilder! "+num+" is invalid.");
		}
	}
	
	this.buildLevelOne=function(){
		game.create_hiding_spot(map_width*9/10,map_height*1/10,"trashcan");
		game.create_hiding_spot(map_width*6/10, map_height*1/8,"trashcan");
		//Street 1
		game.create_building(map_width*6/10, map_height*1/4);
		game.create_building(map_width*15/20, map_height*1/4);
		//Street 2
		game.create_building(map_width*6/10, map_height*4/7);
		game.create_building(map_width*8/10, map_height*4/7);
		//Second row of hiding spots.
		game.create_hiding_spot(map_width*5/10,map_height*4/7,"trashcan");
		game.create_hiding_spot(map_width*9/10,map_height*4/7,"trashcan");
		//Lower left hand hiding spot.
		game.create_hiding_spot(map_width*1/20,map_height*9/10,"trashcan");
		//Upper left hand hiding spots.
		game.create_hiding_spot(map_width*1/10, map_height*1/3,"trashcan");
		game.create_hiding_spot(map_width*1/20,map_height*1/10,"bush");
		game.create_hiding_spot(map_width*1/4,map_height*1/3,"bench");
		game.create_hiding_spot(map_width*1/4,map_height*1/10,"pond");
		//Wallz
		for (var i = 0; i <= map_height ; i+=32){
			if (i < 1/3*map_height || i > 2/3*map_height)
				game.create_wall(map_width*3/8, i);
		}
		//Alarm
		game.create_alarm(map_width/3,map_height/2);
		game.create_grid();

		for (var i = 0; i < 5; i++) {
    	  var pos = position_list[Math.floor(Math.random() * position_list.length)]
          game.create_civilian(pos.x,pos.y);
		}
		game.create_soldier(1);
	}
	
	//----------------------------------
	
	this.buildLevelTwo=function(){
		game.create_hiding_spot(map_width*9/10,map_height*8,"trashcan");
		game.create_building(map_width*6/10, map_height*4/7);
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