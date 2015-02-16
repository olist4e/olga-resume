var express = require('express');
var csv = require('express-csv');
var router = express.Router();

var mongoose = require('mongoose');
var Projects = require('../models/projects.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/skills', function(req,res, next){

	res.csv([["hello"],
		["hello"]]);
})



module.exports = router;
