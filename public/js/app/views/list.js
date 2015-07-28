define([
  'app/views/common',
  'app/views/item',
  'text!templates/list.html'
],
function(
  CommonView,
  PostItemView,
  postTemplate
) {

  'use strict';

  var PostListView = CommonView.extend({
    'tagName': 'table',

    'className': 'table table-striped',

    'template': _.template(postTemplate),

    'initialize': function() {
      this.listenTo(this.collection, 'sync', this.render, this);
    },

    'render': function() {
      CommonView.prototype.render.apply(this, arguments);

      this.renderItems();
    },

    'renderItems': function() {
      this.collection.each(this.renderItem, this);
    },

    'renderItem': function(postModel) {
      var itemView = new PostItemView({
        'model': postModel
      });

      this.$('tbody').append(itemView.render().$el);
    },
  });

  return PostListView;
});
