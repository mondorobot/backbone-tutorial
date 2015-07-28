var SERVER_URL = $('.server_url').val().replace(/\/$/, '');

require.config({
  'waitSeconds': 0,
  'baseUrl': 'js'
});

require([
  'app/router'
],
function(
  MainRouter
) {

  'use strict';

  var router = new MainRouter();

  Backbone.history.start();
});
