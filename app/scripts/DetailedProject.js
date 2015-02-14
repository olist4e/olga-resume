var React = window.React = require('react');
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
      return {background: 'url(' + URL + ') center center fixed' }
    };

    console.log(this)

    return (
       <div>
          <div className="project-content">
            <span class="project-header">{this.state.project.position}</span><Link href="/#projects">Back to project list</Link>
            <div className="project-banner" style={backgroundInline(this.state.project.banner)}></div>
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

module.exports = DetailedProject;