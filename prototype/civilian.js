
/*
 * This file holds the initializer and all the functions of the civilians
 */

//----------------------------------------------------------------------------

/*
 * this is the initilize function of the
 * civilian object
 */

 var steps = 25;
function Civilian(){
  this.sprite;
  this.actions = ["north","south","east","west"];
  this.moves = [];

  this.goal = {"x":50, "y":50};

   //Math.floor(Math.random() * window_width)
  this.vision_distance = 200;
  this.vision_angle = 45;
 // console.log("angle ",this.vision_angle);

  this.at_goal = false;
  this.search_grid = [];
  this.spotted = false;

  this.position = {
      x:0,
      y:0
  }
  /*
   * this creates a list of moves that the civilian need take to
   * reach his goal
   */

    this.loop = 0;
    this.skipTicks = 1000 / 30;
    this.maxFrameSkip = 10;
    this.nextGameTick = (new Date).getTime();
    this.lastGameTick;

  this.update = function(grid,soldiers){

    while ((new Date).getTime() > this.nextGameTick) {

       this.center = {
       x:this.sprite.position.x,
       y:this.sprite.position.y
  }
     if((this.at_goal)){
        this.at_goal = false;
        this.find_path(grid);
      }else{

     if(this.moves.length == 0){
         this.at_goal =true;
        //this.moves = this.A_star(grid);
        return;
     }

     this.action(soldiers);
     //console.log(this.sprite.position.x, this.sprite.position.y);
  }

      this.nextGameTick += this.skipTicks;
    }

  }

}


//-----------------------------------------------------------------------------------

Civilian.prototype  = {
    A_star: function(grid){
          var sub_grid = create_sub_grid(this.sprite.position,grid);
          var frontier = new PriorityQueue();
          var visited = [];
          var moves = [];
          var edge_list = [];
          var start = {
                   x: this.sprite.position.x,
                   y: this.sprite.position.y
             };

          var grid_loc = get_new_position(this.sprite,grid);
          console.log("this is grid_loc", grid_loc);
          if(isGoal(start, this.goal)) {
              return moves;
              }

          frontier.enqueue([start,moves,0],1);
          var count = 0;
          while(!frontier.isEmpty()){
                var current_state = frontier.dequeue();
                var current_pos = current_state[0];
                var path = current_state[1];
                var cost = current_state[2];
                if(inArray(current_pos,visited)){
                  continue;
                }

                visited.push(current_pos);

                if(isGoal(current_pos, this.goal)){
                    this.position = current_pos;
                    //this.at_goal = true;
                    return path;
                      }
              count++
                for(var i = 0; i < this.actions.length; i++){
                var action = this.actions[i];
                var result = generate_move(current_pos,action,grid);

                if(result[1]){
                  var next_pos = result[0]
                  var new_path = add_action(path,action);
                  var new_cost = cost + 8;
                  var priority = 8 + heuristic(next_pos,this.goal);
                   if(on_edge(next_pos,sub_grid)){
                      edge_list.push([next_pos,new_path]);
                   }
                  frontier.enqueue([next_pos,new_path,new_cost],priority);
                }
              }

          }


      console.log("done");
      var new_list = closest_path(edge_list,this.goal);
      this.position = new_list[0];
      return new_list[1];
    },


    find_path: function(grid){

         this.goal.x = Math.floor(Math.random() * window_width);
         this.goal.y = Math.floor(Math.random() * window_height);
         this.moves = this.A_star(grid);
         this.at_goal = false;
    },

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


    action: function(soldiers){

      var move = this.moves.shift();
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



function closest_path(edge_list,goal){
  var best_value = 100000000;
  var best_path = [];

  for(var i = 0; i < edge_list.length; i++){
    var value = (Math.abs(edge_list[i][0].x - goal.x) + Math.abs(edge_list[i][0].y - goal.y));

    if(value < best_value){
       best_value = value;
       best_path = edge_list[i];
    }
  }
  return best_path;
}


