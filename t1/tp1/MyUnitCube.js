/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {

	this.vertices = [
	            -0.5, -0.5, -0.5, // bottom
	            0.5, -0.5, -0.5, // bottom
	            -0.5, 0.5, -0.5, // top
	            0.5, 0.5, -0.5, // top
	            -0.5, -0.5, 0.5, // bottom
	            0.5, -0.5, 0.5, // bottom
	            -0.5, 0.5, 0.5, // top
				0.5, 0.5, 0.5, // top
			];

	this.indices = [
			//back
			2, 1, 0,
			1, 2, 3,

			//right
			1, 3, 5,
			7, 5, 3,

			//front
			7, 4, 5,
			7, 6, 4,

			//left
			6, 0, 4,
			2, 0, 6,

			//top
			2, 6, 7,
			2, 7, 3,	

			//bottom
			0, 1, 4,
			5, 4, 1
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

/*




*/