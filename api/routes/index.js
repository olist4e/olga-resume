var express = require('express');

var router = express.Router();

var projects = require('../portfolio.json');
var skills = require('../skills.json');

//My Mongodb integration
// var mongoose = require('mongoose');
// var Projects = require('../models/projects.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', development: process.env.NODE_ENV != 'production' });
});

router.get('/skills', function(req,res, next){
    res.json(skills);
});

router.get('/projects', function(req,res, next){
    res.json(projects);
});

router.get('/projects/:id', function(req, res, next){
    for (var i=0; i < projects.length; i++){
        if (projects[i]._id == req.params.id){
            res.json(projects[i]);
            return;
        }
    }

    res.json([]);

});


module.exports = router;
