var projects = [];

function Project (opts) {
this.title = opts.title;
this.publishedOn = opts.publishedOn;
this.photo = opts.photo;
this.body = opts.body;

}

Project.prototype.toHtml = function() {
  var appTemplate = $("#blog-entries").html();
  var compileTemplate = Handlebars.compile(appTemplate);
  var dataSource = this;
  var html = compileTemplate(dataSource);

  return html;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#blog-area').append(a.toHtml())
});
