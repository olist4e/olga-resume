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
      return { background: 'url(' + URL + ') no-repeat center center'  }
    }

    var produceLink = function(id){ return "/project/" + id }

    var imageClassString = "project-image";

    return (
        <div className={projectClassString(this.props.project._id)} >
          <Link href= {produceLink(this.props.project._id)}>
            <div className={imageClassString}  style={backgroundInline(this.props.project.image)}>
              <span className="position">{this.props.project.position}</span>
              <span className="employer">{this.props.project.employer}</span>
            </div>
            </Link>
        </div>
      )
  },

});

module.exports = Project;
