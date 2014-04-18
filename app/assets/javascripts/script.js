// Globals object

var GLOBALS = {};
GLOBALS.pageHeight = window.innerHeight;
GLOBALS.pageWidth = window.innerWidth;
transform = "webkitTransform" || "mozTransform";
transition = "webkitTransition" || "mozTansition";
transEnd = "webkitTransitionEnd"

$(document).ready(function(){

// homepage slides

	var styles = {
      		transform : "translate3d(0, 1000px, 0)",
      		transition : "all 1s ease-in-out"
   	 };
	
	$('.nav-arrow').each(function(index, value){

		$('#nav-arrow-' + index).click(function(){

			$('.homepage-slide').each(function(i, v){
				console.log(i, v);
				
				$('#slide-' + i).css( styles );			
				$('#slide-' + i).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
					$('#slide-' + i).attr("style","");  
				})
			})
		})
	})
});

