// Generates a D3 bar chart from the Dept_Avg_Pay.csv file.
$(document).ready(function() {

  d3.csv("../data/Dept_Avg_Pay.csv", function(data) {

      var chart = d3.select(".bar_chart").append("svg")
        .attr("width", 100 + "%")
        .attr("height", 375 + "px") // NOT A GOOD SOLUTION! Get divs to properly sit on top of each other.
        .attr("overflow", "visible")
        .attr("display", "block")
        .attr("clear", "both");
        //.attr("height", 1000 + "px");

      chart.selectAll("rect")
        .data(data)
        .enter()
          .append("rect")
          .attr("width", function(d) {return (d.Pay/1.25) * 25;})
          .attr("height", 30)
          .attr("y", function(d, i) {return i * 50;})
          .attr("fill", "blue")
          //.html(function(d) {return d.Pay})


  })

})
