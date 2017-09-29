/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');	
	this.gui.add(this.scene, 'is_clock_working');	

	// add a group of controls (and open/expand by defult)
	
	var lights_group = this.gui.addFolder("Luzes");
	lights_group.open();

	// add two check boxes to the lights_group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	lights_group.add(this.scene, 'light0');
	lights_group.add(this.scene, 'light1');
	lights_group.add(this.scene, 'light2');
	lights_group.add(this.scene, 'light3');
	lights_group.add(this.scene, 'light4');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	var textures_group = this.gui.addFolder("Textures");
    textures_group.add(this.scene, 'currSubmarineAppearance', Object.keys(this.scene.submarineAppearanceList));

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	
		case (97)://a
			this.scene.submarine.rotate(2);
			break;
		case (68):
		case (100)://d
			this.scene.submarine.rotate(-2);
			break;
		case (87):
		case (119)://s
			this.scene.submarine.move(-0.2);
			break;
		case (83):
		case (115)://w
			this.scene.submarine.move(0.2);
			break;
		case (69):
		case (101)://e
            this.scene.submarine.slope(2);
            break;
        case(81):
        case(113): //q
            this.scene.submarine.slope(-2);
            break;
        case (80):
        case (112)://p
            this.scene.submarine.upPeriscope();
            break;
        case (76):
        case (108)://l
            this.scene.submarine.downPeriscope();
            break;
        case (70): 
        case (102): //f
            this.scene.submarine.fireTorpedo();
            break;
	};
};
