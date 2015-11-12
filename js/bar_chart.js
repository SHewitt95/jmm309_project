// Generates a D3 bar chart from the Dept_Avg_Pay.csv file.
$(document).ready(function() {

  var height = 400;
  var width = 400;

  var widthScale = d3.scale.linear()
    .domain([0, 12])
    .range([0, width]);

  d3.csv("../data/Dept_Avg_Pay.csv", function(data) {

      var axis = d3.svg.axis()
        .scale(widthScale);

      var chart = d3.select(".bar_chart").append("svg")
        .attr("width", 100 + "%")
        .attr("height", 400 + "px")
        .attr("display", "block")
        .append("g")
        .attr("transform", "translate(20, 10)")
        //.call(axis);

      chart.selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .attr("width", function(d) {return d.Pay * 30;})
          .attr("height", 30)
          .attr("y", function(d, i) {return i * 50;})
          .attr("fill", "blue");

      chart.append("g")
        .attr("transform", "translate(0, 350)")
        .call(axis);
  })
})
