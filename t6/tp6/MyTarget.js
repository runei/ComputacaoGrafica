/**
 * MyTarget
 * @constructor
 */
function MyTarget(scene, x_position, z_position) {
    CGFobject.call(this, scene);

    this.cube = new MyUnitCubeQuad(scene);
    this.x_position = x_position;
    this.z_position = z_position;
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.translate(this.x_position, 0.5, this.z_position);
        // this.scene.scale(2,2,2);
        this.cube.display();
    this.scene.popMatrix();
};

MyTarget.prototype.getXPosition = function() {
    return this.x_position;
};

MyTarget.prototype.getZPosition = function() {
    return this.z_position;
};