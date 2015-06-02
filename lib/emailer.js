var mailer = require('../middlewares/mail').transport;
var logger = require('../lib/logger');

exports.newUserBadge = function (email, claimCode, req, callback) {
  var badgeName = req.badge.name;
  var url = req.siteUrl + "claim/"+claimCode;
  mailer.sendMail({
    from: 'Maine State of Learning <help@mainestateoflearning.org>',
    to: email,
    subject: "You've earned the "+badgeName+" badge. Add it to your MyBadges page!",
    text: req.nunjucks.render('public/email/new-user-badge.txt', {url:url, badgeName: req.badge.name}),
    html: req.nunjucks.render('public/email/new-user-badge.html', {url:url, badgeName: req.badge.name})
  }, callback || function (err) {
    if (err) { console.log(err); }
  });
};

exports.awardBadge = function (email, claimCode, req, callback) {
  var badgeName = req.badge.name;
  mailer.sendMail({
    from: 'Maine State of Learning <help@mainestateoflearning.org>',
    to: email,
    subject: "You've earned the "+badgeName+" badge. Add it to your MyBadges page!",
    text: req.nunjucks.render('public/email/award-badge.txt', {badgeName: req.badge.name}),
    html: req.nunjucks.render('public/email/award-badge.html', {badgeName: req.badge.name})
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