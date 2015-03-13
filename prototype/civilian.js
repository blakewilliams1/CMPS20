
/*
 * This file holds the initializer and all the functions of the civilians
 */

//--------------------------------------------------------------------------------------


// initilize all the textures for the civilian


var rightText = [
    PIXI.Texture.fromImage("../Art Assets/png/UkraineRight1.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UnkraineRight2.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineRight3.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UnkraineRight4.png")
  ]

  var leftText = [
    PIXI.Texture.fromImage("../Art Assets/png/UkraineLeft1.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineLeft2.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineLeft3.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineLeft4.png")
  ]

  var upText = [
    PIXI.Texture.fromImage("../Art Assets/png/UkraineBack1.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineBack2.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineBack3.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineBack4.png")
  ]

  var downText = [
    PIXI.Texture.fromImage("../Art Assets/png/UkraineForward1.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineForward2.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineForward3.png"),
    PIXI.Texture.fromImage("../Art Assets/png/UkraineForward4.png")
  ]


var position_list = [{x:32,y:32}, {x:600,y:32}, {x:1100,y:32}, {x:32,y:300}, {x:600,y:300}, {x:1100,y:300}, {x:600,y:500}]
/*
 * this is the initilize function of the
 * civilian object
 */

 var steps = 2;
function Civilian(){
  this.sprite;
  this.soldierType=0;
  this.actions = ["north","south","east","west"];
  this.moves;
  this.knockedOut=false;
  this.animCounter = 0;
  this.animCounter2 = 0;

  this.goal; //{x:Math.floor(Math.random() * (map_width - 64)), y:Math.floor(Math.random() * (map_height - 64))};
  this.alarm;

  this.goal_list = [];

   //Math.floor(Math.random() * window_width)
  this.vision_distance = 100;
  this.vision_angle = 25;

  this.point1 = {};
  this.point2 = {};
 // console.log("angle ",this.vision_angle);

  this.at_goal = false;
  this.search_grid = [];
  this.found = false;
  this.count = 5;

  this.graphic = new PIXI.Graphics()

  this.pending = "none";
  this.pend = false;
  this.take = "none";

  this.position = {
      x:0,
      y:0
  }
  /*
   * this creates a list of moves that the civilian need take to
   * reach his goal
   */

//---------------------------------------------------------------------------------------

  this.update = function(grid,soldiers,walls,alarms){
       this.graphic.clear();

       if(this.knockedOut){

         //change image
         return;
       }

       this.center = {
       x:this.sprite.position.x,
       y:this.sprite.position.y
  }

        if((isGoal(this.center,this.goal)) && (this.found)){
            document.getElementById('alarm').play();
			closest_alarm(this.center,alarms).trigger();
			return;
		}
       this.at_goal = isGoal(this.center,this.goal)
       if(this.at_goal){
        this.find_path(grid);
       }else{
         this.moves = this.next_action(grid,this.goal,walls);
       }


     this.action(soldiers,walls,alarms);
  }

}


//----------------------------------------------------------------------------------------

