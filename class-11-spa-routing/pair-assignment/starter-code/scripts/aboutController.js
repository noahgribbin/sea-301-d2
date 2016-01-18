(function(module) {
  var aboutController = {};

  // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
  aboutController.index = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('#articles').hide();
      $('#about').fadeIn();
    });
    $('.main-nav .tab:first').click();
  };

  module.aboutController = aboutController;
})(window);
