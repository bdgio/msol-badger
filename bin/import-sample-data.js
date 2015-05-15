#!/usr/bin/env node

var async = require('async');
var fs = require('fs');
var path = require('path');

var db = require('../models');
var Issuer = require('../models/issuer');
var Program = require('../models/program');
var Badge = require('../models/badge');

var image = function(name) {
  return fs.readFileSync(path.join(__dirname, '..', 'tests', 'assets', name));
};

var fixtures = [
new Issuer({
    _id: 'mozilla',
    shortname: 'mozilla',
    name: 'Mozilla',
    url: 'http://mozilla.org',
    description: 'Mozilla is a proudly non-profit organization dedicated to keeping the power of the Web in people’s hands.',
    image: image('mozilla-wordmark.png'),
    programs: ['webmaker']
  }),
  new Program({
    _id: 'webmaker',
    name: 'Webmaker',
    shortname: 'webmaker',
    issuer: 'mozilla',
    url: 'http://webmaker.org',
    description: 'A global community that doesn\'t just use the web, but makes it by creating, remixing and teaching.',
    image: image('webmaker-logo.png')
  }),
  new Badge({
    program: 'webmaker',
    name: 'Div Master',
    shortname: 'div-master',
    description: 'The Div Master mini-badge is part of the Mozilla Webmaker series. It represents an HTML skill and is earned by properly using the div tag in a Mozilla Webmaker Project.\n\nIt indicates that the earner has completed this task successfully at least 2 times in Webmaker projects.',
    image: image('div-master.png')
  }),
  new Badge({
    program: 'webmaker',
    name: 'A Lister',
    shortname: 'a-lister',
    description: 'The A Lister mini-badge is part of the Mozilla Webmaker series. It represents an HTML skill and is earned by fixing or adding a list to a Mozilla Webmaker project by properly using the ordered and unordered list tags.\n\nIt indicates that the earner has completed this task successfully at least 3 times in Webmaker projects.',
    image: image('a-lister.png')
  }),
  new Issuer({
    _id: 'maine-robotics',
    shortname: 'maine-robotics',
    name: 'Maine Robotics',
    url: 'http://www.mainerobotics.org',
    description: 'Maine Robotics was created in 2004 to meet the growing needs of the educational-robotics community in Maine.',
    image: image('maine-robotics.png'),
    programs: ['msol-summer-pilot']
  }),
  new Issuer({
    _id: 'telling-room',
    shortname: 'telling-room',
    name: 'The Telling Room',
    url: 'http://www.tellingroom.org',
    description: 'A nonprofit writing center in Portland, Maine, dedicated to the idea that children and young adults are natural storytellers.',
    image: image('tellingroom.png'),
    programs: ['msol-summer-pilot-2']
  }),
  new Program({
    _id: 'msol-summer-pilot',
    name: 'MSOL Summer Pilot',
    shortname: 'msol-summer-pilot',
    issuer: 'maine-robotics',
    url: 'https://www.mainestateoflearning.org/',
    description: 'Maine State of Learning is a project fueled by public and private partnerships across the state of Maine to provide more learning opportunities to Maine citizens of all ages, recognize that learning through digital badges, and connect it ot statewide proficiencies, career pathways and personal goals.',
    image: image('msol-logo-blk.png')
  }),
  new Program({
    _id: 'msol-summer-pilot-2',
    name: 'MSOL Summer Pilot',
    shortname: 'msol-summer-pilot-2',
    issuer: 'telling-room',
    url: 'https://www.mainestateoflearning.org/',
    description: 'Maine State of Learning is a project fueled by public and private partnerships across the state of Maine to provide more learning opportunities to Maine citizens of all ages, recognize that learning through digital badges, and connect it ot statewide proficiencies, career pathways and personal goals.',
    image: image('msol-logo-blk.png')
  }),
  new Badge({
    program: 'msol-summer-pilot',
    name: 'LEGO Robotics Camp',
    shortname: 'lego-robotics-camp',
    description: 'Students participate in a week long robotics camp, where the students learn to build and program using the LEGO MindStorms kit.\n\nSkills include learning the basic building skills necessary to build a successful robot capable of movement; as well as the attachment and use of a variety of sensors.  Programming skills include use of the LEGO programming software, basic motion commands, sound and display commands, program loops, and conditional switch statements.',
    image: image('robotics-camp.png'),
    tags: "Computer/Tech, Arts/Maker"
  }),
  new Badge({
    program: 'msol-summer-pilot',
    name: 'LEGO Robotics Camp - Roboteer',
    shortname: 'roboteer',
    description: 'Student participates in a week long robotics camp, where the students learn to build and program using the LEGO MindStorms kit.\n\nStudent demonstrates the unique skill at the core of engineering: attempt things beyond the instruction in a constructive manner. Student will, with or without the assistnance of the leaders, take on independent projects that are unique to their own goals. This could be within the realm of either the engineering aspect (building) or the programming aspect, or both.',
    image: image('roboteer.png'),
    tags: "Computer/Tech, Arts/Maker"
  }),
  new Badge({
    program: 'msol-summer-pilot-2',
    name: 'Generator',
    shortname: 'generator',
    description: 'Learner follows a prompt or activity to complete the first part of the writing process: brainstorming and pre-writing.\n\nGenerative work usually lasts about 20 minutes and students often complete several of these short generative assignments during a typical camp.',
    image: image('generator.png'),
    tags: "Arts/Maker"
  }),
  new Badge({
    program: 'msol-summer-pilot-2',
    name: 'Drafter',
    shortname: 'drafter',
    description: 'Learner uses one generative start to develop into a first draft of a longer piece of writing.\n\nDrafts are usually two or more pages long and strive to have a beginning, middle, and end, even if the writing is still rough.',
    image: image('drafter.png'),
    tags: "Arts/Maker"
  }),
];

console.log('Importing sample data...');

async.mapSeries(fixtures, function(doc, cb) {
  console.log("  " + doc.constructor.modelName + ": " + doc.name);
  doc.save(cb);
}, function (err, results) {
  if (err) throw err;

  console.log('Done.');
  db.close();
});
