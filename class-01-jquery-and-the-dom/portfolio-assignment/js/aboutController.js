(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('#articles').hide();
    $('#about').fadeIn();
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
