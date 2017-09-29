/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	
	this.quad = new MyQuad(this.scene)
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function() {
	this.deg2rad = Math.PI / 180.0;

	//front
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 1);
		this.quad.display();
	this.scene.popMatrix();

	//back
	this.scene.pushMatrix();
		this.scene.translate(0, 0, -1);
		this.scene.rotate(180 * this.deg2rad, 0, 1, 0)
		this.quad.display();
	this.scene.popMatrix();

	//right
	this.scene.pushMatrix();
		this.scene.translate(1, 0, 0);
		this.scene.rotate(90 * this.deg2rad, 0, 1, 0)
		this.quad.display();
	this.scene.popMatrix();

	//left
	this.scene.pushMatrix();
		this.scene.translate(-1, 0, 0);
		this.scene.rotate(270 * this.deg2rad, 0, 1, 0)
		this.quad.display();
	this.scene.popMatrix();

	//top
	this.scene.pushMatrix();
		this.scene.translate(0, 1, 0);
		this.scene.rotate(270 * this.deg2rad, 1, 0, 0)
		this.quad.display();
	this.scene.popMatrix();

	//bottom
	this.scene.pushMatrix();
		this.scene.translate(0, -1, 0);
		this.scene.rotate(90 * this.deg2rad, 1, 0, 0)
		this.quad.display();
	this.scene.popMatrix();

	// this.pushMatrix();
	// 	this.

}