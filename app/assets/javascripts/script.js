// Globals object

var GLOBALS = {};
var pageHeight = window.innerHeight;
var pageWidth = window.innerWidth;
var transform = "webkitTransform" || "mozTransform";
var transition = "webkitTransition" || "mozTansition";
var transEnd = "webkitTransitionEnd"

$(document).ready(function(){

// homepage slides
	var transStyles = {
      		transform : "translate3d(0," + pageHeight + "px, 0)",
      		transition : "all 1s ease-in-out"
   	 };
	
	$('.nav-arrow').each(function(index, value){

		$('#nav-arrow-' + index).click(function(){

			$('.homepage-slide').each(function(i, v){
				console.log(i, v);
				
				$('#slide-' + i).css( transStyles );			
				$('#slide-' + i).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
					$('#slide-' + i).css( "top", "+=" + pageHeight );
					$('#slide-' + i).css( transform, "");
					$('#slide-' + i).css( transition, "");
				})
			})
		})
	})
});

