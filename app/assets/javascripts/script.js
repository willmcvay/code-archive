$(document).ready(function(){
  
// carousel

    $('.carousel').carousel({
      interval: 3000
    });
  
// isotope



  $('#isotopecontainer').isotope({
    itemSelector: '.item-isotope',
});




// $('#isotopecontainer').isotope({
//     // disable window resizing
//     itemSelector: '.item',
//     resizable: false,
//     masonry: {
//       columnWidth: 60
//     }
//   });

});

