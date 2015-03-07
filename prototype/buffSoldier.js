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

	var otherTex = PIXI.Texture.fromImage("../Art Assets/png/soldierRight1.png");




function BuffSoldier(owner){
	var soldier = new Soldier(owner);
	soldier.soldierType=2;
	soldier.knock_out=function(civilian){
		if(civilian.found){
			//play punching sound
			//either remove civilian from stage or make him lie down?
		}
	}
	soldier.moveRight = function() {
			this.setTexture(rightBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.x += 4;
	};
	soldier.moveLeft = function() {
			this.setTexture(leftBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.x -= 4;
	};
	soldier.moveUp = function() {
			this.setTexture(upBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.y -= 4;
	}
	soldier.moveDown = function() {
			this.setTexture(downBuffTextures[soldier.animCounter]);
			if (soldier.animCounter2++ % 10 == 0) ++soldier.animCounter;
			if (soldier.animCounter >= 4) soldier.animCounter = 0;
			soldier.position.y += 4;
	}
	return soldier;
}