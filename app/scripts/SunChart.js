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
     return {
       data: this.props.data
     };
   },

   componentWillUnmount: function() {
   	$(window).off('resize', this.updateContainerSize);
     var el = this.getDOMNode();
     d3Chart.destroy(el);
   },

   updateContainerSize:function() {
    var size = $("#skills").width();
    console.log(this.state)
    console.log(size)
    if (this.state.containerSize != size){
	    console.log("UPDATE called")
	   	this.setState({containerSize: size})
    }
   	
   },

   // componentWillMount: function() {
   // 	this.updateContainerSize();
   // },

   render: function() {
   	var expStyle = {visibility: 'hidden'}
   	var size = $("#skills").width();
     return (
       <div className="sunburst" data={this.state.data}  containerSize={size} >
          <div id="explanation" style={expStyle}>
            <span id="percentage"></span>%<br/>
            of my time spent doing <span id="skillz"></span>
        </div>
       </div>
     );
   }
});


module.exports = SunChart;