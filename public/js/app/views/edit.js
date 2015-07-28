define([
  'app/views/common',
  'text!templates/edit.html'
],
function(
  CommonView,
  editTemplate
) {

  'use strict';

  var PostEditView = CommonView.extend({
    'template': _.template(editTemplate),

    'events': {
      'input .model-binding': 'update',
      'click .save': 'save',
    },

    'initialize': function() {
      this.listenTo(this.model, 'sync', this.render, this);
    },

    'update': function(e) {
      var $input = $(e.currentTarget);

      var field = $input.attr('name');
      var value = $input.val();

      console.log('Set: '+field+'='+value);

      this.model.set(field, value);
    },

    'save': function(e) {
      e.preventDefault();

      console.log("saving...");

      var data = this.model.toJSON();

      this.model.save(data, {
        'success': function() {
          alert("Save successful.");
        }
      });
    },
  });

  return PostEditView;
});
