(function(module) {
  var repoView = {};
  var ui = function() {
    var $about = $('#about');
    $about.find('ul').empty();
    $about.show().siblings().hide();
  };
  var render = function(repo) {
      return repo.html_url;
  };
  repoView.index = function() {
    ui();
    $('#about ul').append(
      repos.with('html_url').map(render)
    );
  };

  module.repoView = repoView;
})(window);
