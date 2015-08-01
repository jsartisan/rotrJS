// Create an immediately invoked functional expression to wrap our code
(function() {

	this.items = [];
  // Define our constructor
  this.Rotr = function(element,options) {

	// Create global element references
	this.el = document.querySelector(element);

	// Define option defaults
	var defaults = {
		xInverse: false,
		yInverse: false,
		speed : 0.09,
		translate : false,
		vertical : true,
		horizontal : true
	};

	console.log(this);

	this.centerPos = getCenterEl(this.el);

	// Create options by extending defaults with the passed in arugments
	if (arguments[1] && typeof arguments[1] === "object") {
		this.options = extendDefaults(defaults, arguments[1]);
	}

	items.push(this);
}

Rotr.prototype.move = function(mousePos){
	// Get Relative Movement of mouse relative to center of the element
	relMov = getRelativeMovement(mousePos,this.centerPos,this.options.speed);
	
	transform = getTransformProperty(this.el);

	this.el.style.WebkitPerspective = "300px";
	this.el.style.perspective = "300px";

	this.el.style[transform] = 'rotateX(' + relMov.y + 'deg ) rotateY(' + relMov.x + 'deg )' ;
	
}

  // Utility method to extend defaults with user options
  function extendDefaults(source, properties) {
	var property;
	for (property in properties) {
		if (properties.hasOwnProperty(property)) {
			source[property] = properties[property];
		}
	}
	return source;
  }

  function getCenterEl(el){
  	return {
  		x : (el.clientWidth/2) + el.offsetLeft,
  		y : (el.clientHeight/2) + el.offsetTop
  	};
  }

  function getRelativeMovement(mousePos,centerEl,speed){
  	return {
  		x :( mousePos.x - centerEl.x ) * speed,
  		y :( mousePos.y - centerEl.y) * speed
  	}
  }

  // http://www.zachstronaut.com/posts/2009/02/17/animate-css-transforms-firefox-webkit.html
  function getTransformProperty(element) {
	    // Note that in some versions of IE9 it is critical that
	    // msTransform appear in this list before MozTransform
	    var properties = [
	        'transform',
	        'WebkitTransform',
	        'msTransform',
	        'MozTransform',
	        'OTransform'
	    ];
	    var p;
	    while (p = properties.shift()) {
	        if (typeof element.style[p] != 'undefined') {
	            return p;
	        }
	    }
	    return false;
	}


  function init(){
	initEvents();
  }

  function initEvents(){

  	// Attaches the mouse move listener 
	window.addEventListener('mousemove',function(event){
		
		mousePos = getMousePositions(event);

		items.forEach(function(value,index,items){
			value.move(mousePos);
		});
	});
  }

  function getMousePositions(ev){
	return {
		x : ev.pageX,
		y : ev.pageY
	}
  }

  init();

}());
