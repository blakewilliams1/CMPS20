
/*
 * This file holds the initializer and all the functions of the civilians
 */

//--------------------------------------------------------------------------------------

/*
 * this is the initilize function of the
 * civilian object
 */

 var steps = 3;
function Civilian(){
  this.sprite;
  this.actions = ["north","south","east","west"];
  this.moves;

  this.goal = {x:1100, y:600};

   //Math.floor(Math.random() * window_width)
  this.vision_distance = 200;
  this.vision_angle = 45;
 // console.log("angle ",this.vision_angle);

  this.at_goal = false;
  this.search_grid = [];
  this.spotted = false;
  this.count = 5;

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

  this.update = function(grid,soldiers,walls){

       this.center = {
       x:this.sprite.position.x,
       y:this.sprite.position.y
  }
       this.at_goal = isGoal(this.center,this.goal)
       if(this.at_goal){
        this.find_path(grid);
       }else{
         this.moves = this.next_action(grid,this.goal,walls);
       }



     this.action(soldiers);
     //console.log(this.sprite.position.x, this.sprite.position.y);

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
          var pos = generate_move(current_pos,this.actions[i],grid,goal,wall);
             list.push([pos[0],this.actions[i],pos[1]]);
        }

        return this.closest_path(list,goal);
      },


//-----------------------------------------------------------------------------------------

    find_path: function(grid){

         this.goal.x = Math.floor(Math.random() * (map_width - 64));
         this.goal.y = Math.floor(Math.random() *  (map_height - 64));
         //this.moves = this.A_star(grid);
    },

//-----------------------------------------------------------------------------------------

    scan_area: function(origin,x,y,soldiers){
      for( var i = 0; i < soldiers.length; i++){
      var target = {
              x: soldiers[i].position.x,
              y: soldiers[i].position.y
      }

      var point = get_dist_point(origin,x,y);
      var b = rotate_point(point.x, point.y, origin.x, origin.y, -(this.vision_angle));
      var c = rotate_point(point.x, point.y, origin.x, origin.y, (this.vision_angle));

      if(in_triangle(target,origin,b,c)){
        var line = getRay(origin,target);

        if(true){
          //do what ever
          console.log("found");
        }

      }
    }
  },

//----------------------------------------------------------------------------------------

    action: function(soldiers){

      var move = this.moves;
    switch (move){
      case "east":
    this.scan_area(this.center, this.vision_distance,0,soldiers);
    this.sprite.position.x += steps;
    break;

    case "west":
    this.scan_area(this.center, -(this.vision_distance),0,soldiers);
    this.sprite.position.x -= steps;
    break;

    case "north":
    this.scan_area(this.center, 0, -(this.vision_distance),soldiers);
    this.sprite.position.y -= steps;
    break;

    case "south":
    this.scan_area(this.center, 0, this.vision_distance,soldiers);
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
            return this.pending;
           }
        }
    }
   }
  //var index = Math.floor(Math.random()*edge_list.length)

  for(var i = 0; i < edge_list.length; i++){
     //if(edge_list[i][2]) continue;
    var value = (Math.abs(edge_list[i][0].x - goal.x) + Math.abs(edge_list[i][0].y - goal.y));


    if (best_value == 0) {
       best_value = value;
       best_path = edge_list[i][1];
       console.log("this is best", edge_list[i][2]);
       best_bool = edge_list[i][2];

   }else{
     if(value < best_value){
       best_value = value;
       best_path = edge_list[i][1];
       console.log("this is best", edge_list[i][2]);
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


