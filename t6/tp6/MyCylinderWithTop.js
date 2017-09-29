/**
 * MyCylinderWithTop
 * @constructor
 */
function MyCylinderWithTop(scene, slices, stacks) {
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(this.scene,slices,stacks);
	this.circle = new MyCircle(this.scene, slices);
};

MyCylinderWithTop.prototype = Object.create(CGFobject.prototype);
MyCylinderWithTop.prototype.constructor = MyCylinderWithTop;

MyCylinderWithTop.prototype.display = function()
{
	this.scene.pushMatrix();
		this.cylinder.display();
		this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			this.circle.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.rotate(Math.PI,1,0,0);
			this.circle.display();
		this.scene.popMatrix();
	this.scene.popMatrix();
}