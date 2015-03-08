var React = window.React = require('react');
var d3Chart = require('./d3Chart');

var SunChart = React.createClass({
  propTypes:{
    data:React.PropTypes.array
  },

  getInitialState: function() {
    return {
      data: {},
      colors: {},
      lColors:{},
      containerSize: $("#skills").width()
    };
  },
  componentDidMount: function() {

  	 $.get(this.props.source, function(result){
      // console.log(result);
      if (this.isMounted()){
        this.setState({data: result});
      }
    }.bind(this));

   	$(window).on('resize', this.updateContainerSize);
     var el = this.getDOMNode();
     d3Chart.create(el, {
       width: el.clientWidth,
       height: '500'
     }, this.getChartState());
   },

   componentDidUpdate: function() {
    var el = this.getDOMNode();
    d3Chart.update(el, {
       width: el.clientWidth,
       height: '400'
     }, this.getChartState());
   },

   getChartState: function() {
   	// console.log(this.props)
    //  	console.log(this.state)
     return {

       data: this.state.data
     };
   },

   componentWillUnmount: function() {
   	$(window).off('resize', this.updateContainerSize);
     var el = this.getDOMNode();
     d3Chart.destroy(el);
   },

   updateContainerSize:function() {
    var size = $("#skills").width();
    // console.log(this.state)
    // console.log(size)
    if (this.state.containerSize != size){
	    // console.log("UPDATE called")
	   	this.setState({containerSize: size})
    }
   	
   },

   // componentWillMount: function() {
   // 	this.updateContainerSize();
   // },

   render: function() {
   	var expStyle = {visibility: 'hidden'}
   	//Subtract 20 pixels from parent container to make sure that we don't run off the screen
   	var size = $("#skills").width() - 20;
     return (
       <div className="sunburst" data={this.state.data}  containerSize={size} >
       		<div>
       			<div id="initial-text">Hover to see more skills</div>
		        <div id="explanation" style={expStyle}>
			        <span id="percentage"></span> years<br/>
		            doing <span id="skillz"></span>
		            </div>
	        </div>
       </div>
     );
   }
});


module.exports = SunChart;