/************************************* Generates a D3 bar chart. *************************************/

// Draws the chart, axes and labels of the charts.
function drawChart(bardata, chart, domain, vText) {

  // Chart dimensions
  var margin = {top: 30, right: 30, bottom: 40, left: 50};
  var height = 350 - margin.top - margin.bottom,
      barWidth = 50,
      barOffset = 5,
      width = parseInt(d3.select(chart).style("width"), 10),
      width = width - margin.right - margin.left;

var yScale = d3.scale.linear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(domain)
        .rangePoints([0, width]);

var info = d3.select("#page").append("div")
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
        .style('fill', '#234e22')
        .attr('width', (width/bardata.length) + "px")
        .attr('height', function(d) { return yScale(d); })
        .attr('x', function(d,i) {  return i * (barOffset + (width/bardata.length)); })
        .attr('y', function(d) { return height - yScale(d); })
        .on("mouseover", function(d) {
          d3.select(this).style("opacity", .5);

          info.transition()
                  .style('opacity', .9)

          info.html(d)
              .style('left', (d3.event.pageX - 35) + 'px')
              .style('top',  (d3.event.pageY - 20) + 'px')
        })

        .on("mouseout", normalOpacity);

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

  // Creates horizontal axix.
  var hAxis = d3.svg
    .axis()
    .scale(xScale)
    .orient('bottom')

  // Sets styling of the horizontal axis.
  var hGuide = d3.select(chart).select("svg").append('g')
      hAxis(hGuide)
      hGuide.attr('transform', 'translate('+ (margin.left + 3) +', ' + (height + margin.top) + ')')
      hGuide.selectAll('path')
          .style({ fill: 'none', stroke: "#000"})
      hGuide.selectAll('line')
          .style({ stroke: "#000"})

  // Sets labels for the horizontal axis.
  var hLabel = d3.select(chart).append("div")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height - 6)
      .style("position", "absolute")
      .style("left", 40+"%")
      .style("bottom", "0.01em")
      .style("font-family", "Droid Sans")
      .text("Categories");

  // Sets labels for the vertical axis.
  var vLabel = d3.select(chart).append("div")
      .attr("class", "y label")
      .style("position", "absolute")
      .style("left", "-3.25em")
      .style("top", "10em")
      .style("font-family", "Droid Sans")
      .text(vText);

} // End drawChart function

function normalOpacity(d) {
  d3.select(this).style("opacity", 1);
}

/************************************* Builds the Job Database. *************************************/

function buildDB() {

  var app = new Ractive({
    el: ".database-rows",
    template: "#row-template",
    data: {
      myJobs: DB,

      // Code from Ractive.js tutorial: http://learn.ractivejs.org/list-sections/5
      sort: function ( array, sortColumn ) {

        array = array.slice();

        return array.sort( function ( a, b ) {

          if (sortColumn == "Min_Pay" || sortColumn == "Min_Hours") {
            // Sorts from least to greatest.
            return a[ sortColumn ] < b[ sortColumn ] ? -1 : 1;
          }

          // Sorts from greatest to least.
          return a[ sortColumn ] < b[ sortColumn ] ? 1 : -1;
        });
      }
    }
  });

  app.on( 'sort', function ( event, column ) {
    this.set( 'myColumn', column );
  });

  // Uses JQuery UI to give DB an accordion style.
  $(function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  });

} // End buildDB

$(document).ready(function() {

  var data1 = [74, 71, 58, 41, 20, 4, 1], // Jobs per location
      data2 = [10.75,10.24,9.80,9.79,9.53,9.53,8.78], // Average hourly wage
      data3 = [7.0,7.0,6.9,6.6,5.9,4.5,3.0]; // Average skills per job per location

  // Labels for the x-axis
  var domain1 = ["Admin Office", "Student Act.", "Other", "S&L", "Med. Campus", "H&D", "RSMAS"],
      domain2 = ["RSMAS", "Admin Office", "Other", "Med. Campus", "Student Act.", "S&L", "H&D"],
      domain3 = ["Student Act.", "S&L", "Admin Office", "Other", "Med. Campus", "H&D", "RSMAS"];

  // Labels for the y-axis
  var vText1 = "Number of Jobs",
      vText2 = "Avg Hourly Pay",
      vText3 = "Avg # of Skills Required per Job";

  // IDs of charts in the HTML
  var element1 = '#chart1',
      element2 = '#chart2',
      element4 = '#chart4';

  drawChart(data1, element1, domain1, vText1);
  drawChart(data2, element2, domain2, vText2);
  drawChart(data3, element4, domain3, vText3);

  buildDB();

  // Redraws the charts whenever the screen is resized.
  d3.select(window).on("resize", function() {

    d3.selectAll("svg").remove();

    drawChart(data1, element1, domain1, vText1);
    drawChart(data2, element2, domain2, vText2);
    drawChart(data3, element4, domain3, vText3);
  });

})
