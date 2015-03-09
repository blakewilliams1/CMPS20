var rightBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffRight1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffRight2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffRight3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffRight4.png")
]

var leftBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffLeft1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffLeft2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffLeft3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffLeft4.png")
]

var upBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffBack1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffBack2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffBack3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffBack4.png")
]

var downBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffForward1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffForward2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffForward3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffForward4.png")
]

var rightCarryBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryRight1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryRight2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryRight3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryRight4.png")
]

var leftCarryBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryLeft1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryLeft2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryLeft3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryLeft4.png")
]

var upCarryBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryBack1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryBack2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryBack3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryBack4.png")
]

var downCarryBuffTextures = [
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryForward1.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryForward2.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryForward3.png"),
	PIXI.Texture.fromImage("../Art Assets/png/buffCarryForward4.png")
]

var otherTex = PIXI.Texture.fromImage("../Art Assets/png/buffForward1.png");

function BuffSoldier(owner){
	var soldier = new Soldier(owner);
	soldier.setTexture(otherTex);
	soldier.isCarrying=false;

	soldier.soldierType=2;
	soldier.knock_out=function(civilian){
		civilian.knockedOut=true;
		civilian.sprite.visible=false;
		soldier.isCarrying=true;
		soldier.setTexture(downCarryBuffTextures[soldier.animCounter]);
		//play punching sound
	}
	soldier.moveRight = function() {
			if(soldier.isCarrying)this.setTexture(rightCarryBuffTextures[soldier.animCounter]);
			else this.setTexture(rightBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.x += 4;
	};
	soldier.moveLeft = function() {
			if(soldier.isCarrying)this.setTexture(leftCarryBuffTextures[soldier.animCounter]);
			else this.setTexture(leftBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.x -= 4;
	};
	soldier.moveUp = function() {
			if(soldier.isCarrying)this.setTexture(upCarryBuffTextures[soldier.animCounter]);
			else this.setTexture(upBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.y -= 4;
	}
	soldier.moveDown = function() {
			if(soldier.isCarrying)this.setTexture(downCarryBuffTextures[soldier.animCounter]);
			else this.setTexture(downBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.y += 4;
	}
	return soldier;
}