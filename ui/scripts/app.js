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
// If there are too many to fit into one grid, we can wrap it into a Pager
var images = [
  {"original": "http://placehold.it/1000x600", "thumbnail": "http://placehold.it/500x300", "caption": "Foo"},
  {"original": "http://placehold.it/1000x600", "caption": "Bar"},
  {"original": "http://placehold.it/1000x600", "caption": "Baz"},
  {"original": "http://placehold.it/1000x600", "caption": "Foo"},
  {"original": "http://placehold.it/1000x600", "caption": "Bar"},
  {"original": "http://placehold.it/1000x600", "caption": "Baz"},
  {"original": "http://placehold.it/1000x600", "caption": "Foo"},
  {"original": "http://placehold.it/1000x600", "caption": "Bar"},
  {"original": "http://placehold.it/1000x600", "caption": "Baz"},
  {"original": "http://placehold.it/1000x600", "caption": "Foo"},
  {"original": "http://placehold.it/1000x600", "caption": "Bar"},
  {"original": "http://placehold.it/1000x600", "caption": "Baz"}];
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


