
/*
 * This file holds the initializer and all the functions of the civilians
 */

//----------------------------------------------------------------------------

/*
 * this is the initilize function of the
 * civilian object
 */

function Civilian(){
  this.sprite;
  this.actions = ["north","south","east","west"];
  this.moves = [];
  this.goal = {"x":Math.floor(Math.random() * window_width), "y":Math.floor(Math.random() * window_height)};

  this.at_goal = false;

  this.search_grid = []

  this.spotted = false;
  /*
   * this creates a list of moves that the civilian need take to
   * reach his goal
   */

  this.update = function(){
     if(this.moves.length == 0) return;
      var move = this.moves.shift();
    switch (move){
      case "east":
    this.sprite.position.x += 8;
    break;

    case "west":
    this.sprite.position.x -= 8;
    break;

    case "north":
    this.sprite.position.y -= 8;
    break;

    case "south":
    this.sprite.position.y += 8;
    break;
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
  //var subgrid = sub_grid(position,game.grid);
  civilian.moves = A_star(civilian,game.grid)
  game.stage.addChild(sprite);
}


//-----------------------------------------------------------------------------------

function A_star(civilian,grid){
   var frontier = new PriorityQueue();
   var visited = [];
   var moves = [];
   var start = [civilian.sprite.position.x, civilian.sprite.position.y];

   if(isGoal(start,civilian)) {
    console.log("at goal");
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

      if(isGoal(current_pos,civilian)){
        console.log("at goal", path);
        return path;
      }
      count++
      for(var i = 0; i < civilian.actions.length; i++){
        var action = civilian.actions[i];
        var result = generate_move(current_pos,action,grid);
        if(result[1] == false){
          console.log("not a move");
          continue;
        }
        var next_pos = result[0]
        var new_path = add_action(path,action);
        var new_cost = cost + 8;
        var priority = 8 + heuristic(next_pos,civilian);
        frontier.enqueue([next_pos,new_path,new_cost],priority);
      }

   }
   console.log("done");
   return []
}


//------------------------------------------------------------------------------------

/*
 * function that returns the manhattan distance from the position to the goal.
 */

function heuristic(position,civilian){
   var cost = (Math.abs(position[0] - civilian.goal.x) + Math.abs(position[1] - civilian.goal.y));
  return cost;
}