Civilian.prototype  = {


      next_action:function(grid,goal,wall){

        var list = [];
        var current_pos = {
             x: this.sprite.position.x,
             y: this.sprite.position.y
         }
        for(var i = 0; i < this.actions.length; i++){
          var pos = generate_move(current_pos ,this.actions[i],grid,goal,wall);
             list.push([pos[0],this.actions[i],pos[1]]);
        }

        return this.closest_path(list,goal);
      },


//-----------------------------------------------------------------------------------------

    find_path: function(grid){
        var new_goal = this.goal_list[Math.floor(Math.random() * this.goal_list.length)];
         this.goal.x = new_goal.x;
         this.goal.y = new_goal.y;
    },

//-----------------------------------------------------------------------------------------

    scan_area: function(origin,x,y,soldiers,walls,alarms){

      for( var i = 0; i < soldiers.length; i++){
      var target = {
              x: soldiers[i].position.x,
              y: soldiers[i].position.y
      }

      var point = get_dist_point(origin,x,y);
       var b = rotate_point(point.x, point.y, origin.x, origin.y, -(this.vision_angle));
       var c = rotate_point(point.x, point.y, origin.x, origin.y, (this.vision_angle));

       this.graphic.clear();
       this.graphic.beginFill(0xFFFF00);
       this.graphic.alpha = .2
       this.graphic.moveTo(this.sprite.position.x,this.sprite.position.y);
       this.graphic.lineTo(b.x, b.y);
       this.graphic.lineTo(c.x, c.y);
       this.graphic.endFill();
       if((!soldiers[i].visible) || (!soldiers[i].out_of_spawn)) continue;
       if(in_triangle(target,origin,b,c)){
         var cent = origin;
         var line = getRay(cent,target);

        if(check_line(line,walls)){
          //do what ever
          this.found = true;
          this.pend = false;

          this.goal = {
           x: closest_alarm(origin,alarms).position.x,
           y: closest_alarm(origin,alarms).position.y
		  };

        }
      }
    }
  },

//----------------------------------------------------------------------------------------

    action: function(soldiers, walls,alarms){

      var move = this.moves;
    switch (move){
      case "east":
      if(!this.found)this.scan_area(this.center, this.vision_distance,0,soldiers,walls,alarms);

      this.sprite.setTexture(rightText[this.animCounter]);
      if (this.animCounter2++ % 10 == 0) ++this.animCounter;
      if (this.animCounter >= 4) this.animCounter = 0;

      this.sprite.position.x += steps;
    break;

    case "west":
    if(!this.found)this.scan_area(this.center, -(this.vision_distance),0,soldiers,walls,alarms);

     this.sprite.setTexture(leftText[this.animCounter]);
      if (this.animCounter2++ % 10 == 0) ++this.animCounter;
      if (this.animCounter >= 4) this.animCounter = 0;

    this.sprite.position.x -= steps;
    break;

    case "north":
    if(!this.found)this.scan_area(this.center, 0, -(this.vision_distance),soldiers,walls,alarms);

     this.sprite.setTexture(upText[this.animCounter]);
      if (this.animCounter2++ % 10 == 0) ++this.animCounter;
      if (this.animCounter >= 4) this.animCounter = 0;

    this.sprite.position.y -= steps;
    break;

    case "south":
    if(!this.found)this.scan_area(this.center, 0, this.vision_distance,soldiers,walls,alarms);

     this.sprite.setTexture(downText[this.animCounter]);
      if (this.animCounter2++ % 10 == 0) ++this.animCounter;
      if (this.animCounter >= 4) this.animCounter = 0;

    this.sprite.position.y += steps;
    break;
    }

  },



 closest_path: function(edge_list,goal){
  var best_value = 0;
  var best_path = [];
  var best_bool = false;

   if(this.pend){
    for(var i = 0; i < edge_list.length; i++){
        if(edge_list[i][1] == this.pending){
           if(edge_list[i][2]){
             return this.take;
           }else{
            this.pend = false;
            this.take = 'none';
            return this.pending;
           }
        }
      }
   }

  for(var i = 0; i < edge_list.length; i++){
    var value = (Math.abs(edge_list[i][0].x - goal.x) + Math.abs(edge_list[i][0].y - goal.y));


    if (best_value == 0) {
       best_value = value;
       best_path = edge_list[i][1];
       best_bool = edge_list[i][2];

   }else{
     if(value < best_value){
       best_value = value;
       best_path = edge_list[i][1];
       best_bool = edge_list[i][2];
          }
     }
  }

  if(best_bool){
    this.pending = best_path;
    this.pend =true;
    this.count = 5;
    this.take = choose_random_adj(best_path);
    best_path = this.take;
  }

  return best_path

   }


}

//------------------------------------------------------------------------------------

/*
 * function that returns the manhattan distance from the position to the goal.
 */

function heuristic(position,goal){
   var cost = (Math.abs(position[0] - goal.x) + Math.abs(position[1] - goal.y));
  return cost;
}


//-----------------------------------------------------------------------------------





function choose_random_adj(path){
  var flip = Math.floor(Math.random() * 2);
  switch (path){
      case "east":
    var option = ["north","south"];
    return option[flip];
    break;

    case "west":
    var option = ["north","south"];
    return option[flip];
    break;

    case "north":
    var option = ["west","east"];
    return option[flip];
    break;

    case "south":
    var option = ["west","east"];
    return option[flip];
    break;
    }

}


//-------------------------------------------------------

function check_line(line,walls){
  //console.log(line);
  for(var i = 0; i < line.length;i++){
     for( var j = 0; j < walls.length; j++){
        //console.log(line[i]);
        var x = line[i].x;
        var y = line[i].y;

        var width = walls[j].width/2
        var x_pos = walls[j].position.x

        if( (x <  x_pos + width) && (x > x_pos - width)){
          var height = walls[j].height/2;
          var y_pos = walls[j].position.y

          if( (y < y_pos + height) && (y > y_pos - height)){
            return false;
          }
        }
     }

  }
  return true;
}


//----------------------------------------


function closest_alarm(position,alarms){
  document.getElementById('hey').play();
  var closest = 100000000;
  var closest_alarm;
  var alarm;
  for (var i = 0; i < alarms.length; i++){
     var pos = {
           x: alarms[i].position.x,
           y: alarms[i].position.y
     };
     //console.log(pos);
     var value = (Math.abs(position.x - pos.x) + Math.abs(position.y - pos.y));
     if (value < closest){
        closest = value;
        closest_alarm = alarms[i];
     }
  }
  return closest_alarm;
}

