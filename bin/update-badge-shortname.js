#!/usr/bin/env node

/*
Update shortname for each badge to include issuer name

1. Get all badges
2. For each badge 
  a. look up issuer name with program id
  b. create shortname with issuer name and badge name (issuer-name-badge-name)
  c. update badge with new shortname
*/

var async = require('async');
var db = require('../models');
var Issuer = require('../models/issuer');
var Badge = require('../models/badge');
var util = require('../lib/util');
var _ = require('underscore');

console.log('Updating all badge shortnames...');

async.waterfall([
  function(callback) {
    Badge.find({}, {_id: 1, name: 1, program: 1}, function(err,badges){
      if (err) callback(err);   
      callback(null, badges);
    });
  },
  function(badges,callback) {
    var i = 0;
    _.each(badges,function(badge){
      Issuer.findOne({ programs: badge.program }, function (err, issuer) {
        if (err) callback(err);  
          
        badge.shortname = util.slugify(issuer.name + " " +badge.name);
        console.log("changing badge.shortname to: "+badge.shortname);
        Badge.update({"_id": badge.id},{"shortname": badge.shortname}, function (err, result){
          if (err) callback(err); 
          i++;
          if (i == badges.length) {  
            callback(null, 'done');
          }
        });
      });
    });
  }
  ], function (err, result) {
    if (err) throw err;
    console.log('Done.');
    db.close();
});


