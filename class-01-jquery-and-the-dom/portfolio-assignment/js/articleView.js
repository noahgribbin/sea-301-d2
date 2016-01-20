// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.handleMainNav = function() {
  // TODO:
  $('.main-nav').on('click', function(e) {
   //console.log($('.main-nav .tab:first').attr('data-content'));

  });

  $('.main-nav .tab').on('click', function() {
   console.log($(this).attr('data-content'));
   var content = $(this).attr('data-content');

   if (content == 'about') {
     $('#articles').css('display', 'none');
     $('#about').fadeIn(300);
   } else if (content == 'articles') {
     $('#articles').fadeIn(300);
     $('#about').css('display', 'none');
   }
  });


  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};
articleView.toggleNav = function(){
   // console.log("Toggle");
   $('#hamburger').on('click', function(){
   $('nav').toggle();
   })
 };
articleView.initIndexPage = function() {
  Project.all.forEach(function(a){
    $('#articles').append(a.toHtml())
  });
}

// TODO: Call all of the above functions, once we are sure the DOM is ready.
$(document).ready(function() {
 articleView.handleMainNav();
 articleView.toggleNav();
 articleView.initIndexPage();
});
