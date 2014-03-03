window.addEventListener( 'load', function() {
	      $('ul').roundabout();
		  $('ul').roundabout("setTilt",	 -5.0);
		 /*  $('ul').roundabout("animationEasing", "easeInBounce"); */
		   $('ul').roundabout("animateToNearestChild", 6000, "easeInBounce");
		  
		  console.log( 'window#load' );
});
