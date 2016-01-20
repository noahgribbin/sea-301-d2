(function(module) {
  var articlesController = {};

  articlesController.index = function() {
    Project.fetchAll(articleView.initIndexPage);
    console.log('hello');
    $('#about').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
