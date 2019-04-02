
  // set the dimensions and margins of the graph

  var margin = {top: 10, right: 20, bottom: 30, left: 50},
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    d3.csv("assets/data/data.csv").then(function(healthData) {
     
    // log a list 
    var poverty_values = healthData.map(data => data.poverty);
    var healthcare_values = healthData.map(data => data.healthcare);
    var abbr_values = healthData.map(data => data.abbr);
    console.log("poverty", poverty_values);
    console.log("healthcare", healthcare_values);
    console.log("abbr", abbr_values)
   
    // Add X axis
      var x = d3.scaleLinear()
      .domain([8, 25])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 25])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

// Add dots
var circlesGroup = chartGroup.selectAll("circle")
.data(healthData)
.enter()
.append("circle")
  .attr("cx", function (d) { return x(d.poverty); } )
  .attr("cy", function (d) { return y(d.healthcare); } )
  .text(function(d){return d.abbr})
  .attr("r", 8)
  .style("fill", "#69b3a2")
  .style("opacity", "0.7")
  .attr("stroke", "black");

 // Step 1: Initialize Tooltip
 var toolTip = d3.tip()
 .attr("class", "tooltip")
 .offset([80, -60])
 .html(function(d) {
   return (`State: ${d.abbr}<br/>Poverty: ${d.poverty}<br/>Healthcare: ${d.healthcare}`);
 });
      // Step 2: Create the tooltip in chartGroup.
      chartGroup.call(toolTip);

      // Step 3: Create "mouseover" event listener to display tooltip
      circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this);
      })
      // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(d) {
          toolTip.hide(d);
        });
});
