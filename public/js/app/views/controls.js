define([
  'app/views/common',
  'text!templates/controls.html'
],
function(
  CommonView,
  controlsTemplate
) {

  'use strict';

  var PostControlsView = CommonView.extend({
    'template': _.template(controlsTemplate),

    'events': {
      'form submit': 'preventSubmit',
      'change .field': 'runFilter',
      'input .query': 'runFilter'
    },

    'preventSubmit': function(e) {
      e.preventDefault();
    },

    'runFilter': function() {
      var field = this.$('.field').val();
      var query = this.$('.query').val();

      console.log("field");
      console.log(field);
      console.log("query");
      console.log(query);

      var q = {};
      q[field] = query;
      this.collection.fetch({
        'data': {
          'q': q
        }
      });
    },
  });

  return PostControlsView;
});
