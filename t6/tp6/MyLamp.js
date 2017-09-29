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
 	this.texCoords = [];
 	this.radius = 1;

 	// 6 - 0.5 			slices * 0.5 / 6
 	// slices - x
 	//-------------------------------------------------------------------------------------
 	var alfa = 2 * Math.PI / this.slices;
 	for (stack = 0; stack <= this.stacks; stack++) {
        h = stack * this.radius/ this.stacks;
        sub_radius = Math.sqrt((this.radius*this.radius) - (h * h));
        //console.log(radius);
        for (i = 0; i <= this.slices; i++) {
            //Vertice 0
            this.vertices.push(Math.cos(i * alfa) * sub_radius, Math.sin(i * alfa) * sub_radius, h);

            //Add Normals
            this.normals.push(Math.cos(i * alfa), Math.sin(i * alfa), 0);

            //Add textCoords
            this.texCoords.push(i / this.slices, stack / this.stacks);

        }
    }
    for (stack = 0; stack < this.stacks; stack++) {
        stack_const = this.slices + 1;
        for (i = 0; i < this.slices; i++) {
            this.indices.push(i + (stack * stack_const), (i + 1) + (stack * stack_const), i + 1 + this.slices + (stack * stack_const));
            this.indices.push(i + 1 + (stack * stack_const), (i + this.slices + 2) + (stack * stack_const), i + this.slices + 1 + (stack * stack_const));
        }
    }
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
