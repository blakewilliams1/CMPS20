
window.onload = function init()
{
  var game = new Game();
  var bird = new PIXI.MovieClip();
  /*var assetsToLoader = ["json/soldier2.json"];
  loader = new PIXI.AssetLoader(assetsToLoader);
  loader.onComplete = onAssetsLoaded
  loader.load();
  */

  animate();
  function animate() {
    requestAnimFrame( animate );
    game.renderer.render(game.stage);
    }

  function onAssetsLoaded(){
      var alien = PIXI.Sprite.fromFrame("standing.png");
      alien.position.x = 300;
      alien.position.y = 200;
      game.stage.addChild(alien);
  }
  };




