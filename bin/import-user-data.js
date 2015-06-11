#!/usr/bin/env node

var async = require('async');
var fs = require('fs');
var path = require('path');

var db = require('../models');
var User = require('../models/user');

var image = function(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'tests', 'assets', name));
};

var fixtures = [
new User({
    user: 'sunny@badgelabs.io',
    name: 'Sunny'
  }),
  new User({
      user: 'erin@badgelabs.io',
      name: 'Erin'
    }),
  new User({
      user: 'meg@badgelabs.io',
      name: 'Meg',
    }),
  new User({
    user: 'bug@badgelabs.io',
    name: 'John'
    }),
  new User({
    user: 'mjones0164@yahoo.com',
    name: 'Michael'
    }),
  new User({
    user: 'carla@badgelabs.io',
    name: 'Carla'
    }),
  new User({
    user: 'kerrilemoie@gmail.com',
    name: 'Kerri'
    })
];

console.log('Importing sample user data...');

async.mapSeries(fixtures, function(doc, cb) {
  console.log("  " + doc.constructor.modelName + ": " + doc.name);
  doc.save(cb);
}, function (err, results) {
  if (err) throw err;

  console.log('Done.');
  db.close();
});
