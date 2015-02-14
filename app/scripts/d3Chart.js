var d3Chart = {};

var colors = {
  "dev": "#5687d1",
  "d3": "#7b615c",
  "ux": "#de783b",
  "wires": "#6ab975",
  "other": "#a173d1",
  "end": "#bbbbbb"
};

function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
  var foundChild = false;
  for (var k = 0; k < children.length; k++) {
    if (children[k]["name"] == nodeName) {
      childNode = children[k];
      foundChild = true;
      break;
    }
  }
  // If we don't already have a child node for this branch, create it.
  if (!foundChild) {
    childNode = {"name": nodeName, "children": []};
    children.push(childNode);
  }
  currentNode = childNode;
      } else {
  // Reached the end of the sequence; create a leaf node.
  childNode = {"name": nodeName, "size": size};
  children.push(childNode);
      }
    }
  }
  return root;
};

d3Chart.create = function(el, props, state){

  console.log(props)
	var radius = Math.min(props.width, props.height) / 2;
  console.log(radius)


	var vis = d3.select(el).append("svg:svg")
		.attr("class", "d3")
	    .attr("width", props.width)
	    .attr("height", props.height)
	    .append("svg:g")
	    .attr("id", "container")
	    .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");

	var partition = d3.layout.partition()
	    .size([2 * Math.PI, radius * radius])
	    .value(function(d) { return d.size; });

	var arc = d3.svg.arc()
	    .startAngle(function(d) { return d.x; })
	    .endAngle(function(d) { return d.x + d.dx; })
	    .innerRadius(function(d) { return Math.sqrt(d.y); })
	    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });


	var csv = [
  ["dev-d3", "2"],
  ["dev-javascript-jquery","4"],
  ["dev-hmtl","5"],
  ["ux-wires", "2"],
  ["ux-research-usability test", "2"]
  ]
	var json = buildHierarchy(csv);
  console.log(json)
	this._draw(vis, partition, json);
}


d3Chart._draw = function(vis, partition, radius, json) {

  // Basic setup of page elements.
  // initializeBreadcrumbTrail();
  // drawLegend();
  // d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { 
        console.log(d)
        return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      // .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  // d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

 module.exports = d3Chart;