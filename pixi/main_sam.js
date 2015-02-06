window.onload = function init()
{
  //onAssetsLoaded()
  stage = new PIXI.Stage(0x66FF99);
  // create a renderer instance
  var view = document.getElementById("myCanvas")
  var renderer = new PIXI.CanvasRenderer(1000, 600,view);


  init_game();
  // create a texture from an image pat
  animate();

  function animate() {

      requestAnimFrame( animate );
      update();
      // render the stage
      renderer.render(stage);
    }

  };