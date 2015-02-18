
/*
 * This file holds the initializer and all the functions of the civilians
 */

//----------------------------------------------------------------------------

/*
 * this is the initilize function of the
 * civilian object
 */

 var steps = 2;
function Civilian(){
  this.sprite;
  this.actions = ["north","south","east","west"];
  this.moves = [];
  this.goal = {"x":Math.floor(Math.random() * window_width), "y":Math.floor(Math.random() * window_height)};
  this.vision_distance = 15;
  this.vision_angle = (Math.PI/2);
  console.log("angle ",this.vision_angle);
  this.at_goal = false;
  this.search_grid = []
  this.spotted = false;
  /*
   * this creates a list of moves that the civilian need take to
   * reach his goal
   */

  this.update = function(){
     if(this.at_goal){
        var location = [this.sprite.position.x, this.sprite.position.y];
        var position = location_in_grid(location,game.grid);
        this.goal.x = Math.floor(Math.random() * window_width);
        this.goal.y = Math.floor(Math.random() * window_height);
        this.moves = this.A_star(game.grid);
        this.at_goal = false;
      }else{

     if(this.moves.length == 0){
        this.at_goal = true;
        return;
     }
      var move = this.moves.shift();
    switch (move){
      case "east":
    this.sprite.position.x += steps;
    break;

    case "west":
    this.sprite.position.x -= steps;
    break;

    case "north":
    this.sprite.position.y -= steps;
    break;

    case "south":
    this.sprite.position.y += steps;
    break;
    }
  }

  }
}

//------------------------------------------------------------------------------

/*
 * this function creates a new civilian and the texture for that civilian
 */

function create_civilian(){

  var civilian = new Civilian();

  var texture = PIXI.Texture.fromImage("../Art Assets/png/Ukraine1.png");
  var sprite = new PIXI.Sprite(texture);

  sprite.anchor.x = sprite.anchor.y =.5;

  sprite.position.x = game.grid[75][0].x;
  sprite.position.y = game.grid[0][45].y;

  civilian.sprite = sprite;
  game.enemies.push(civilian);
  var location = [sprite.position.x,sprite.position.y];
  var position = location_in_grid(location,game.grid);
  civilian.moves = civilian.A_star(game.grid)
  game.stage.addChild(sprite);
}


//-----------------------------------------------------------------------------------

Civilian.prototype  = {
    A_star: function(grid){
          var frontier = new PriorityQueue();
          var visited = [];
          var moves = [];
          var start = [this.sprite.position.x, this.sprite.position.y];

          if(isGoal(start,this.goal)) {
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

                if(isGoal(current_pos,this.goal)){
                    return path;
                      }
              count++
                for(var i = 0; i < this.actions.length; i++){
                var action = this.actions[i];
                var result = generate_move(current_pos,action,grid);
                if(result[1] == false){
                    continue;
                  }
                var next_pos = result[0]
                var new_path = add_action(path,action);
                var new_cost = cost + 8;
                var priority = 8 + heuristic(next_pos,this.goal);
                frontier.enqueue([next_pos,new_path,new_cost],priority);
              }

          }
      return []
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


