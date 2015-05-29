var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    Issuer = require('../models/issuer'),
    bcrypt = require('bcrypt'),
    logger = require('./logger');
    
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

function getAccessLevel(email, callback) {
  if (env.isAdmin(email))
    return process.nextTick(callback.bind({}, null, [email, 'super']));
  return Issuer.findByAccess(email, function (err, issuers) {
    if (err) return callback(err);
    if (!issuers.length) return callback(null, [email, null]);
    return callback(null, [email, 'issuer']);
  });
}

module.exports = function (passport) {
  console.log("HELLLO");
  passport.serializeUser(function(user, done) {
    console.log('Serializing: ', user);
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    console.log('Deserializing: ', email);
    User.findOne({user:email}, function(err, user) {
      done(err, user);
    });
  });
  
 /* passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function (email, password, done) {
      User.findOne({ 'user' :  email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            email: email,
            message: 'Your login is incorrect. &nbsp;<a class="forgotpw" href="/forgotpw/">Forgot Password?</a>'
          });
        }
        
        if (!isValidPassword(email, password)){
          return done(null, false, {
            email: email,
            message: 'Your login is incorrect. &nbsp;<a class="forgotpw" href="/forgotpw/">Forgot Password?</a>'
          });
        }
        
        return done(null, user);
      });
    }
  ));*/
  
};