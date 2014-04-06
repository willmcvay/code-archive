$(document).ready(function(){
        $('ul').roundabout();
      $('ul').roundabout("setTilt",  -5.0);
     /*  $('ul').roundabout("animationEasing", "easeInBounce"); */
       $('ul').roundabout("animateToNearestChild", 6000, "easeInBounce");
      
      console.log( 'window#load' );

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



});

