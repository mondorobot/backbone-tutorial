'use strict';

var rest = require('./rest_files');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

var resources = [
  'states',
  'posts',
  'tags',
  'authors',
  'comments'
];

resources.forEach(function(slug) {
  app.get('/'+slug+'', rest.list(slug));
  app.get('/'+slug+'/:id', rest.item(slug));
  app.post('/'+slug+'', rest.create(slug));
  app.put('/'+slug+'/:id', rest.update(slug));
});

app.use(express.static('../../public'));

var port = 3000;
app.listen(port, function() {
  console.log('Running dev server on http://localhost:'+port);
});
