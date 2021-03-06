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
// If there are too many to fit into one grid, we can wrap it into a Pager //"thumbnail": "http://placehold.it/500x300", 
var images = [
  {"original": "/images/gallery/Results.png", "caption": "Investor profile quiz results wireframe"},
  {"original": "/images/gallery/InvestorProfile.png", "caption": "Investor profile selector wireframe"},
  {"original": "/images/gallery/FundPage.png", "caption": "Fund page wireframe for investment management site"},

  {"original": "/images/gallery/Dashboard.png", "caption": "Health dashboard prototype wireframe"},

  {"original": "/images/gallery/GuestCard.png", "caption": "Guest card fly-out wireframe for apartment management iPad app"},
  {"original": "/images/gallery/Pricing.png", "caption": "Apartment pricing page for iPad app (based on my wireframe)"},

  {"original": "/images/gallery/HelpForm.png", "caption": "Help form wireframe for a health care provider site"},
  {"original": "/images/gallery/HealthCareDashboard.png", "caption": "Dashboard wireframe for a health care provider site"},
  {"original": "/images/gallery/FeedbackForm.png", "caption": "Feedback form wireframe for a health care provider site"},

  {"original": "/images/gallery/PerformanceTable.png", "caption": "Performance table for a dressage competition"},

  {"original": "/images/gallery/portfolio/MainDesignLarge.png", "caption": "Portfolio visual design initial prototype"},
  {"original": "/images/gallery/portfolio/DesignGuideLarge.png", "thumbnail":"/images/gallery/portfolio/DesignGuideSmaller.png", "caption": "Portfolio design guide"},
  {"original": "/images/gallery/portfolio/BussinesCardLarge.png","thumbnail":"/images/gallery/portfolio/BussinesCardSmaller.png", "caption": "Business card (print)"},

  {"original": "/images/gallery/deepfield/GraphLarge.png", "thumbnail":"/images/gallery/deepfield/GraphSmaller.png", "caption": "Parallel coordinates graph for network traffic"},
  {"original": "/images/gallery/deepfield/DashboardLarge.png","thumbnail":"/images/gallery/deepfield/DashboardSmaller.png", "caption": "Deepfield navigation and dashboard"},

  {"original": "/images/gallery/AffinityBoard.jpg", "caption": "Affinity board for ubiquitous smart table design"},
  {"original": "/images/gallery/PaperPrototype.JPG", "caption": "Paper prototype for ubiquitous smart table design"},
  {"original": "/images/gallery/TechnicalProbe.jpg", "caption": "Technical Probe for ubiquitous smart table design"},

  {"original": "/images/gallery/WiadTalk.jpg", "caption": "World Information Architecture Day, Ann Arbor, 2015"},

  {"original": "/images/gallery/coachs-eye/CritiqueratorLarge.png", "thumbnail":"/images/gallery/coachs-eye/CritiqueratorSmaller.png", "caption": "Critiquerator feature for Coach’s Eye"},
  {"original": "/images/gallery/coachs-eye/ExplorerLarge.png","thumbnail":"/images/gallery/coachs-eye/ExplorerSmaller.png", "caption": "Explorer for Coach's Eye"},
  {"original": "/images/gallery/coachs-eye/OnboardingOneLarge.png", "thumbnail":"/images/gallery/coachs-eye/OnboardingOneSmaller.png", "caption": "On-boarding for Coach’s Eye"},
  {"original": "/images/gallery/coachs-eye/OnboardingTwoLarge.png","thumbnail":"/images/gallery/coachs-eye/OnboardingTwoSmaller.png", "caption": "On-boarding for Coach’s Eye"},
  {"original": "/images/gallery/coachs-eye/StorePopLarge.png", "thumbnail":"/images/gallery/coachs-eye/StorePopSmaller.png", "caption": "Store popup for Coach’s Eye"}

  ];
React.render(<ProjectGallery images={images}/>, document.getElementById("gallery-content"));
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

$('.logo').on('click', function() {
  $('html,body').animate({
      scrollTop: $("#projects").offset().top-80
    }, 1000);
});


React.render(<App />, projectsMount);


