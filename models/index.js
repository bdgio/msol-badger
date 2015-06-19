const env = require('../lib/environment');
const crypto = require('crypto');
const mongoose = require('mongoose');
const opts = env.get('mongo');
const util = require('../lib/util');
const mongohq = process.env['MONGOHQ_URL'];

const authOpts = {};

if (!opts && !mongohq)
  throw new Error("mongodb environment variables not found");

if (opts) {
  if (opts.pass){
    authOpts.pass = opts.pass;
  }
  if (opts.user){
    authOpts.user = opts.user;
  }
}

if (mongohq) {
  var connection = module.exports = Object.create(
    mongoose.createConnection(mongohq)
  );
} else {
  var connection = module.exports = Object.create(
    // mongoose.createConnection(opts.host, opts.db, opts.port, authOpts)
    mongoose.createConnection(opts.host, authOpts)
  );
};

connection.generateId = generateId;
connection.healthCheck = function(meta, cb) {
  var Issuer = require('./issuer');
  Issuer.findOne({}, cb);
};

function sha1(input) {
  return crypto.createHash('sha1').update(input).digest('hex');
}
function generateId() {
  return sha1('' + Date.now() + util.randomString(16));
}
