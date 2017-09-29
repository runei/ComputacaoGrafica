/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.cube = new MyUnitCubeQuad(this.scene);

	//dimensoes paralelepipedo
	this.paral_x = 0.3;
	this.paral_y = 3.5;
	this.paral_z = 0.3;

	//dimensoes tampo
	this.tampo_x = 5;
	this.tampo_y = 0.3;
	this.tampo_z = 3.5;

	//dimensoes table
	this.x = this.tampo_x;
	this.y = this.paral_y + this.tampo_y;
	this.z = this.tampo_z;	
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.getParalelepipedo = function(x, y, z) {
	this.scene.pushMatrix();
		this.scene.translate(x, y, z);
		this.scene.scale(this.paral_x, this.paral_y, this.paral_z);
		this.cube.display();
	this.scene.popMatrix();
};

MyTable.prototype.getTampo = function(x, y, z) {
	this.scene.pushMatrix();
		this.scene.translate(x, y, z);
		this.scene.scale(this.tampo_x, this.tampo_y, this.tampo_z);
		this.cube.display();
	this.scene.popMatrix();
};

MyTable.prototype.display = function () {

	var	pos_paral_x = this.tampo_x * 0.8,
		pos_paral_z = this.tampo_z * 0.4;

	this.getParalelepipedo(pos_paral_x, 0, pos_paral_z);
	this.getParalelepipedo(-pos_paral_x, 0, pos_paral_z);
	this.getParalelepipedo(pos_paral_x, 0, -pos_paral_z);
	this.getParalelepipedo(-pos_paral_x, 0, -pos_paral_z);
	this.getTampo(0, this.paral_y, 0);

};
