/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);

 	this.slices = slices;
 	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
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
 	var raio = (Math.PI / 2) / this.stacks;
 	for (var i = 0; i <= this.stacks; ++i)
 	{
 		for (var j = 0; j < this.slices; ++j)
 		{
 			this.vertices.push(Math.cos(i * raio) * Math.cos(j * alfa), Math.sin(i * raio) * Math.sin(j * alfa), raio * i / this.stacks);

 			if (i < this.stacks)
 			{ 
 				this.indices.push(
 					i * this.slices + j, i * this.slices + ((j + 1) % this.slices),(i + 1) * this.slices + (j + 1) % this.slices,
 					i * this.slices + j, (i + 1) * this.slices + ((j + 1) % this.slices), (i + 1) * this.slices + j
 					);
 			}

 			this.normals.push(Math.cos(j * alfa), Math.sin(j * alfa), 0);
 		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
