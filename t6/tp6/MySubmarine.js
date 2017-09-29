/**
 * MySubmarine
 * @constructor
 */
 function MySubmarine(scene, minS, maxS, minT, maxT)
 {
 	CGFobject.call(this,scene);

	this.triangle = new MyTriangle(scene, minS, maxS, minT, maxT);
	this.rotation = 0;
	this.inclination = 0;
	this.general_speed = 0;
	this.x_position = 0;
	this.y_position = 0;
	this.z_position = 0;
	this.periscope_actual_height = 1.5;
	this.periscope_new_height = 1.5;

	this.main_body = new MyCylinder(this.scene, 40, 20);
	this.front_body = new MyLamp(this.scene, 40, 20);
	this.back_body = new MyLamp(this.scene, 40, 20);
	this.tower = new MyCylinder(this.scene, 40, 20);
	this.top_tower = new MyCircle(this.scene, 40);
	this.periscope_vert = new MyCylinder(this.scene, 40, 20);
	this.periscope_hor = new MyCylinder(this.scene, 40, 20);
	this.top_periscope = new MyCircle(this.scene, 40);
	this.wing = new MyTrapeze(this.scene);
	this.helice_right = new MyHelice(this.scene);
	this.helice_left = new MyHelice(this.scene);
	this.torpedo = new MyTorpedo(this.scene);

 	this.initBuffers();
 }

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor = MySubmarine;

MySubmarine.prototype.rotate = function(val)
{
	if (this.general_speed.toFixed(3) != 0)
	{
		this.rotation += val * Math.PI / 180.0;
	}
};

MySubmarine.prototype.move = function(val)
{
	this.general_speed += val;
};

MySubmarine.prototype.slope = function(val)
{
	if (this.general_speed.toFixed(3) != 0)
	{
		this.inclination += val * Math.PI / 180;
		if (this.inclination > Math.PI / 3)
		{
			this.inclination = Math.PI / 3;
		}
		else if (this.inclination < -Math.PI / 3)
		{
			this.inclination = -Math.PI / 3;
		}
	}
};

MySubmarine.prototype.upPeriscope = function(val)
{
	this.periscope_new_height = 1.5;
};

MySubmarine.prototype.downPeriscope = function(val)
{
	this.periscope_new_height = 0.3;
};

MySubmarine.prototype.fireTorpedo = function()
{
	this.torpedo.launch();
};


MySubmarine.prototype.initBuffers = function() {
 	this.vertices = [
	 	0.5, 0.3, 0,
	 	-0.5, 0.3, 0,
	 	0, 0.3, 2
 	];

 	this.indices = [
 		0, 1, 2
 	];

 	this.normals = [
 		0,0,1,
 		0,0,1,
 		0,0,1
 	];

 	this.texCoords = [
 		this.minS, this.maxT,
		this.maxS, this.maxT,
		this.minS, this.minT,
		this.maxS, this.minT
  	];


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};

MySubmarine.prototype.display = function()
{
	this.scene.pushMatrix();

		this.scene.translate(this.x_position, this.y_position, this.z_position);
		this.scene.rotate(this.rotation, 0, 1, 0);
		this.scene.rotate(-this.inclination, 1, 0, 0);

		//body
		this.scene.pushMatrix();
			this.scene.scale(1, 1, 4.08);
			this.main_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, -1.2, 1);
			this.torpedo.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(0, 0, 4.08);
		    this.scene.scale(1, 1, 0.92);
			this.front_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.scale(1, 1, 0.92);
			this.back_body.display(); 
		this.scene.popMatrix();

		//tower
		this.scene.pushMatrix();
		    this.scene.translate(0, 0.57, 2.5);
			this.scene.scale(0.5, 1, 0.88);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.tower.display(); 
		    this.scene.translate(0, 0, 1);
			this.top_tower.display(); 
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, 1.2, 2.5);
			this.scene.rotate(Math.PI,1, 0, 0);
	    	this.scene.rotate(Math.PI / 2,0, 1, 0);
			this.wing.display();
		this.scene.popMatrix();

		//periscope
		this.scene.pushMatrix();
			this.scene.translate(0, 1.57, 2);
			this.scene.rotate(-Math.PI / 2, 1, 0, 0);
			this.scene.scale(0.05, 0.05, this.periscope_actual_height);
			this.periscope_vert.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0, this.periscope_actual_height + 1.5, 1.75);
			this.scene.scale(0.05, 0.05, 0.2);
			this.periscope_hor.display();
		this.scene.popMatrix();

		//wings
		this.scene.pushMatrix();
			this.scene.translate(0,0,4.15);
	    	this.scene.rotate(Math.PI, 1, 0, 0);
	    	this.scene.rotate(Math.PI / 2,0, 1, 0);
	    	this.scene.scale(1.5, 1.5, 1.5);
	 		this.wing.display();
	 		this.scene.rotate(Math.PI / 2, 1, 0, 0);
	 		this.wing.display();
		this.scene.popMatrix();

		// helice
		this.scene.pushMatrix();
			this.scene.translate(1.4,-0.6,4.15);
	    	this.scene.rotate(Math.PI,0, 1, 0);
	    	this.scene.scale(0.5, 0.5, 0.5);
	    	this.helice_right.display();
	    	this.scene.translate(5.4,0,0);
	    	this.helice_left.display();
		this.scene.popMatrix();

	this.scene.popMatrix();

}

MySubmarine.prototype.updatePosition = function(deltaTime)
{
	this.x_position += this.general_speed * Math.cos(this.rotation - Math.PI / 2);
	this.y_position += this.general_speed * Math.sin(this.inclination);
	this.z_position += this.general_speed * Math.sin(this.rotation + Math.PI / 2);

	this.helice_right.update(deltaTime, this.general_speed);
	this.helice_left.update(deltaTime, -this.general_speed);

	if (this.periscope_actual_height.toFixed(2) > this.periscope_new_height)
	{
		this.periscope_actual_height -= 0.2;
	}
	else if (this.periscope_actual_height.toFixed(2) < this.periscope_new_height)
	{
		this.periscope_actual_height += 0.2;	
	}
	this.torpedo.updatePosition();
}