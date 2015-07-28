define(function() {
  var PostModel = Backbone.Model.extend({
    'urlRoot': SERVER_URL+'/posts'
  });

  return PostModel;
});
