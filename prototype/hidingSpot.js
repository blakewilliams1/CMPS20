function HidingSpot(x,y,s_image){
  this.image=s_image;
  this.image.position.x=x;
  this.image.position.y=y;
  this.occupied=false;
  this.points=10;//arbitrary so far
}