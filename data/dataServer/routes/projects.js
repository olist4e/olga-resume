var express = require('express');
var router = express.Router();
// //My Mongodb integration
// // var mongoose = require('mongoose');
// // var Projects = require('../models/projects.js');
// var projects = require('../../portfolio.json');

/* GET projects listing. */

// router.get('/', function(req, res, next) {
//   Projects.find(function (err, projects) {
//     if (err) return next(err);
//     res.json(projects);
//   });
// });

// /* POST /projects */
// router.post('/', function(req, res, next) {
//  Projects.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* GET /projects/id */
// router.get('/:id', function(req, res, next) {
//  // Projects.findById(req.params.id, function (err, post) {
//  //    if (err) return next(err);
//  //    res.json(post);
//  //  });
// });

// /* PUT /projects/:id */
// router.put('/:id', function(req, res, next) {
//  Projects.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

//  DELETE /projects/:id 
// router.delete('/:id', function(req, res, next) {
//   Projects.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });


module.exports = router;

