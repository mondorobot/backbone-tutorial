define([
  'app/models/post_model',
  'app/models/post_collection',

  'app/views/home',
  'app/views/controls',
  'app/views/list',
  'app/views/show',
  'app/views/edit',
],
function(
  PostModel,
  PostCollection,

  HomeView,
  PostControlsView,
  PostListView,
  PostShowView,
  PostEditView
) {

  'use strict';

  var MainRouter = Backbone.Router.extend({
    'routes': {
      'posts/:id/edit': 'postEdit',
      'posts/:id': 'postShow',
      'posts': 'postList',
      '': 'home'
    },

    'home': function() {
      // just using a dummy model here
      var model = new Backbone.Model({
        'greeting': 'Bonjour'
      });

      var view = new HomeView({
        'model': model
      });

      $('.app').html(view.render().$el);
    },

    'postList': function() {
      var posts = new PostCollection();

      var controls = new PostControlsView({
        'collection': posts
      });

      var list = new PostListView({
        'collection': posts
      });

      list.render();
      controls.render();

      $('.app').empty();
      $('.app').append(controls.$el);
      $('.app').append(list.$el);

      posts.fetch();
    },

    'postShow': function(postId) {
      var post = new PostModel({
        'id': postId
      });

      var view = new PostShowView({
        'model': post
      });

      $('.app').html(view.$el);

      post.fetch();
    },

    'postEdit': function(postId) {
      var post = new PostModel({
        'id': postId
      });

      var view = new PostEditView({
        'model': post
      });

      $('.app').html(view.$el);

      post.fetch();
    },
  });

  return MainRouter;
});
