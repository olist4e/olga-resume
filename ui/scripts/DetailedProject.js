var React = window.React = require('react');
var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var Link = Router.Link;
var ProjectThumbnails = require('./ProjectThumbnails.js');

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
  getProjectData:function(url){

    $.get(url, function(result){
      if (this.isMounted()){
        this.setState({"project": result});
      }
    }.bind(this));
  },
  getProjectUrl:function(props){
    var projectURL = props.source + "/" + props.projectId;
    return projectURL;
  },
  componentWillReceiveProps:function(props){
    this.getProjectData(this.getProjectUrl(props));
  },
  componentDidMount:function(){
    this.getProjectData(this.getProjectUrl(this.props));
    // $('html,body').animate({
    //           scrollTop: $("#projects").offset().top-80
    //         }, 1000);
  },
  render: function(){
    if(this.state.project._id == null) {
      return <div></div>;
    }
    var createContribs = function(contrib){
      return (<li>{contrib}</li>)
    };

    var backgroundInline = function(image){
      var URL ="../images/"+image;
      return {background: 'url(' + URL + ') center center no-repeat' }
    };

    var results, images;

    // this adds in result section if results exists in the JSON file
    if (this.state.project.results){
      results =  <div><span className="sub-header">4. RESULTS</span><p>{this.state.project.results}</p></div>;
        
    }

    if (this.state.project.images){
      images = <div class="project-thumbnails"><span className="sub-header">Project Images</span><ProjectThumbnails images={this.state.project.images} /></div>
    }

    var constructHeader = function(project){
      return project.position + ", " + project.employer;
    }

    var constructLink = function(url){
      return "http://" + url;
    }

    var calculateProjectUrl = function(cid){
      // console.log(cid);
      cid = parseInt(cid);
      if (cid == 6){
        return "#/project/1"
      }
      return "#/project/" + (cid + 1);
    }

    // var images = [{"original": "http://placehold.it/200x200", "caption": "Foo"},
    //     {"original": "http://placehold.it/200x200", "caption": "Bar"},
    //     {"original": "http://placehold.it/200x200", "caption": "Baz"}];

    return (
       <div>
          <div className="project-content">
            <div className="project-header">
              <a href={constructLink(this.state.project.eLink)}>{constructHeader(this.state.project)}</a>
              <Link className="back-to-projects-top" href="/projects">Back to project list</Link>
            </div>
            <div className="project-banner" style={backgroundInline(this.state.project.banner)}></div>
            <span className="sub-header">1.CHALLENGE</span>
             <p>{this.state.project.challenge}</p>
            <span className="sub-header">2. PROCESS</span>
             <p>{this.state.project.process}</p>
            <span className="sub-header">3. SOLUTION</span>
             <p>{this.state.project.solution}</p>

             {results}
            
            {images}
           
          </div>
          <Link href="/projects">Back to project list</Link>
          <Link className="next-project" href={calculateProjectUrl(this.props.projectId)}>Next Project</Link>
        </div>

        )

  }
});

module.exports = DetailedProject;
