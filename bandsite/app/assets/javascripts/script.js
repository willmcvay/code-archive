$(document).ready(function(){
  
// carousel

    $('.carousel').carousel({
      interval: 3000
    });
  
// accordion

    $("#accordion").accordion()

// isotope

 $(function(){

      var $container = $('#isotopecontainer');
      
      $container.isotope({
        resizable: false, 
        itemSelector: '.item-isotope',
        masonry: {
          columnWidth: $container.width() / 3
        }
      });

      $(window).smartresize(function(){
        $container.isotope({
          masonry: { columnWidth: $container.width() / 3 
          }
        });
      });
  
      $container.delegate( '.item-isotope', 'click', function(){
        $(this).toggleClass('large');
        $container.isotope('reLayout');
      });
   });

 // Photogallery

$(".fancybox").fancybox({
    helpers : {
        overlay : {
            css : {
                'background' : 'rgba(255, 246, 143, 0.8)'
            }
        }
    }
});

  $('.darken').hover(function() {
      $(this).find('img').fadeTo(500, 0.5);
        }, function() {
      $(this).find('img').fadeTo(500, 1);
    });



});

