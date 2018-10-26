// intializing plugins and JS

window.addEventListener( 'load', function() {
	$('ul.roundabout-elements').roundabout();
	$('ul.roundabout-elements').roundabout("setTilt",  -7.0);
	dropdownMenu();
});

// dropdown 

function dropdownMenu () {
	var heightChange = $( window ).height() - 40;
	console.log(heightChange);
	$('#our-work-dropdown').click(function() {
  		$( "#our-work-dropdown" ).animate({
			opacity: 0.25,
			height: heightChange + 'px;'
			}, 3000)

	});	
}



 // Photogallery

// $(".fancybox").fancybox({
//     helpers : {
//         overlay : {
//             css : {
//                 'background' : 'rgba(255, 246, 143, 0.8)'
//             }
//         }
//     }
// });

  // $('.darken').hover(function() {
  //     $(this).find('img').fadeTo(500, 0.5);
  //       }, function() {
  //     $(this).find('img').fadeTo(500, 1);
  //   });





