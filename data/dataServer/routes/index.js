var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Projects = require('../models/projects.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
