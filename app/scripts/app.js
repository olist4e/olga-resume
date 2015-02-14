/** @jsx React.DOM */

var React = window.React = require('react'),
    mainMount = document.getElementById("app"),
    projectsMount = document.getElementById("projects"),
    skillsMount = document.getElementById("skills");

var SunChart = require('./SunChart');
var Project = require('./Project');
var DetailedProject = require('./DetailedProject');
var ProjectList = require('./ProjectList');

//var d3Chart = require('./d3Chart');

//Data route
var DATA_ROOT = "http://localhost:3000";

//Router component to handle browser history
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;

//React.render(<SunChart />, document.getElementById("sunburst"));


var Foo = React.createClass({
  render: function() {
    return <div>Hai</div>;
  }
});

var App = React.createClass({
  nagivateTo:function(href){
    this.refs.ThisRouter.navigate(href);
  },

  render: function() {
    var dataUrl = DATA_ROOT +"/projects";

    return (
      <Locations>
        <Location path="/" handler={ ProjectList }  source={dataUrl} />
        <Location path="/#projects" handler={ ProjectList }  source={dataUrl} />
        <Location path="/project/:projectId" handler={ DetailedProject } source={dataUrl} />
      </Locations>
    )
  }
});

React.renderComponent(App(), projectsMount);

// React.renderComponent(<ProjectList />, projectsMount);

