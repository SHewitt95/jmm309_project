// Generates a D3 bar chart.

///////////// Chart 1 /////////////
var data1 = [74, 71, 58, 41, 20, 4, 1], // Jobs per location
  data2 = [10.75,10.24,9.80,9.79,9.53,9.53,8.78], // Average hourly wage
  data3 = [7.0,7.0,6.9,6.6,5.9,4.5,3.0]; // Average skills per job per location

var domain1 = ["Admin Office", "Student Act.", "Other", "S&L", "Med. Campus", "H&D", "RSMAS"],
    domain2 = ["RSMAS", "Admin Office", "Other", "Med. Campus", "Student Act.", "S&L", "H&D"],
    domain3 = ["Student Act.", "S&L", "Admin Office", "Other", "Med. Campus", "H&D", "RSMAS"];

var margin = {top: 30, right: 30, bottom: 40, left: 50};

var height = 450 - margin.top - margin.bottom,
    width = 800 - margin.right - margin.left,
    barWidth = 50,
    barOffset = 5;

var element1 = '#chart1',
  element2 = '#chart2',
  element4 = '#chart4';


function drawChart(bardata, chart, domain) {

var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(domain)
        .rangePoints([0, width]);

var info = d3.select(chart).append("div")
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)

d3.select(chart).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style({"background": "white"})
    .append("g")
    .attr("transform", 'translate('+ margin.left +', '+ margin.top +')')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', 'blue')
        .attr('width', (width/bardata.length) + "px")
        .attr('height', function(d) {
            return yScale(d);
        })
        .attr('x', function(d,i) {
            return i * (barOffset + (width/bardata.length));
        })
        .attr('y', function(d) {
            return height - yScale(d);
        })
        .on("mouseover", function(d) {
          d3.select(this).style("opacity", .5);

          info.transition()
                  .style('opacity', .9)

          info.html(d)
              .style('left', (d3.event.pageX - 35) + 'px')
              .style('top',  (d3.event.pageY - 25) + 'px')
        })

        .on("mouseout", normalOpacity)

  // Sets values for each tick mark on y-axis.
  var vGuideScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([height, 0])

  // Sets tick mark placement and amount on y-axis.
  var vAxis = d3.svg.axis()
      .scale(vGuideScale)
      .orient('left')
      .ticks(10)

  // Styles y-axis line and moves into view.
  var vGuide = d3.select(chart).select("svg").append("g")
      vAxis(vGuide)
      vGuide.attr('transform', 'translate('+ (margin.left - 5) +', '+ margin.top +')')
      vGuide.selectAll('path')
          .style({ fill: 'none', stroke: "#000"})
      vGuide.selectAll('line')
          .style({ stroke: "#000"})

  var hAxis = d3.svg
    .axis()
    .scale(xScale)
    .orient('bottom')
    .ticks(7)
    //.tickValues([10,11,12,13,14,15,16,17]);

  var hGuide = d3.select(chart).select("svg").append('g')
      hAxis(hGuide)
      hGuide.attr('transform', 'translate('+ (margin.left + 3) +', ' + (height + margin.top) + ')')
      hGuide.selectAll('path')
          .style({ fill: 'none', stroke: "#000"})
      hGuide.selectAll('line')
          .style({ stroke: "#000"})

} // End drawChart function

function normalOpacity(d) {
  d3.select(this).style("opacity", 1);
}

$(document).ready(function() {
// bardata, name of chart id,
  drawChart(data1, element1, domain1);
  drawChart(data2, element2, domain2);
  //drawChart(data3, element3);
  drawChart(data3, element4, domain3);
})
