define(function() {

  'use strict';

  var CommonView = Backbone.View.extend({
    'render': function() {
      if (this.model) {
        var data = this.model.toJSON()
      }
      else {
        var data = {};
      }

      var content = this.template(data);

      this.$el.html(content);

      return this;
    }
  });

  return CommonView;
});
