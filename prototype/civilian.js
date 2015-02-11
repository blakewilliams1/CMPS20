function Civilian(){


  this.image;
  this.direction = "none";
  this.actions = ["north","south","east","west"];
  this.moves = [];

  this.goal = {"x":Math.floor(Math.random() * $(window).width()), "y":
                Math.floor(Math.random() * $(window).height())};

  this.spotted = false;


}











function dfs(civilan){

}