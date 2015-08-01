// Self Invoking Anonymous Function
(function() {

	this.items = [];

	// Rotr Constructor Function
	this.Rotr = function(element,options)
	{
		// HTML DOM Element
		this.el = document.querySelector(element);

		// tranform property
		this.transform = getTransformProperty(this.el);

		// center position of the element relative to the document
		this.centerPos = getCenterEl(this.el);

		// Define  defaults
		var defaults = {
			xInverse: false,
			yInverse: false,
			speed : 0.09,
			translate : true,
			rotate : true,
			vertical : true,
			horizontal : true
		};

		
		// Create options by extending defaults with the passed in arugments
		if (arguments[1] && typeof arguments[1] === "object") 
		{
			this.options = extendDefaults(defaults, arguments[1]);
		}

		// Setting xInverse and yInvese Directins
		this.options.xInverse = this.options.xInverse ? -1 : 1;
		this.options.yInvese = this.options.yInvese ? -1 : 1;

		// setting vertical and horizontal restictions
		this.options.vertical = this.options.vertical ? 1 : 0;
		this.options.horizontal = this.options.horizontal ? 1 : 0;

		// setting rotate and translate restictions
		this.options.translate = this.options.translate ? 1 : 0;
		this.options.rotate = this.options.rotate ? 1 : 0;

		// add to items array
		items.push(this);
	}

	Rotr.prototype.move = function(mousePos)
	{
		// Get Relative Movement of mouse relative to center of the element
		relMov = getRelativeMovement(mousePos,this);

		this.el.style.WebkitPerspective = "1000px";

		this.el.style.perspective = "1000px";

		applyTransform(this,relMov);
	
	}	
	
	function applyTransform(obj,relMov)
	{
		// translate
		obj.el.style[obj.transform] = 	'translateX(' + relMov.x * obj.options.horizontal * obj.options.translate + 'px ) ' ;
		obj.el.style[obj.transform] += 	'translateY(' + relMov.y * obj.options.vertical * obj.options.translate + 'px ) ';
		
		// rotate
		obj.el.style[obj.transform] += 'rotateX(' + relMov.y * obj.options.vertical * obj.options.rotate + 'deg ) ' 
		obj.el.style[obj.transform] += ' rotateY(' + relMov.x * obj.options.horizontal * obj.options.rotate + 'deg )';
	}


	// Return Mouse Position relative to the document
	function getMousePositions(ev)
	{
		return {
			x : ev.pageX,
			y : ev.pageY
		}
	}

	// returns center position of the element relative to the document
	function getCenterEl(el)
	{
		return {
			x : (el.clientWidth/2) + el.offsetLeft,
			y : (el.clientHeight/2) + el.offsetTop
		};
	}

	// returns the relative movment of mouse relative to the center of the lement
	function getRelativeMovement(mousePos,obj)
	{
		return {
			x :( mousePos.x - obj.centerPos.x ) * obj.options.speed * obj.options.xInverse,
			y :( mousePos.y - obj.centerPos.y) * obj.options.speed * obj.options.yInvese
		}
	}

	// http://www.zachstronaut.com/posts/2009/02/17/animate-css-transforms-firefox-webkit.html
	function getTransformProperty(element) 
	{
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

		while (p = properties.shift()) 
		{
			if (typeof element.style[p] != 'undefined')
			 {
				return p;
			}
		}

		return false;
	}


	// Utility method to extend defaults with user options
	function extendDefaults(source, properties) 
	{
		var property;

		for (property in properties) 
		{
			if (properties.hasOwnProperty(property)) 
			{
				source[property] = properties[property];
			}
		}

		return source;
	}

	// intialize event
	function initEvents()
	{
		// Attaches the mouse move listener 
		window.addEventListener('mousemove',function(event){

			mousePos = getMousePositions(event);

			// call move method for each rotr obj
			items.forEach(function(value,index,items)
			{
				value.move(mousePos);
			});
		});
	}

	// Initiate 
	initEvents();

}());
