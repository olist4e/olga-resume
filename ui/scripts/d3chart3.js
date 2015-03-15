var d3 = require('d3');

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


var draw = function(el, config, data) {
  var json = buildHierarchy(data);

  var width = (config.width || 840)/2,
      height = width,
      radius = width / 2,
      x = d3.scale.linear().range([0, 2 * Math.PI]),
      y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
      padding = 5,
      duration = 1000;
  
  var div = d3.select(el);
  
  div.select("img").remove();
  
  var vis = div.append("svg")
      .attr("width", width + padding * 2)
      .attr("height", height + padding * 2)
    .append("g")
      .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");
 
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("opacity", 0);
   
  div.append("p")
      .attr("id", "intro")
      .text("Click to zoom!");
  
  var partition = d3.layout.partition()
      .sort(null)
      .value(function(d) { return 5.8 - d.depth; });
  
  var arc = d3.svg.arc()
      .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
      .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
      .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
      .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
  
    var nodes = partition.nodes(json);
  
    var path = vis.selectAll("path").data(nodes);
    path.enter().append("path")
        .attr("id", function(d, i) { return "path-" + i; })
        .attr("d", arc)
        .attr("fill-rule", "evenodd")
        .style("fill", colour)
        .on("click", click)
        .on("mouseover", function(d) {
          tooltip.html(function() {
              if(d.size) {
                var name = d.size + " years of experience" ;
              } else {
                var name = "";
              }
              return name;
         });
          return tooltip.transition()
            .duration(50)
            .style("opacity", 0.9);
        })
        .on("mousemove", function(d) {
          return tooltip
            .style("top", (d3.event.pageY-10)+"px")
            .style("left", (d3.event.pageX+10)+"px");
        })
        .on("mouseout", function(){return tooltip.style("opacity", 0);});
  
    var text = vis.selectAll("text").data(nodes);
    var textEnter = text.enter().append("text")
        .style("fill-opacity", 1)
        .style("fill", function(d) {
          return brightness(d3.rgb(colour(d))) < 125 ? "#eee" : "#000";
        })
        .attr("text-anchor", function(d) {
          return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
        })
        .attr("dy", ".2em")
        .attr("transform", function(d) {
          var multiline = (d.name || "").split(" ").length > 1,
              angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
              rotate = angle + (multiline ? -.5 : 0);
          return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
        })
        .on("click", click);
    textEnter.append("tspan")
        .attr("x", 0)
        .text(function(d) { return d.depth ? d.name.split(" ")[0] : ""; });
    textEnter.append("tspan")
        .attr("x", 0)
        .attr("dy", "1em")
        .text(function(d) { return d.depth ? d.name.split(" ")[1] || "" : ""; });
  
    function click(d) {
      path.transition()
        .duration(duration)
        .attrTween("d", arcTween(d));
  
      // Somewhat of a hack as we rely on arcTween updating the scales.
      text.style("visibility", function(e) {
            return isParentOf(d, e) ? null : d3.select(this).style("visibility");
          })
        .transition()
          .duration(duration)
          .attrTween("text-anchor", function(d) {
            return function() {
              return x(d.x + d.dx / 2) > Math.PI ? "end" : "start";
            };
          })
          .attrTween("transform", function(d) {
            var multiline = (d.name || "").split(" ").length > 1;
            return function() {
              var angle = x(d.x + d.dx / 2) * 180 / Math.PI - 90,
                  rotate = angle + (multiline ? -.5 : 0);
              return "rotate(" + rotate + ")translate(" + (y(d.y) + padding) + ")rotate(" + (angle > 90 ? -180 : 0) + ")";
            };
          })
          .style("fill-opacity", function(e) { return isParentOf(d, e) ? 1 : 1e-6; })
          .each("end", function(e) {
            d3.select(this).style("visibility", isParentOf(d, e) ? null : "hidden");
          });
    }
  
  function isParentOf(p, c) {
    if (p === c) return true;
    if (p.children) {
      return p.children.some(function(d) {
        return isParentOf(d, c);
      });
    }
    return false;
  }
  
  function colour(d) {
    var colours = {
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

    return colours[d.name];
  }
  
  // Interpolate the scales!
  function arcTween(d) {
    var my = maxY(d),
        xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
        yd = d3.interpolate(y.domain(), [d.y, my]),
        yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
    return function(d) {
      return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
    };
  }
  
  function maxY(d) {
    return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
  }
  
  // http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
  function brightness(rgb) {
    return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
  }
  
}

var d3Chart = {
  create: draw,
  update: function(){}
};

module.exports = d3Chart;

