$(document).ready(function(){
  
// carousel

    $('.carousel').carousel({
      interval: 5000
    });
  
// isotope



    $('.isotopecontainer').isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows',
    masonryHorizontal: {
      columnWidth: 300,
      gutterWidth: 20
    }
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

