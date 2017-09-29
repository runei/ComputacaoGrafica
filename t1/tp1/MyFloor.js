/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyFloor(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene)
};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor = MyFloor;

MyFloor.prototype.x = 8;
MyFloor.prototype.y = 0.1;
MyFloor.prototype.z = 6;

MyFloor.prototype.display = function () {

	this.scene.pushMatrix();
		this.scene.scale(this.x, this.y, this.z);
		this.cube.display();
	this.scene.popMatrix();

};
