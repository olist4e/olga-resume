var React = window.React = require('react');
var d3Chart = require('./sunburst');

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
      if (this.isMounted()){
        this.setState({data: result});
      }
    }.bind(this));

    $(window).on('resize', this.updateContainerSize);

    },

    componentDidUpdate: function() {
      this.renderChart();
    },

    renderChart: function() {
      var el = this.getDOMNode();
      $(el).empty(); 
      var sunburst = $(".sunburst");
      var vis = d3Chart.create(el, {
        width: sunburst.width(),
        height: sunburst.height()
      }, this.getChartState());

    },

    getChartState: function() {
      return this.state.data;
    },

    componentWillUnmount: function() {
      $(window).off('resize', this.updateContainerSize);
      var el = this.getDOMNode();
      d3Chart.destroy(el);
    },

    updateContainerSize:function() {
      var size = $("#skills").width();
      if (this.state.containerSize != size){
        this.setState({containerSize: size})
      }
      //this.renderChart();
    },

    render: function() {
      var expStyle = {visibility: 'hidden'}

   	//Subtract 20 pixels from parent container to make sure that we don't run off the screen
      var size = $("#skills").width() - 20;
      return (
        <div className="sunburst" data={this.state.data}  >
        </div>
      );
    }
});


module.exports = SunChart;
