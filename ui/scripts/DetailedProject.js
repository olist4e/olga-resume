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
      return {background: 'url(' + URL + ') center center no-repeat' }
    };

    console.log(this)

    var results;

    // this adds in result section if results exists in the JSON file
    if (this.state.project.results){
      results =  <div><span className="sub-header">4. RESULTS</span><p>{this.state.project.results}</p></div>;
        
    }

    var constructHeader = function(project){
      return project.position + ", " + project.employer;
    }

    var constructLink = function(url){
      return "http://" + url;
    }

    return (
       <div>
          <div className="project-content">
           <a className="project-header" href={constructLink(this.state.project.eLink)}>{constructHeader(this.state.project)}</a><Link href="/projects">Back to project list</Link>
            <div className="project-banner" style={backgroundInline(this.state.project.banner)}></div>
            <span className="sub-header">1.CHALLENGE</span>
             <p>{this.state.project.challenge}</p>
           
            <span className="sub-header">2. PROCESS</span>
             <p>{this.state.project.process}</p>

            <span className="sub-header">3. SOLUTION</span>
             <p>{this.state.project.solution}</p>

             {results}
            
           
          </div>
          <Link href="/projects">Back to project list</Link>
        </div>

        )

  }
});

module.exports = DetailedProject;