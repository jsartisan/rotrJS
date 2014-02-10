
 (function($){
  $.fn.Rotranslate = function(options) {

  // Default Values

	var defaults = {
	  xInverse: false,
	  yInverse: false,
	  sensitivityMultiplier: 0.03,
	  translate: false,
	  vertical:true,
	  horizontal:true
	};

	// Merging Values of Defaults in Options

	var options = $.extend({}, defaults, options);

	// Getting the Selected Element
	var myContainer = $(this);
	var sensitivityMultiplier  = options.sensitivityMultiplier;
	var wrapperOffset = myContainer.offset();

	// Calculating the Container Center relative to Window Size
	var CenterX = wrapperOffset.left + (myContainer.width()/2) ;
	var CenterY = wrapperOffset.top + (myContainer.height()/2) ;

	$(window).mousemove(function(e) {
	
		// Getting Current Mouse Positions
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		doAwesomeness(mouseX,mouseY);
	});

	function doAwesomeness(mouseX,mouseY){

		if( options.translate == true  ){

			if(options.horizontal == false){
				var RelX = 0;
			}else if(options.xInverse == true){
				var RelX = ( ( mouseX - CenterX ) * -1 ) * sensitivityMultiplier;
			}else{
				var RelX = ( mouseX - CenterX ) * sensitivityMultiplier;
			}

			if(options.vertical == false){
				var RelY = 0;
			}else if(options.yInverse == true){
				var RelY = ( ( mouseY - CenterY ) * -1 ) * sensitivityMultiplier; 
			}else{
				var RelY =  ( mouseY - CenterY ) * sensitivityMultiplier; 
			}

			myContainer.css('-webkit-transform', 'perspective(1000px) translateY(' + RelY + 'px) translateX(' + RelX + 'px) ' );
			myContainer.css('transform', 'perspective(1000px) translateY(' + RelY + 'px) translateX(' + RelX + 'px)' );
		
		}else{

			if(options.xInverse == true){
				var RelY =  ( mouseY - CenterY ) * sensitivityMultiplier; 
			}else{
				var RelY = ( ( mouseY - CenterY ) * -1 ) * sensitivityMultiplier; 
			}

			if(options.yInverse == true){
				var RelX = ( mouseX - CenterX ) * sensitivityMultiplier;
			}else{
				
				var RelX = ( ( mouseX - CenterX ) * -1 ) * sensitivityMultiplier;
			}

			myContainer.css('-webkit-transform', 'perspective(1000px) rotateY(' + RelX + 'deg) rotateX(' + RelY + 'deg)' );
	    	myContainer.css('transform', 'perspective(1000px) rotateY(' + RelX + 'deg) rotateX(' + RelY + 'deg)' );
		}
		
	};


  };
})(jQuery);
		
