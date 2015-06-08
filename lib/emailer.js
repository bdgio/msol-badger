var mailer = require('../middlewares/mail').transport;
var logger = require('../lib/logger');

exports.newUserBadge = function (email, claimCode, req, callback) {
  var badgeName = req.badge.name;
  var url = req.siteUrl + "claim/"+claimCode;
  mailer.sendMail({
    from: 'Maine State of Learning <help@mainestateoflearning.org>',
    to: email,
    subject: "You've earned the "+badgeName+" badge. Add it to your My Badges page!",
    text: req.nunjucks.render('public/email/new-user-badge.txt', {url:url, badgeName: req.badge.name}),
    html: req.nunjucks.render('public/email/new-user-badge.html', {url:url, badgeName: req.badge.name})
  }, callback || function (err) {
    if (err) { console.log(err); }
  });
};

exports.awardBadge = function (email, name, claimCode, req, callback) {
  var badgeName = req.badge.name;
  var url = req.siteUrl + "login";
  mailer.sendMail({
    from: 'Maine State of Learning <help@mainestateoflearning.org>',
    to: email,
    subject: "You've earned the "+badgeName+" badge. Add it to your My Badges page!",
    text: req.nunjucks.render('public/email/award-badge.txt', {badgeName: req.badge.name, name: name, url: url}),
    html: req.nunjucks.render('public/email/award-badge.html', {badgeName: req.badge.name, name:name, url: url})
  }, callback || function (err) {
    if (err) { console.log(err); }
  });
};

exports.resetPw = function (email, uniqueId, req, callback) {
  var url = req.siteUrl + "reset-pw/"+uniqueId;
  mailer.sendMail({
    from: 'Maine State of Learning <help@mainestateoflearning.org>',
    to: email,
    subject: "Reset your Maine State of Learning Password",
    text: req.nunjucks.render('public/email/reset-pw.txt', {url:url}),
    html: req.nunjucks.render('public/email/reset-pw.html', {url:url})
  }, callback || function (err) {
    if (err) { console.log(err); }
  });
};

exports.contactUs = function (req, callback) { 
  var name = req.body.name; 
  var email = req.body.email;
  var message = req.body.message;
  mailer.sendMail({
    from: 'Maine State of Learning <help@mainestateoflearning.org>',
    to: 'help@mainestateoflearning.org',
    subject: "Contact Message to Maine State of Learning",
    text: req.nunjucks.render('public/email/contact-us.txt', {name:name, email:email, message:message}),
    html: req.nunjucks.render('public/email/contact-us.html', {name:name, email:email, message:message})
  }, callback || function (err) {
    if (err) { console.log(err); }
  });
  
}