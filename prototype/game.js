/*
 * This file holds functions like creating a game object and game object
 * function
 */


 /*
  * create an instance of the game
  */
function Game(){
    // The pixi.js stage represents the root of
   // our display tree. Can be rendered by one
  // of the pixi.js renderers.
    this.stage = new PIXI.Stage(0xCCCCCC,true);

     // Create a renderer instance.
    // We choose Canvas and not webGL.
    this.view = document.getElementById("myCanvas");
    this.renderer = new PIXI.CanvasRenderer($(window).width(),$(window).height(),this.view);

    /*
    * initilize the soliders and enemies array to zero
    */
    this.soldiers = []
    this.soldier_count = 0;
    this.enemies = []

    this.direction = "none";
    this.active;
 }