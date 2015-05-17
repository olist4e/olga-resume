/** @jsx React.DOM */

var React = window.React = require('react'),
    mainMount = document.getElementById("app"),
    projectsMount = document.getElementById("projects"),
    skillsMount = document.getElementById("skills");

var SunChart = require('./SunChart');
var Project = require('./Project');
var DetailedProject = require('./DetailedProject');
var ProjectList = require('./ProjectList');
var NavLinks = require('./NavLinks.js');
var ProjectGallery = require('./ProjectGallery.js');

//Data route
var DATA_ROOT = "";

//Router component to handle browser history
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;

var dataSkills = DATA_ROOT + "/skills";
// Note: Idea is that we add entries like these in images to the projects data structure
// and then join all of them together into the gallery.
// If there are too many to fit into one grid, we can wrap it into a Pager //"thumbnail": "http://placehold.it/500x300", 
var images = [
  {"original": "/images/gallery/Results.png", "caption": "Investor Profile Quiz Results"},
  {"original": "/images/gallery/InvestorProfile.png", "caption": "Investor Profile Selector"},

  {"original": "/images/gallery/AffinityBoard.jpg", "caption": "Affinity Board for ubiquitous smart table design"},
  {"original": "/images/gallery/PaperPrototype.JPG", "caption": "Paper prototype for ubiquitous smart table design"},
  {"original": "/images/gallery/TechnicalProbe.jpg", "caption": "Technical Probe for ubiquitous smart table design"},

  {"original": "/images/gallery/Dashboard.png", "caption": "Health Dashboard prototype"},

  {"original": "/images/gallery/GuestCard.png", "caption": "Guest Card fly-out for Apartment Management iPad App"},

  {"original": "/images/gallery/WiadTalk.jpg", "caption": "World Information Architecture Day, Ann Arbor, 2015"},

  {"original": "/images/gallery/PerformanceTable.png", "caption": "Performance Table for a dressage competition"}
  ];
React.render(<ProjectGallery images={images}/>, document.getElementById("gallery"));
React.render(<SunChart source = {dataSkills}/>, document.getElementById("sunburst"));
React.render(<NavLinks />, document.getElementById("nav-container"))

var App = React.createClass({
  nagivateTo:function(href){
    this.refs.ThisRouter.navigate(href);
  },

  render: function() {
    var dataUrl = DATA_ROOT +"/projects";

    return (
      <Locations hash>
        <Location path="/project/:projectId" handler={ DetailedProject } source={dataUrl} />
        <Location path="/" handler={ ProjectList }  source={dataUrl} />
        <Location path="/projects" handler={ ProjectList }  source={dataUrl} />
        <Location path="/skills" handler={ ProjectList }  source={dataUrl} />
        <Location path="/contact" handler={ ProjectList }  source={dataUrl} />
      </Locations>
    )
  }
});

React.render(<App />, projectsMount);


