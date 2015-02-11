function Player(){
  this.image;
  this.direction = "none";

  this.update = function(image){
     if(this.image != image) return;
     switch (this.direction){
    case "right":
      this.image.position.x += 4;
      break;

    case "left":
      this.image.position.x -= 4;
      break;

    case "up":
      this.image.position.y -= 4;
      break;

    case "down":
      this.image.position.y += 4;
      break;
  }
  }
}