var projects = [];

function Project (opts) {
this.title = opts.title;
this.publishedOn = opts.publishedOn;
this.body = opts.body;
this.image = opts.image;
this.imageUrl = opts.imageUrl;
}
Project.all = [];
Project.prototype.toHtml = function() {
  var appTemplate = $("#blog-entries").html();
  var compileTemplate = Handlebars.compile(appTemplate);
  var dataSource = this;
  var html = compileTemplate(dataSource);

  return html;
}
Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
  Project.all.push(new Project(ele));
    });
}

Project.fetchAll = function() {
  var etag = ''
  $.ajax('projectList.json',{
    method:'HEAD',
    success:function(data, textsStatus, xhr){
      console.log(xhr.getResponseHeader('eTag'));
      // localStorage.etag = xhr.getResponseHeader('eTag');
      etag = xhr.getResponseHeader('eTag');
    }
  });
  if (localStorage.etag == etag) {
    Project.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();

  } else {

    $.getJSON('projectList.json',function(rawData){
      Project.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      localStorage.etag = etag;
      articleView.initIndexPage();

    });
  }
}
