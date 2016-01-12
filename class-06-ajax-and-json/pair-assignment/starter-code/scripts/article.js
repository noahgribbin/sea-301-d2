  function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.all = [];

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Article.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Article.all.push(new Article(ele));
  });
}
// This function will retrieve the data from either a local or remote source,
// and process it, then hand off control to the View.
Article.fetchAll = function() {
  var etag = ''
  $.ajax('/data/hackerIpsum.json',{
    method:'HEAD',
    success:function(data, textsStatus, xhr){
      console.log(xhr.getResponseHeader('eTag'));
      // localStorage.etag = xhr.getResponseHeader('eTag');
      etag = xhr.getResponseHeader('eTag');
    }
  });
  if (localStorage.etag == etag) {
    Article.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();

    // When rawData is already in localStorage,
    // we can load it with the .loadAll function above,
    // and then render the index page (using the proper method on the articleView object).

    // articleView.someFunctionToCall; //DONE: What method do we call to render the index page?
  } else {

    // DONE: When we don't already have the rawData,
    // we need to retrieve the JSON file from the server with AJAX (which jQuery method is best for this?),
    // cache it in localStorage so we can skip the server call next time,
    // then load all the data into Article.all with the .loadAll function above,
    // and then render the index page.
    $.getJSON('/data/hackerIpsum.json',function(rawData){
      Article.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      localStorage.etag = etag;
      articleView.initIndexPage();

    });
  }
}
