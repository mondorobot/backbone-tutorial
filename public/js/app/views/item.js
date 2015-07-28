define([
  'app/views/common',
  'text!templates/item.html'
],
function(
  CommonView,
  itemTemplate
) {

  'use strict';

  var PostItemView = CommonView.extend({
    'tagName': 'tr',

    'template': _.template(itemTemplate),
  });

  return PostItemView;
});
