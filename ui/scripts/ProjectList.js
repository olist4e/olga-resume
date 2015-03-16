var React = window.React = require('react');
var Project = require("./Project");

var ProjectList = React.createClass({
  getInitialState: function(){
    return { projects: []}
  },

  componentDidMount: function(){
 
    $.get(this.props.source, function(result){
      if (this.isMounted()){
        this.setState({"projects": result});
      }
    }.bind(this));

    $('html,body').animate({
            scrollTop: $("#projects").offset().top-80
          }, 1000);
  },

  render: function(){
    var createProject = function(project){
      return <Project project={project} key={project._id} />
    }

    var classString = "project-list";

    return (
          <div className={classString}>
            {this.state.projects.map(createProject)}
          </div>
      )
  },
});

module.exports = ProjectList;
