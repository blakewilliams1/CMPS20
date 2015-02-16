//---------------------------------------------------------------------------------

/*
 * this function create of sub-grid if the main grid so that the search algorithm
 * problem is broken into smaller searches which will allow the game to run at its
 * native frame rate
 */

 function sub_grid(position,grid){
     var count = 20;
     var diff_x = position[0] - count;
     var diff_y = position[1] - count;

     if(diff_x < 0){
        diff_x = count - diff_x;
     }

     if(diff_y < 0){
        diff_y = count - diff_y;
     }
      var subgrid = [];
     for(var i = 0; (i < count) && (diff_x < grid.length);i++,diff_x++){
          var list = [];
         for(j = 0; (j < count) && (diff_y < grid[0].length);j++,diff_y++){
            var tile = grid[diff_x][diff_y];
            list.push(tile);
          }
          if(list.length == 0){
            continue;
          }
         subgrid.push(list);
     }
   return subgrid;
 }

//---------------------------------------------------------------------------------

/*
 * this function returns the tile location in which a object is in
 */

function location_in_grid(position,grid){

  var x_position = 0;
  var y_position = 0;
  var grid_x = 0;
  var grid_y = 0;
  for(var i = 0; i < grid.length; i++){
      if(inTile_x(position[0],grid[i][0])){
          x_position = i
          break;
        }
    }

  for(var j = 0; j < grid[x_position].length; j++){
      if(inTile_y(position[1],grid[x_position][j])){
         y_position = j;
         break;
        }
    }

  return [x_position,y_position];
}
//-----------------------------------------------------------------------------------

/*
 * the following two functions check if the x or y  position is in a tile
 */

function inTile_x(position,tile){
    var in_tile = false;
   if((position <= (tile.x + (tile.width/2))) && (position >= (tile.x - (tile.width/2)))){
      in_tile = true;
   }
  return in_tile
}


function inTile_y(position,tile){
    var in_tile = false;
   if((position <= (tile.y + (tile.width/2))) && (position >= (tile.y - (tile.width/2)))){
      in_tile = true;
   }
  return in_tile
}


//------------------------------------------------------------------------------------

/*
 * returns if the civilian is at the goal
 */

function isGoal(start,civilian){
  var dist_x = Math.abs(start[0] - civilian.goal.x);

  if( dist_x <= 8){
     var dist_y = Math.abs(start[1] - civilian.goal.y);

     if(dist_y <= 8){
      return true;
     }
   }
  return false;
}


//-----------------------------------------------------------------------------------


/*
 * returns if object position is already in the list
 *
 */

 function inArray(object,array){
   for(var i = 0; i < array.length; i++){
      var pos = array[i];

      if((object[0] == pos[0]) && object[1] == pos[1]){
        return true;
      }
   }
   return false;
 }


 //-----------------------------------------------------------------------------------

/*
 * this function will generate the next move for the civilian so the
 * A_star search can use to data
 * NOTE- this funciton returns the next position and a boolean if the
 * next move is a valid one
 */

function generate_move(current_pos,action,grid){
  var top_left = grid[0][0];
  var bottom_right = grid[149][74];
  var new_pos = []
  var bool = true;
   switch (action){
    case "east":
        new_pos = [(current_pos[0] + 8),current_pos[1]];
       if(new_pos[0] > $(window).width() || new_pos[0] > bottom_right.x){
        bool = false;
      }
    break;

    case "west":
        new_pos = [(current_pos[0] - 8),current_pos[1]];
        if(new_pos[0] < 0 || new_pos[0] < top_left.x){
          bool = false;
        }
    break;

    case "north":
        new_pos = [current_pos[0],(current_pos[1] - 8)];
        if(new_pos[1] < 0 || new_pos[1] < top_left.y){
          bool = false;
        }
    break;

    case "south":
        new_pos = [current_pos[0],(current_pos[1] + 8)];
        if(new_pos[1] > $(window).height() || new_pos[1] > bottom_right.y){
          bool = false;
        }
    break;
    }
return [new_pos,bool];

}

//--------------------------------------------------------------------------------------

/*
 * this a priority queue data structure
 */
function PriorityQueue(){
    var items = [];


    function QueueElement(element, priority){
         this.element = element;
         this.priority = priority;
    }


    //adds a element to the queue
    this.enqueue = function(element, priority){
       var queueElement = new QueueElement(element,priority);

        if(this.isEmpty()){
            items.push(queueElement);

         }else{
            var added = false;

            for(var i = 0; i < items.length; i++){
               if(queueElement.priority < items[i].priority){
                  items.splice(i,0,queueElement);
                  added = true;
                  break
                 }
             }

           if(!added){
             items.push(queueElement);
            }
          }
    }

    // checks if the queue is empty
    this.isEmpty = function(){
         return items.length == 0;
    }
    //removes the highest priority element from the queue
    this.dequeue = function(){
         return items.shift().element;
    }

    //allows you to take a look at the highest priority form the queue
    this.front = function(){
         return items[0];
    }
}

//-------------------------------------------------------------------------------------


function add_action(path,action){
  if(path.length == 0){
     return [action];
  }else{
    var way = [];
    for(var i = 0; i < path.length; i++){
       way.push(path[i]);
    }
    way.push(action);
    return way;
  }
}
