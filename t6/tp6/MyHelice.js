/**
 * MyHelice
 * @constructor
 */
function MyHelice(scene) {
    CGFobject.call(this, scene);
    this.cylinder = new MyCylinder(scene, 40, 20);
    this.cube = new MyUnitCubeQuad(scene);
    this.lamp = new MyLamp(scene, 16, 8);
    this.alfa = 0;
};

MyHelice.prototype = Object.create(CGFobject.prototype);
MyHelice.prototype.constructor = MyHelice;

MyHelice.prototype.display = function() {
    this.scene.pushMatrix();
        this.scene.pushMatrix();
            this.cylinder.display();
        this.scene.popMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.pushMatrix();
            this.scene.rotate(this.alfa * Math.PI / 180.0, 0, 0, 1);
            this.scene.scale(0.25, 1.85, 0.5);
            this.cube.display();
        this.scene.popMatrix();
        this.scene.scale(0.35, 0.35, 0.8);
        this.lamp.display();
    this.scene.popMatrix();
};

MyHelice.prototype.update = function(deltaTime, speed) {
    this.alfa += ((deltaTime % 360) * 0.2 * speed);
    this.alfa %= 360;
};