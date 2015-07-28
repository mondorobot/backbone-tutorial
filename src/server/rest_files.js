'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var dbPath = path.resolve('../../public/database/collections');

var restListHandler = function(slug) {
  return function(req, res) {
    fs.readFile(dbPath+'/'+slug, {encoding: 'utf8'}, function(err, data) {
      if (err) {
        throw err;
      }

      if (req.query && req.query.q && Object.keys(req.query.q).length > 0) {
        var rs = JSON.parse(data);

        var params = Object.keys(req.query.q);

        var results = rs.filter(function(row) {
          var matches = params.filter(function(key) {
            var queryValue = req.query.q[key];

            var rowValue = row[key];

            var pat = new RegExp(queryValue, 'i');

            return rowValue.match(pat);
          });

          return matches.length > 0;
        });
      }
      else {
        var results = JSON.parse(data);
      }

      var output = {
        'pageNum': 0,
        'pageSize': results.length,
        'results': results
      };

      res.json(output);
    });
  };
};

var restItemHandler = function(slug) {
  return function(req, res) {
    fs.readFile(dbPath+'/'+slug, {encoding: 'utf8'}, function(err, data) {
      if (err) {
        throw err;
      }

      var rs = JSON.parse(data);

      var item = rs.filter(function(x) {
        return String(x.id) === String(req.params.id);
      })[0];

      if (item) {
        var data = item;
      }
      else {
        var data = {};
      }

      res.json(data);
    });
  };
};

var restCreateHandler = function(slug) {
  return function(req, res) {
    fs.readFile(dbPath+'/'+slug, {encoding: 'utf8'}, function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      var rs = JSON.parse(data);

      var item = req.body;
      var ids = rs.map(function(x) {
        return x.id;
      });

      var newId = _.max(ids)+1;
      item.id = newId;

      rs.push(item);

      fs.writeFile(dbPath+'/'+slug, JSON.stringify(rs), {encoding: 'utf8'}, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }

        res.json(item);
      });
    });
  };
};

var restUpdateHandler = function(slug) {
  return function(req, res) {
    fs.readFile(dbPath+'/'+slug, {encoding: 'utf8'}, function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      var updates = req.body;
      var rs = JSON.parse(data);

      var item = rs.filter(function(x) {
        return String(x.id) === String(req.params.id);
      })[0];

      if (item) {
        _.extend(item, updates);

        fs.writeFile(dbPath+'/'+slug, JSON.stringify(rs), {encoding: 'utf8'}, function(writeErr) {
          if (writeErr) {
            throw writeErr;
          }

          res.json(item);
        });
      }
      else {
        res.json({});
      }
    });
  };
};

var restDestroyHandler = function(slug) {
  return function(req, res) {
    fs.readFile(dbPath+'/'+slug, {encoding: 'utf8'}, function(readErr, data) {
      if (readErr) {
        throw readErr;
      }

      var rs = JSON.parse(data);

      var newRs = rs.filter(function(x) {
        return String(x.id) !== String(req.params.id);
      });

      fs.writeFile(dbPath+'/'+slug, JSON.stringify(newRs), {encoding: 'utf8'}, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
      });

      res.json([]);
    });
  };
};

module.exports = {
  'list': restListHandler,
  'item': restItemHandler,
  'create': restCreateHandler,
  'update': restUpdateHandler,
  'destroy': restDestroyHandler
};
