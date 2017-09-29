/**
 * MyTorpedo
 * @constructor
 */
function MyTorpedo(scene)
 {
 	CGFobject.call(this,scene);

	this.main_body = new MyCylinder(this.scene, 40, 20);
	this.front_body = new MyLamp(this.scene, 40, 20);
	this.back_body = new MyLamp(this.scene, 40, 20);
	this.wing = new MyTrapeze(this.scene);
	
	this.is_fired = false;
	this.z_position = 0;
	this.inclination = 0;
	this.rotation = 0;

	this.target_x_position = 0;
	this.target_z_position = 0;

 	this.initBuffers();
 }

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.launch = function()
{
	// this.target_x_position = target.getXPosition();
	// this.target_z_position = target.getZPosition();
	this.z_position = 0;
	this.is_fired = true;
}

MyTorpedo.prototype.display = function()
{
	if (!this.is_fired)
	{
		return;
	}

	this.scene.pushMatrix();

		this.scene.translate(0, 0, this.z_position);
		// this.scene.rotate(this.rotation, 0, 1, 0);
		// this.scene.rotate(-this.inclination, 1, 0, 0);

		//body
		this.scene.pushMatrix();
			this.scene.scale(0.35, 0.25, 1.25);
			this.main_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		    this.scene.translate(0, 0, 1.25);
		    this.scene.scale(0.35, 0.25, 0.45);
			this.front_body.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.rotate(Math.PI, 0, 1, 0);
			this.scene.scale(0.35, 0.25, 0.45);
			this.back_body.display(); 
		this.scene.popMatrix();

		//wings
		this.scene.pushMatrix();
			this.scene.translate(0,0,1.5);
	    	this.scene.rotate(Math.PI, 1, 0, 0);
	    	this.scene.rotate(Math.PI / 2,0, 1, 0);
	    	this.scene.scale(0.5, 0.5, 0.5);
	 		this.wing.display();
	 		this.scene.rotate(Math.PI / 2, 1, 0, 0);
	 		this.wing.display();
		this.scene.popMatrix();

	this.scene.popMatrix();

}

MyTorpedo.prototype.updatePosition = function(deltaTime)
{
	if (this.is_fired)
	{
		this.z_position -= 0.4;
		if (this.z_position < -15)
		{
			this.z_position = 0;
			this.is_fired = false;
		}
	}
	return false;
}
