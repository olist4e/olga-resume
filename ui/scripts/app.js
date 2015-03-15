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
//var d3Chart = require('./d3Chart');

//Data route
var DATA_ROOT = "";

//Router component to handle browser history
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;


var dataSkills = DATA_ROOT + "/skills";
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
      </Locations>
    )
  }
});

React.renderComponent(App(), projectsMount);

// React.renderComponent(<ProjectList />, projectsMount);

