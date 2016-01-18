(function(module) {
  function Article (opts) {
    // DONE: Here, we are using Functional Programming to DRY out our property assignment.  ALL of the properties of our 'opts' object will now be assigned as properties of the newly created article object.
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Article.all = [];

  Article.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);

    return template(this);
  };

<<<<<<< HEAD
  // DONE: Set up a DB table for articles.
=======
  // TODO: Setup a DB table for our articles.  Be sure to include all of the required fields and their associated constraints.
>>>>>>> ff2c2b19e57c41072192072a11bfa6564f40a7d4
  Article.createTable = function(callback) {
    webDB.execute('CREATE TABLE IF NOT EXISTS articles(title VARCHAR, category VARCHAR, author VARCHAR, authorUrl VARCHAR (255), publishedOn DATE, body TEXT);',
      function(result) {
        console.log('Successfully set up the articles table.', result);
        if (callback) callback();
      }
    );
  };

  // DONE: Correct the SQL to delete all records from the articles table.
  Article.truncateTable = function(callback) {
    webDB.execute('DELETE FROM articles;',
      callback
    );
  };


<<<<<<< HEAD
  // DONE: Insert an article instance into the database:
=======
  // TODO: Insert an article instance into the database.  Be sure to make the values of each record dynamic.
>>>>>>> ff2c2b19e57c41072192072a11bfa6564f40a7d4
  Article.prototype.insertRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO articles (title, category, author, authorUrl, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
          'data': [this.title, this.category, this.author, this.authorURL, this.publishedOn, this.body]
        }
      ],
      callback
    );
  };

<<<<<<< HEAD
  // DONE: Delete an article instance from the database:
=======
  // TODO: Delete an article instance from the database.
>>>>>>> ff2c2b19e57c41072192072a11bfa6564f40a7d4
  Article.prototype.deleteRecord = function(callback) {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM articles WHERE id = ?;',
          'data': [this.id]
        }
      ],
      callback
    );
  };

<<<<<<< HEAD
  // DONE: Update an article instance, overwriting it's properties into the corresponding record in the database:
  Article.prototype.updateRecord = function(a) {
=======
  // TODO: Update an article instance, overwriting it's properties into the corresponding record in the database.
  Article.prototype.updateRecord = function(callback) {
>>>>>>> ff2c2b19e57c41072192072a11bfa6564f40a7d4
    webDB.execute(
      [
        {
          'sql': 'UPDATE articles SET title = ?, category = ?, author = ?, authorUrl = ?, publishedOn = ?, body = ? WHERE id = ?;',
          'data': [this.title, this.category, this.author, this.authorUrl, this.publishedOn, this.body, this.id]
        }
      ],
      a
    );
  };

  // DONE: Refactor to expect the raw data from the database, rather than localStorage.
  Article.loadAll = function(rows) {
    Article.all = rows.map(function(ele) {
      return new Article(ele);
    });
  };

  // DONE: Refactor this to check if the database holds any records or not. If the DB is empty,
  // we need to retrieve the JSON and process it.
  // If the DB has data already, we'll load up the data (sorted!), and then hand off control to the View.
  Article.fetchAll = function(next) {
<<<<<<< HEAD
    webDB.execute('SELECT * FROM articles', function(rows) {
=======
    webDB.execute('', function(rows) {
      // Check to see if our article has any rows
>>>>>>> ff2c2b19e57c41072192072a11bfa6564f40a7d4
      if (rows.length) {
        // Now instanitate those rows with the .loadAll function, and pass control to the view.
        Article.loadAll(rows);
        next();
      } else {
        $.getJSON('data/hackerIpsum.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var article = new Article(item); // Instantiate an article based on item from JSON
            // Cache the newly-instantiated article in DB:
              article.insertRecord();
          });
          // Now get ALL the records out the DB, with their database IDs:
          webDB.execute('SELECT * FROM articles', function(rows) {
            Article.loadAll(rows);
            next();
            // Now instanitate those rows with the .loadAll function, and pass control to the view.

          });
        });
      }
    });
  };

  Article.allAuthors = function() {
    return Article.all.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Article.numWordsAll = function() {
    return Article.all.map(function(article) {
      return article.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Article.numWordsByAuthor = function() {
    return Article.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Article.all.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\b\w+/g).length
        })
        .reduce(function(a, b) {
          return a + b;
        })
      }
    })
  };

  Article.stats = function() {
    return {
      numArticles: Article.all.length,
      numWords: Article.numwords(),
      Authors: Article.allAuthors(),
    };
  }

  module.Article = Article;
})(window);
