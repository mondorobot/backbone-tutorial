define([
  'app/views/common',
  'text!templates/home.html'
],
function(
  CommonView,
  homeTemplate
) {

  'use strict';

  var HomeView = CommonView.extend({
    'template': _.template(homeTemplate),

    'events': {
      'click .click_me': 'doSomething'
    },

    'doSomething': function(e) {
      e.preventDefault();
      alert('I did something!');
    }
  });

  return HomeView;
});
