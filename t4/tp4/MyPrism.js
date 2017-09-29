/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];

 	// 6 - 0.5 			slices * 0.5 / 6
 	// slices - x
 	//-------------------------------------------------------------------------------------
 	var alfa = 2 * Math.PI / this.slices;
 	for (var i = 0; i <= this.stacks; ++i)
 	{
 		for (var j = 0; j < this.slices; ++j)
 		{
 			this.vertices.push(
 				Math.cos(j * alfa), Math.sin(j * alfa), i / this.stacks,
 				Math.cos((j + 1) * alfa), Math.sin((j + 1) * alfa), i / this.stacks
 			);

 			if (i < this.stacks)
 			{
 				this.indices.push(
	 				i * (this.slices * 2) + j * 2, i * (this.slices*2)+j*2+1,(i+1)*(this.slices*2)+ j * 2 + 1,
	 				i * (this.slices * 2) + j * 2,(i + 1) * (this.slices * 2) + j * 2 + 1,(i + 1) * (this.slices * 2) + j * 2
	 			);	
 			}
			

 			this.normals.push(
 				Math.cos(alfa / 2) + j * alfa, Math.sin(alfa / 2) + j * alfa, 0,
 				Math.cos(alfa / 2) + j * alfa,Math.sin(alfa / 2), 0
 			);
 		}
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
