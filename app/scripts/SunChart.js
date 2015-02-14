

var React = window.React = require('react');
var d3Chart = require('./d3Chart');

var SunChart = React.createClass({
  propTypes:{
    data:React.PropTypes.array
  },

  getInitialState: function() {
    return {
      data: {}
    };
  },
  componentDidMount: function() {
     var el = this.getDOMNode();
     // console.log(el)
     // console.log(d3Chart)
     d3Chart.create(el, {
       width: '300',
       height: '300'
     }, this.getChartState());
   },

   // componentDidUpdate: function() {
   //   var el = this.getDOMNode();
   //   d3Chart.update(el, this.getChartState());
   // },

   getChartState: function() {
     return {
       data: this.props.data,
       domain: this.props.domain
     };
   },

   // componentWillUnmount: function() {
   //   var el = this.getDOMNode();
   //   d3Chart.destroy(el);
   // },

   render: function() {
     return (
       <div className="sunburst"
          data={this.state.data} >
       </div>
     );
   }
});


module.exports = SunChart;