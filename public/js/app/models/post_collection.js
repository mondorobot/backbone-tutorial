define(function() {
  var PostCollection = Backbone.Collection.extend({
    'url': SERVER_URL+'/posts',

    'parse': function(data) {
      this.pageSize = data.length;

      return data.results;
    }
  });

  return PostCollection;
});
