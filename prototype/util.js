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

     var v11 = v1;
     var v22 = v2;
     var dx = Math.abs(v22.x - v11.x);
     var dy = Math.abs(v22.y - v11.y);
     var sx = v11.x < v22.x ? 1 : -1;
     var sy = v11.y < v22.y ? 1 : -1;
     var err = dx-dy;

     var ray = [];
        while(v11.x!=v22.x || v11.y!=v22.y){
            ray.push({
                  x:v11.x,
                  y:v11.y
                  });
             var e2 = 2*err;
             if(e2>-dy){
                err = err - dy;
                v11.x += sx;
              }
              if(e2<dx){
                err = err + dx;
                v11.y += sy;
              }
      }


   return ray;
  }

//--------------------------------------------------------------------------------

function get_dist_point(origin,x,y){
   return {
      x : origin.x + x,
      y: origin.y + y
   }
}


//--------------------------------------------------------------------------------

/*
 * this function returns the tile location in which a object is in
 */

function in_grid(pos,grid){
  for(var i = 0; i < grid.length; i++){
     if((pos.x >= grid[i][0].x - 16) && (pos.x < grid[i][0].x + 16)){
        for(var j = 0; j < grid[i].length; j++){
           if((pos.y >= grid[i][j].y - 16) && (pos.y <= grid[i][j].y + 16)){
              return {
                   x: i,
                   y: j
              }
           }
        }
     }
  }

}


//------------------------------------------------------------------------------------

/*
 * returns if the civilian is at the goal
 */

function isGoal(start, goal){
  var dist_x = Math.abs(start.x - goal.x);

  if( dist_x <= steps){
     var dist_y = Math.abs(start.y - goal.y);

     if(dist_y <= steps){
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

function generate_move(pos,action,grid,goal,wall){
  var new_pos = {}
  var bool = false;
   switch (action){
    case "east":
        new_pos = {
            x: pos.x + steps,
            y: pos.y
        };

       if((new_pos.x > map_width) || (goal.x < new_pos.x)){
        bool = true;
        break;
      }
      var location = in_grid(new_pos,grid);
       bool = check_walls(new_pos.x, new_pos.y, wall);

        break;

    case "west":
         new_pos = {
            x: pos.x - steps,
            y: pos.y
        };



        if((new_pos.x < 10) || (goal.x > new_pos.x)){
          bool = true;
          break;
        }

          var location = in_grid(new_pos,grid);
          bool = check_walls(new_pos.x, new_pos.y, wall);

        break;

    case "north":
         new_pos = {
            x: pos.x,
            y: pos.y - steps
        };

        if((new_pos.y < 0) || (goal.y > new_pos.y)){
          bool = true;
          break;
        }
          var location = in_grid(new_pos,grid);
          bool = check_walls(new_pos.x, new_pos.y, wall);
          break;

    case "south":
         new_pos = {
            x: pos.x,
            y: pos.y + steps
        };

        if((new_pos.y > map_height - 60) || (goal.y < new_pos.y)){
          bool = true;
          break;
        }
        var location = in_grid(new_pos,grid);
        bool = check_walls(new_pos.x, new_pos.y, wall);

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


//------------------------------------------------------------------------------------

/*
* Uses the objects axis aligned bounding boxes to check if a
* collision has occurred.
*/

function collided(first,second){
	//NOTE: currently must pass in sprites
	if(first==undefined||second==undefined){
		console.log("error! checking undefined objects!");
		return false;
	}
	if(!first.visible||!second.visible)return false;
	var x1=first.position.x-first.anchor.x*first.width;
	var y1=first.position.y-first.anchor.y*first.height;
	var h1 = first.height, w1=first.width;
	var x2=second.position.x-second.anchor.x*second.width;
	var y2=second.position.y-second.anchor.y*second.height;
	var h2=second.height, w2=second.width;
	//The following lines make the hitboxes more forgiving.
	//For both objects, move the hitboxes down and cut them in half.
		y1+=h1/2;
		h1/=2;
		y2+=h2/2;
		h2/=2;
		
	if(x1<x2+w2&&
		x1+w1>x2&&
		y1<y2+h2&&
		h1+y1>y2){
		return true;
	}
	return false;
}

//----------------------------------------------------------------------------------------


function check_walls(x,y,wall){
   for(var i = 0; i < wall.length; i++){
     var object = wall[i];
     var object_x = object.position.x;
     var object_y = object.position.y;
     var dist_x = Math.abs(x - object_x);
     var dist_y = Math.abs(y - object_y);

     if(dist_x <= (object.width/2) + 16 ) {
        if(dist_y <= (object.height/2) + 16) {
          return true;
        }
     }


   }
  return false;
}


//---------------------------------------------------------------------------------------


function on_edge(pos,subgrid){
   var x = subgrid.length -1;
   var y = subgrid[0].length -1;

   if(pos.x == subgrid[x][0].x|| pos.y == subgrid[0][y].y){
      console.log("yesssss");
      return true;
   }

    return true;
}



function close_to_hiding(spot,soldier){
  for(var i = 0; i < spot.length; i++){
    spot[i].graphic.clear()

     var dist = (Math.abs(soldier.position.x - spot[i].position.x) + Math.abs(soldier.position.y - spot[i].position.y));

     if (dist < 100){
        if(spot[i].occupied){
          spot[i].graphic.lineStyle(3, 0xFF0000, 0.3);
          spot[i].graphic.drawCircle(spot[i].position.x ,spot[i].position.y, 60);
        }else{
           spot[i].graphic.lineStyle(3, 0x0000FF, 0.3);
           spot[i].graphic.drawCircle(spot[i].position.x ,spot[i].position.y, 60);
        }
     }else{
      spot[i].graphic.lineStyle(3, 0x0000FF, 0);
       spot[i].graphic.drawCircle(spot[i].position.x ,spot[i].position.y, 60);
     }
  }
}


function check_spawn_area(soldier){
  return ((soldier.position.x >= 1053) && (soldier.position.y >= 545));
}

function check_player_in_spawn(soldier){
    return ((soldier.position.x >= 1048) && (soldier.position.y >= 530));

}

