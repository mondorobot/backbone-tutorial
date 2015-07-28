define([
  'app/views/common',
  'text!templates/show.html'
],
function(
  CommonView,
  showTemplate
) {
  var PostShowView = CommonView.extend({
    'template': _.template(showTemplate),

    'initialize': function() {
      this.listenTo(this.model, 'sync', this.render, this);
    },
  });

  return PostShowView;
});
