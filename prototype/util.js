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

function get_new_position(image,grid){

  for(var i = 0; i < grid[0].length; i++){

    if(inTile_x(image.position.x, grid[i][0])){

      for(var j = 0; j < grid[i][0].length; j++){

        if(inTile_y(image.position.y, grid[i][j])){
          console.log(i,j);
          return {
              x: i,
              y: y
          }

        }

      }

    }

  }
  console.log("location not found");
}

//-----------------------------------------------------------------------------------

/*
 * the following two functions check if the x or y  position is in a tile
 */

function inTile_x(position,tile){
    var in_tile = false;
   if(position == tile.x){
      in_tile = true;
   }
  return in_tile
}


function inTile_y(position,tile){
    var in_tile = false;
   if(position == tile.y){
      in_tile = true;
   }
  return in_tile
}


//------------------------------------------------------------------------------------

/*
 * returns if the civilian is at the goal
 */

function isGoal(start, goal){
  var dist_x = Math.abs(start.x - goal.x);

  if( dist_x <= 32){
     var dist_y = Math.abs(start.y - goal.y);

     if(dist_y <= 32){
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

      if((object.x == pos.x) && (object.y == pos.y)){
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
  var x_length = grid.length-1;
  var y_length = grid[0].length-1;
  //var top_left = grid[0][0];
  //var bottom_right = grid[x_length][y_length];
  var new_pos = {}
  var bool = true;
   switch (action){
    case "east":
        new_pos = {
            x: current_pos.x + steps,
            y: current_pos.y
        };

       if(new_pos.x > grid[x_length][0].x){
        bool = false;
        break;
      }
     // bool = grid[new_pos.x][new_pos.y].free;

        break;

    case "west":
         new_pos = {
            x: current_pos.x - steps,
            y: current_pos.y
        };

        if(new_pos.x < grid[0][0].x){
          bool = false;
          break;
        }
         //bool = grid[new_pos.x][new_pos.y].free;

        break;

    case "north":
         new_pos = {
            x: current_pos.x,
            y: current_pos.y - steps
        };

        if( new_pos.y < grid[0][0].y){
          bool = false;
          break;
        }
         //bool = grid[new_pos.x][new_pos.y].free;
          break;

    case "south":
         new_pos = {
            x: current_pos.x,
            y: current_pos.y + steps
        };
        if(new_pos.y > grid[x_length][y_length].y){
          bool = false;
          break;
        }
         //bool = grid[new_pos.x][new_pos.y].free;

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

//------------------------------------------------------------------------------------

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

//----------------------------------------------------------------------------------------


function check_walls(x,y,wall){
   for(var i = 0; i < wall.length; i++){
     var object = wall[i].sprite;
     var object_x = object.position.x;
     var object_y = object.position.y;
     var dist_x = Math.abs(x - object_x);
     var dist_y = Math.abs(y - object_y);

     if(dist_x <= (object.width/2)) {
        if(dist_y <= (object.height/2)) {
          return false;
        }
     }


   }
  return true;
}


//---------------------------------------------------------------------------------------


function Make_grid(x1,y1,x2,y2,grid){
   var new_grid = [];
    for (var i = x1; i < x2; i++){
        var list = [];
        for(var j = y1; j < y2; j++){
          list.push(grid[i][j]);
        }
        new_grid.push(list);
    }
  return new_grid;
}


function create_sub_grid(position,grid){
    var x = grid.length;
    var y = grid[0].length;

    console.log(x,y);

    var x_value = grid[half_x-1][0].x;
    console.log("x_value", x_value);

    var y_value = grid[0][half_y-1].y;
    console.log("y_value", y_value);


    if((position.x < x_value ) && (position.y < y_value)){
      console.log("in Q1");
       return Make_grid(0,0, half_x, half_y,grid);
    }


    if((position.x < x_value) && (position.y >= y_value )){
       console.log("in Q2");
        return Make_grid(0, half_y, x, y,grid);

    }


    if((position.x >= x_value ) && (position.y < y_value )){
       console.log("in Q3");
       console.log("half_x" , half_x);
       console.log("x length of grid", x);
      return Make_grid(half_x, 0, x, half_y,grid);
    }


    if((position.x >= x_value ) && (position.y >= y_value)){
        console.log("in Q4");
       return Make_grid(half_x,half_y,x,y,grid);
    }


}





function on_edge(pos,subgrid){
   if(pos.x == subgrid.length || pos.y == subgrid[0].length){
      console.log("yesssss");
      return true;
   }

    return true;
}