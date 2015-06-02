const nodemailer = require('nodemailer');
const env = require('../lib/environment');
const logger = require('../lib/logger');
const creds = env.emailCreds();
const smtpTransport = nodemailer.createTransport('SMTP', {
  service: "SendGrid",
  auth: {
    user: creds.user,
    pass: creds.pw
  }
});


exports.mailHandler = function(req, res, next) {  
  var creds = env.emailCreds();
  var smtpTransport = nodemailer.createTransport('SMTP', {
    service: "SendGrid",
    auth: {
      user: creds.user,
      pass: creds.pw
    }
  });
 // logger.info("smtpTransport "+ JSON.stringify(smtpTransport));
  req.mailHandler = smtpTransport;
  next();
};

exports.transport = smtpTransport;
