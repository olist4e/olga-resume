var d3Chart = {};

var colors = {
  "dev": "#0000A0", //Navi blue
  "javascript": "#3600A1",
  "jquery": "#400AAB",
  "react":"#5E28C9",
  "bootstrap":"#723CDD",
  "d3": "#8650F1",

  "html":"#8600A1",
  "css":"#A10086",
  "python":"#1B00A1",


  "ux": "#800517", //Firebrick
  
  "design": "#A82D3F",
  "axure" : "#F87D8F",
  "photoshop" : "#E4697B",
  "illustrator" : "#DA5F71",
  "prototyping" : "#BC4153",
  "story boarding" : "#EE7385",

  "research": "#6C0003",
  "usability testing": "#260000",
  "contextual inquiry" : "#3A0000",
  "scenarios" : "#4E0000",
  "personas" : "#620000",
  "heuristic evaluation" : "#1C0000",

  "agile":"#801C05"
  
};
var lColors = {
  "dev": "#0000A0",
  "ux": "#800517",
  "agile":"#801C05"
}

var b = {
  w: 100, h: 30, s: 3, t: 10
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
          childNode = {"name": nodeName, "size": size, children:[]};
          children.push(childNode);
      }
    }
  }
  return root;
};

d3Chart.vis = null;
d3Chart.legend = null;
d3Chart.bread = null;

d3Chart.create = function(el, props, state){
	var vis = d3.select(el).append("svg:svg")
		.attr("class", "d3")
	    .attr("width", props.width)
	    .attr("height", props.height)
	    .append("svg:g")
	    .attr("id", "container")
	    .attr("transform", "translate(" + props.width / 2 + "," + props.height / 2 + ")");

      this.vis = vis;
      this._update(el, props, state);
}

d3Chart.update = function(el, props, state){
  if (!this.vis) return false;
 d3.selectAll("svg").remove();
  this.create(el, props, state);

}

d3Chart._update = function(el, props, state){
  var radius = Math.min(props.width, props.height) / 2;
  // b.w = Math.floor(props.width/3);

  var partition = d3.layout.partition()
      .size([2 * Math.PI, radius * radius])
      .value(function(d) { return d.size; });

  var arc = d3.svg.arc()
      .startAngle(function(d) { return d.x; })
      .endAngle(function(d) { return d.x + d.dx; })
      .innerRadius(function(d) { return Math.sqrt(d.y); })
      .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

  var json = buildHierarchy(state.data);
  
  // Basic setup of page elements.
  this._initializeBreadcrumbTrail();
  this._drawLegend();
  this._draw(partition, radius, arc, json);

}

d3Chart._initializeBreadcrumbTrail = function() {
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", '100%')
      .attr("height", 50)
      .attr("id", "trail");
}

d3Chart._drawLegend = function() {
  //Getting the width of the legend container
  // var lw = d3.select("#legend")[0][0].clientWidth;
    // Dimensions of legend item: width, height, hight of the label, spacing, radius of rounded rect.
    var li = {
      w: 60, h: 60, hl:30, s: 3, r: 0
    };

    var legend = d3.select("#legend").append("svg:svg")
        .attr("width", li.w*d3.keys(lColors).length)
        .attr("height", (li.h + li.s));

    legend.append('text').text('Legend')
        .attr('class','legend-title')
        .attr("fill","red")
        .attr("x",0)
        .attr("y",20)

    var g = legend.selectAll("g")
        .data(d3.entries(lColors))
        .enter().append("svg:g")
        .attr("transform", function(d, i) {
                return "translate(" + i*(li.w+li.s) + ", "+ li.hl +")";
             });

    g.append("svg:rect")
        .attr("rx", li.r)
        .attr("ry", li.r)
        .attr("width", li.w)
        .attr("height", li.hl)
        .style("fill", function(d) { return d.value; });

    g.append("svg:text")
        .attr("x", li.w / 2)
        .attr("y", li.hl / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { 
          return d.key; });
  }

d3Chart._getAncestors = function(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

d3Chart._breadcrumbPoints = function(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  // console.log(points)
  return points.join(" ");
}

d3Chart._updateBreadcrumbs = function (nodeArray) {
  var THIS = this;
  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", THIS._breadcrumbPoints)
      .style("fill", function(d) { return colors[d.name]; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();
}


d3Chart._draw = function(partition, radius, arc, json) {
  var THIS = this;
  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  THIS.vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = THIS.vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { 
        return d.depth ? null : "none"; })
      .attr("id", function(d, i){return "path"+ i})
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 0.8)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;


  // Fade all but the current sequence, and show it in the breadcrumb trail.
  function mouseover(d) {
    // var percentage = (100 * d.value / totalSize).toPrecision(3);
    // console.log(d)
    // var percentageString = percentage;
    // if (percentage < 0.1) {
    //   percentageString = "< 0.1%";
    // }

    d3.select("#initial-text").style("visibility","hidden");

    d3.select("#percentage")
        .text(d.size);

    d3.select("#skillz").text(d.name);

    d3.select("#explanation")
        .style("visibility", "");

    d3.select("#skillz").style("visibility", "");
    d3.select("#trail")
        .style("visibility", "");

    var sequenceArray = THIS._getAncestors(d);
    THIS._updateBreadcrumbs(sequenceArray);

    // Fade all the segments.
    d3.selectAll("path")
        .style("opacity", 0.3);

    // Then highlight only those that are an ancestor of the current segment.
    THIS.vis.selectAll("path")
        .filter(function(node) {
                  return (sequenceArray.indexOf(node) >= 0);
                })
        .style("opacity", 1);
  }

  // Restore everything to full opacity when moving off the visualization.
  function mouseleave(d) {

    // Hide the breadcrumb trail
    d3.select("#trail")
        .style("visibility", "hidden");

    // Deactivate all segments during transition.
    d3.selectAll("path").on("mouseover", null);

    // Transition each segment to full opacity and then reactivate it.
    d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", 1)
        .each("end", function() {
                d3.select(this).on("mouseover", mouseover);
              });

    d3.select("#explanation")
        .style("visibility", "hidden");

    d3.select("#skillz").style("visibility", "hidden");
    d3.select("#initial-text").style("visibility","");
  }

  // Given a node in a partition layout, return an array of all of its ancestor


 };

 module.exports = d3Chart;