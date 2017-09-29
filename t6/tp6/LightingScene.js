var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 3;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.3, 1.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);
	this.setUpdatePeriod(100);
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.light0 = true;
	this.speed = 0;
	this.plane_size = 5;
	this.is_clock_working = true;

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	
	this.poste = new MyCylinder(this, 6, 20);
	this.clock = new MyClock(this,12);
	this.submarine = new MySubmarine(this);
	this.plane = new MyQuad(this, 0, 10, 0, 12);
	this.target1 = new MyTarget(this, 1, 5);
	this.target2 = new MyTarget(this, 0, 0);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);	
	// this.materialA.setSpecular(0.2,0.2,0.2,1);
	this.materialA.setShininess(120);
	// this.materialA.setShininess(10);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.planeAppearance = new CGFappearance(this);
	this.planeAppearance.loadTexture("../resources/images/sea.png");
	this.planeAppearance.setAmbient(0.3,0.3,0.3,1);
	this.planeAppearance.setDiffuse(0.12, 0.6, 1,1);
	this.planeAppearance.setSpecular(0.3,0.3, 0.3,1);	
	
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.windowAppearance.setDiffuse(0.12, 0.6, 1,1);
	this.windowAppearance.setSpecular(0.3,0.3, 0.3,1);	

	this.slideAppearance = new CGFappearance(this);
	this.slideAppearance.loadTexture("../resources/images/slides.png");
	this.slideAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.slideAppearance.setSpecular(0.25,0.25,0.25,1);
	this.slideAppearance.setShininess(30);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.3,0.3,0.3,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setShininess(200);

	this.columnAppearance = new CGFappearance(this);
	this.columnAppearance.loadTexture("../resources/images/column.jpg");
	this.columnAppearance.setDiffuse(0.3,0.3,0.3,1);
	this.columnAppearance.setAmbient(0.3,0.3,0.3,1);
	this.columnAppearance.setSpecular(0.5,0.5,0.5,1);
	this.columnAppearance.setShininess(200);

	this.posteAppearance = new CGFappearance(this);
	this.posteAppearance.loadTexture("../resources/images/poste.jpg");
	this.posteAppearance.setAmbient(0.3,0.3,0.3,1);
	this.posteAppearance.setDiffuse(0.3,0.3,0.3,1);
	this.posteAppearance.setSpecular(0.5,0.5,0.5,1);
	this.posteAppearance.setShininess(200);

	this.submarineAppearance = new CGFappearance(this);
	this.submarineAppearance.loadTexture("../resources/images/submarine.jpg");
	this.submarineAppearance.setAmbient(0.8,0.8,0.8,1);
	this.submarineAppearance.setDiffuse(0.88, 0.87, 0.86,1);
	this.submarineAppearance.setSpecular(0.8,0.8, 0.8,1);
	this.submarineAppearance.setShininess(200);

	this.alternativeAppearance = new CGFappearance(this);
	this.alternativeAppearance.loadTexture("../resources/images/alternative.png");
	this.alternativeAppearance.setAmbient(0.8,0.8,0.8,1);
	this.alternativeAppearance.setDiffuse(0.88, 0.87, 0.86,1);
	this.alternativeAppearance.setSpecular(0.8,0.8, 0.8,1);
	this.alternativeAppearance.setShininess(200);

	this.targetAppearance = new CGFappearance(this);
	this.targetAppearance.loadTexture("../resources/images/target.png");
	this.targetAppearance.setAmbient(0.8,0.8,0.8,1);
	this.targetAppearance.setDiffuse(0.88, 0.87, 0.86,1);
	this.targetAppearance.setSpecular(0.8,0.8, 0.8,1);
	this.targetAppearance.setShininess(200);

	this.seaAppearance = new CGFappearance(this);
	// this.seaAppearance.loadTexture("../resources/images/sea.jpg");
	// this.seaAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.seaAppearance.setDiffuse(0.88, 0.87, 0.86,1);
	this.seaAppearance.setSpecular(0.8,0.8, 0.8,1);
	this.seaAppearance.setShininess(200);

	this.submarineAppearances = [this.submarineAppearance, this.posteAppearance,this.boardAppearance, this.alternativeAppearance];
    this.submarineAppearanceList = {};
    this.submarineAppearanceList["Default"] = 0;
    this.submarineAppearanceList["Wood"] = 1;
    this.submarineAppearanceList["Board"] = 2;
    this.submarineAppearanceList["Colorful"] = 3;

	this.currSubmarineAppearance = "Default";

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);
	// this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	// Positions for four lights
	this.lights[0].setPosition(0, 5, 0, 1);
	this.lights[1].setPosition(10, 5, 0, 1.0);
	this.lights[2].setPosition(10, 5.0, 10.0, 1.0);
	this.lights[3].setPosition(0, 5.0, 10.0, 1.0);
	this.lights[4].setPosition(8, 5, 1, 1.0);
	
	this.lights[0].setVisible(true); 
	this.lights[1].setVisible(true); 
	this.lights[2].setVisible(true); 
  	this.lights[3].setVisible(true); 
	this.lights[4].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setSpecular(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].enable();
};

LightingScene.prototype.setEnabledLight = function(light, option)
{
	if (option)
	{
		light.enable();
	}
	else
	{
		light.disable();
	}
}

LightingScene.prototype.updateLights = function() {

	for (i = 0; i < this.lights.length; i++)
	{
		this.lights[i].update();
	}	
	this.setEnabledLight(this.lights[0], this.light0);
	this.setEnabledLight(this.lights[1], this.light1);
	this.setEnabledLight(this.lights[2], this.light2);
	this.setEnabledLight(this.lights[3], this.light3);
	this.setEnabledLight(this.lights[4], this.light4);
}

LightingScene.prototype.update = function(currTime) {
	if (this.is_clock_working)
	{
		this.clock.update(currTime);
	}
	this.submarine.updatePosition(currTime);
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

    this.submarineAppearances[this.submarineAppearanceList[this.currSubmarineAppearance]].apply();
	this.pushMatrix();
		this.translate(5,2,5);
		this.rotate(7*Math.PI/9,0,1,0);
		this.submarine.display();
	this.popMatrix();

	this.planeAppearance.apply();
	this.pushMatrix();
		this.translate(this.plane_size,0,this.plane_size);
		this.rotate(-Math.PI/2,1,0,0);
		this.scale(this.plane_size*2,this.plane_size*2,this.plane_size*2);	
		this.plane.display();
	this.popMatrix();

	this.pushMatrix();
		this.translate(8, 5, 0);
		this.scale(0.6,0.6,0.2);
		this.clock.display();
	this.popMatrix();

	this.posteAppearance.apply();
	this.pushMatrix();
		this.translate(8, 0, -0.3);
		this.scale(0.3,6,0.3);	
		this.rotate(-Math.PI/2,1,0,0);
		this.poste.display();
	this.popMatrix();

	this.targetAppearance.apply();
	this.target1.display();
	this.target2.display();

	// ---- END Primitive drawing section
};//14/18=7/9

LightingScene.prototype.doSomething = function ()
{ 
	console.log("Doing something..."); 
};
