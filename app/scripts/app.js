/** @jsx React.DOM */

var React = window.React = require('react'),
    mainMount = document.getElementById("app"),
    projectsMount = document.getElementById("projects"),
    skillsMount = document.getElementById("skills");


//Data route
var DATA_ROOT = "http://localhost:3000";


//Router component to handle browser history
var Router = require('react-router-component');

var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;



var DetailedProject = React.createClass({
  getInitialState:function(){ 
      return { project: {
      _id:null,
      position:"",
      image:"",
      employer:null,
      contributions: [],
    }} 
  },
  componentDidMount:function(){
    var projectURL = this.props.source + "/" + this.props.projectId;

    $.get(projectURL, function(result){
      // console.log(result);
      if (this.isMounted()){
        this.setState({"project": result});
      }
    }.bind(this));
  },
  render: function(){
    var createContribs = function(contrib){
      return (<li>{contrib}</li>)
    };

    var backgroundInline = function(image){
      var URL ="../images/"+image;
      return {backgroundImage: 'url(' + URL + ')' }
    };

    console.log(this)

    return (
       <div>
          <div className="project-content">
            <span class="project-header">{this.state.project.position}</span><Link href="/#projects">Back to project list</Link>
            <div className="project-banner" style={backgroundInline(this.state.project.image)}></div>
            <span className="sub-header">1.Challenge</span>
             <p>{this.state.project.description}</p>
           
            <span className="sub-header">2. Process</span>
            <span className="sub-header">3. Solution</span>
            <span className="sub-header">2. Results</span>
           
          </div>
          <Link href="/#projects">Back to project list</Link>
        </div>

        )

  }
});



var Project = React.createClass({
  render:function(){
    var projectClassString = function(id){
        return "col-sm-4 col-xs-6 col-md-4 col-lg-4 project project-" + id;
    };

    var backgroundInline = function(image){
      var URL ="../images/"+image;
      return {backgroundImage: 'url(' + URL + ')' }
    }

    var produceLink = function(id){ return "/project/" + id }

    var imageClassString = "project-image";
    return (
        <div className={projectClassString(this.props.project._id)} onClick={this.handleClick}>
          <Link href= {produceLink(this.props.project._id)}>
            <div className={imageClassString}  style={backgroundInline(this.props.project.image)}>
              <span>{this.props.project.position}</span>
            </div>
            </Link>
        </div>
      )
  },
  handleClick:function(){
    // console.log("Fired project click.")
    // console.log(App)
    // componentHandler.openDetailedProject(this.props.project.projectId);
    //App.nagivateTo("/project/1")
   
  }
})


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



var App = React.createClass({
  nagivateTo:function(href){
    this.refs.ThisRouter.navigate(href);
  },

  render: function() {
    var dataUrl = DATA_ROOT +"/projects";


    return (
      <Locations>
        <Location path="" handler={ ProjectList }  source={dataUrl} />
        <Location path="/" handler={ ProjectList }  source={dataUrl} />
        <Location path="/#projects" handler={ ProjectList }  source={dataUrl} />
        <Location path="/project/:projectId" handler={ DetailedProject } source={dataUrl} />
      </Locations>
    )
  }
});

React.renderComponent(React.createElement(App), projectsMount);

// React.renderComponent(<ProjectList />, projectsMount);

