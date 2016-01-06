var projects = [];

function Project (opts) {
this.title = opts.title;
this.publishedOn = opts.publishedOn;
this.photo = opts.photo;
this.body = opts.body;

}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();

$newProject.data('title', this.title);
$newProject.data('publishedOn', this.publishedOn);
$newProject.data('body', this.body);


$newProject
$newProject.find('h1').html(this.title);
$newProject.find('time[pubdate]').attr('title', this.publishedOn);
$newProject.find('time').html(this.publishedOn);
$newProject.find('section.article-body').html(this.body);

$newProject.append('<hr>');

$newProject.removeClass('template');

return $newProject;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#articles').append(a.toHtml())
});
