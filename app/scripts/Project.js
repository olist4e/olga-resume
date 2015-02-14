var React = window.React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;

var Project = React.createClass({
  render:function(){

    var projectClassString = function(id){
        return "col-sm-4 col-xs-6 col-md-4 col-lg-4 project project-" + id;
    };

    var backgroundInline = function(image){
      var URL ="../images/"+image;
      return { background: 'url(' + URL + ') no-repeat center center fixed'  }
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
});

module.exports = Project;