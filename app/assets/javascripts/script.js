$(document).ready(function(){
  
// carousel

    $('.carousel').carousel({
      interval: 3000
    });
  
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
});

