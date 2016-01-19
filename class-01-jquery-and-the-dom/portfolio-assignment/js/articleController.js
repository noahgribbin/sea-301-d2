(function(module) {
  var articlesController = {};

  articlesController.index = function() {
    Project.fetchAll(articleView.initIndexPage);
    $('#about').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
