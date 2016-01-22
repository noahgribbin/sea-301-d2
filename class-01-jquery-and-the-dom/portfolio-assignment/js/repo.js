(function(module) {
  var repos = {};
  repos.all = [];
  repos.requestRepos = function(callback) {
    $.ajax({
       url: 'https://api.github.com/users/noahgribbin/repos' +
             '?per_page=5&sort=updated',
       type: 'GET',
       headers: { 'Authorization': 'token ' + githubToken },
       success: function(data, message, xhr) {
         repos.all = data;
         console.log(data[0].html_url);
         $('#about ul ').append(

         )
        }
      })
      .done(callback);
  };
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };
  module.repos = repos;
})(window);
