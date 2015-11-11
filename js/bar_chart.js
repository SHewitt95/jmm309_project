// Generates a D3 bar chart from the Dept_Avg_Pay.csv file.
$(document).ready(function() {

  d3.csv("../data/Dept_Avg_Pay.csv", function(data) {

      var chart = d3.select(".bar_chart").append("svg")
        .attr("width", 100 + "%")
        //.attr("height", 100 + "%");
        .attr("height", 1000 + "px");

      chart.selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .attr("width", function(d) {return d.Pay * 10;})
          .attr("height", 50)
          .attr("y", function(d, i) {return i * 50;})
          .attr("fill", "blue")


  })

})
