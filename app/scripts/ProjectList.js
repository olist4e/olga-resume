var React = window.React = require('react');
var Project = require("./Project");

var ProjectList = React.createClass({
  getInitialState: function(){
    return { projects: [{
      projectId:null,
      position:"",
      image:""
    }]}
  },

  componentDidMount: function(){
 
    $.get(this.props.source, function(result){
      // console.log(result);
      if (this.isMounted()){
        this.setState({"projects": result});
      }
    }.bind(this));
  },

  render: function(){
    var createProject = function(project){
      return <Project project={project} />
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