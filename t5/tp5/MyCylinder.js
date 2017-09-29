/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
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
 	this.texCoords = [];


 	// 6 - 0.5 			slices * 0.5 / 6
 	// slices - x
 	//-------------------------------------------------------------------------------------
 	var alfa = 2 * Math.PI / this.slices;
 	var yCoord = 0;
 	for (var i = 0; i <= this.stacks; ++i)
 	{
 		var xCoord = 0;
 		for (var j = 0; j < this.slices; ++j)
 		{
 			this.vertices.push(Math.cos(j * alfa), Math.sin(j * alfa), i / this.stacks);

 			if (i < this.stacks)
 			{ 
 				this.indices.push(
	 				i * this.slices + j, i * this.slices + ((j + 1) % this.slices),(i + 1) * this.slices + (j + 1) % this.slices,
	 				i * this.slices + j, (i + 1) * this.slices + ((j + 1) % this.slices), (i + 1) * this.slices + j
	 			);
 			}
			
 			this.normals.push(Math.cos(j * alfa), Math.sin(j * alfa), 0);
 			this.texCoords.push(xCoord, yCoord);
 			xCoord += 1.0 / this.stacks;
 		}
 		yCoord += 1.0 / this.stacks;
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
