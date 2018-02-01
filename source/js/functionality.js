$(document).ready(function(){


/* ==========================================================================
   StickyFooter
   ========================================================================== */

function stickyFooter() {
  $('body').css('margin-bottom', $('.site-info').outerHeight()); 
}
stickyFooter();
didResize = false;
$(window).resize(function() {
  didResize = true;
});
setInterval(function() {
  if(didResize) {
    didResize = false;
    stickyFooter();
  }
}, 250);

    
}); // End of doc ready