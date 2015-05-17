var React = window.React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;

var NavLink = React.createClass({
  getInitialState: function(){
    return { href: "", name:"Name", cssClass:"link", scrollTo:""}
  },
  handleClick:function(){
    var target = $(this.props.nlink.scrollTo)[0];
      $('html,body').animate({
        scrollTop: $(target).offset().top - 80
      }, 1000);
  },
  render:function(){
    return (<a className={this.props.nlink.cssClass} onClick={this.handleClick} >{this.props.nlink.name}</a>)
  }
});

var NavLinks = React.createClass({
  render:function(){
    var assemble = function(props){
      return {name:props[0], href:props[1], cssClass:props[2], scrollTo:props[3]}
    }
  
    return (
      <ul className="navigation-links">
      <li> <NavLink nlink={assemble(["Projects","#/projects","nav-link nav-project-link", "#projects"])} /></li>
      <li> <NavLink nlink={assemble(["Gallery","#/gallery","nav-link nav-gallery-link", "#gallery"])} /></li>
      <li> <NavLink nlink={assemble(["Skills","#/skills","nav-link nav-skills-link", "#skills"])} /></li>
      <li> <NavLink nlink={assemble(["Contact","#/contact","nav-link nav-contact-link", "#contacts"])} /></li>
      </ul>
    )
  },

});

module.exports = NavLinks;
