(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('.main-nav').on('click', '.tab', function(e) {
      $('#articles').hide();
      $('#about').fadeIn();
    });
    $('.main-nav .tab:first').click();
  };

  module.aboutController = aboutController;
})(window);
