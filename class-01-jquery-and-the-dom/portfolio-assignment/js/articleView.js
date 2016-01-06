// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.handleMainNav = function() {
  // TODO: Add an event handler to .main-nav element that will power the Tabs feature.
  //       Clicking any .tab element should hide all the .tab-content sections, and then reveal the
  //       single .tab-content section that is associated with the clicked .tab element.
  //       So: You need to dynamically build a selector string with the correct ID, based on the
  //       data available to you on the .tab element that was clicked.
  $('.main-nav').on('click', function(e) {
   //console.log($('.main-nav .tab:first').attr('data-content'));

  });

  $('.main-nav .tab').on('click', function() {
   console.log($(this).attr('data-content'));
   var content = $(this).attr('data-content');

   if (content == 'about') {
     $('article.populated').css('display', 'none');
     $('#about').fadeIn(300);
   } else if (content == 'articles') {
     $('article.populated').fadeIn(300);
     $('#about').css('display', 'none');
   }
  });


  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
 articleView.handleMainNav();
});
