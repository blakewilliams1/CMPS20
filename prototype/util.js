/*
 * this file holds all the helper function that are called through out our game
 */


//----------------------------------------------------------------------------------

/*
 * checks if a point is with in the area of the triangle( three point that form a triangle)
 */

function in_triangle(p,a,b,c){

   var v0 = [c.x-a.x,c.y-a.y];
   var v1 = [b.x-a.x,b.y-a.y];
   var v2 = [p.x-a.x,p.y-a.y];


   var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
   var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
   var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
   var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
   var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);

   var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);

   var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
   var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

   return ((u >= 0) && (v >= 0) && (u + v < 1));
}

//--------------------------------------------------------------------------------------

/*
 * rotate any point around the origin by n degrees
 */

function rotate_point(pointX, pointY, originX, originY, angle) {
  angle = angle * Math.PI / 180.0;
  return {
    x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
    y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
  };
}

//----------------------------------------------------------------------------------

/*
 * returns an array of positions(x and y) from one point to another
 */


  function getRay(v1,v2){
     var dx = Math.abs(v2.x - v1.x);
     var dy = Math.abs(v2.y - v1.y);
     var sx = v1.x < v2.x ? 1 : -1;
     var sy = v1.y < v2.y ? 1 : -1;
     var err = dx-dy;

     var ray = [];
        while(v1.x!=v2.x || v1.y!=v2.y){
            ray.push(v1.x,v1.y);
             var e2 = 2*err;
             if(e2>-dy){
                err = err - dy;
                v1.x += sx;
              }
              if(e2<dx){
                err = err + dx;
                v1.y += sy;
                }
      }
   return ray;
  }

//--------------------------------------------------------------------------------

function get_dist_point(origin,x,y){
   return {
      x: origin.x + x,
      y: origin.y + y
   }
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
 * NOTE- this funciton returns the next position and a boolean (if the
 * next move is a valid one)
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

/*
* Uses the objects axis aligned bounding boxes to check if a 
* collision has occurred.
*/

function collided(first,second){
	//NOTE: currently must pass in sprites
	//NOTE: also doesn't account for modified anchors,
	//and I'm assuming 'width' correctly stores it's
	//width in pixels
	if(first==0||second==0){
		console.log("error! checking null objects!");
		return false;
	}
	if(!first.visible||!second.visible)return false;
	var x1=first.position.x-first.anchor.x*first.width;
	var x2=second.position.x-second.anchor.x*second.width;
	var y1=first.position.y-first.anchor.y*first.height;
	var y2=second.position.y-second.anchor.y*second.height;
	if(x1<x2+second.width&&
		x1+first.width>x2&&
		y1<y2+second.height&&
		first.height+y1>y2){
		return true;
	}
	return false;
}
