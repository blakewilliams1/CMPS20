//----------------------------------------------------------------------------------

  function in_view(p1,p2,angle){

  }



function get_view_points(p,origin){
   console.log("new angle", toRadians(45));
   var x = origin[0] - p[0];
   var y = origin[1] - p[1];

   var p1x = p[0] * Math.cos(toRadians(45));
   var p1y = p[1] * Math.sin(toRadians(45));


   return [p1x,p1y];
}



function toDegrees(angle){
  return angle * (180 / Math.PI);
}


function toRadians(angle){
  return angle * (Math.PI/180);
}



//----------------------------------------------------------------------------------

  function getRay(v1,v2){
     var dx = Math.abs(v2[0] - v1[0]);
     var dy = Math.abs(v2[1] - v1[1]);
     var sx = v1[0] < v2[0] ? 1 : -1;
     var sy = v1[1] < v2[1] ? 1 : -1;
     var err = dx-dy;

     var ray = [];
        while(v1[0]!=v2[0] || v1[1]!=v2[1]){
            ray.push(v1[0],v1[1]);
             var e2 = 2*err;
             if(e2>-dy){
                err = err - dy;
                v[0] += sx;
              }
              if(e2<dx){
                err = err + dx;
                v1[1] += sy;
                }
      }
   return ray;
  }


//--------------------------------------------------------------------------------

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

function isGoal(start,goal){
  var dist_x = Math.abs(start[0] - goal.x);

  if( dist_x <= 8){
     var dist_y = Math.abs(start[1] - goal.y);

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
        new_pos = [(current_pos[0] + steps),current_pos[1]];
       if(new_pos[0] > $(window).width() || new_pos[0] > bottom_right.x){
        bool = false;
      }
    break;

    case "west":
        new_pos = [(current_pos[0] - steps),current_pos[1]];
        if(new_pos[0] < 0 || new_pos[0] < top_left.x){
          bool = false;
        }
    break;

    case "north":
        new_pos = [current_pos[0],(current_pos[1] - steps)];
        if(new_pos[1] < 0 || new_pos[1] < top_left.y){
          bool = false;
        }
    break;

    case "south":
        new_pos = [current_pos[0],(current_pos[1] + steps)];
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
