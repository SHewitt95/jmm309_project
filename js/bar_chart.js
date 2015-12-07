// Generates a D3 bar chart.
$(document).ready(function() {

// bardata, name of chart id,
  ///////////// Chart 1 /////////////
  var data1 = [74, 71, 58, 41, 20, 4, 1], // Jobs per location
    data2 = [10.75,10.24,9.80,9.79,9.53,9.53,8.78], // Average hourly wage
    data3 = [],
    data4 = [7.0,7.0,6.9,6.6,5.9,4.5,3.0]; // Average skills per job per location

  var height = 400,
      width = 600,
      barWidth = 50,
      barOffset = 5;

  var element1 = '#chart1',
    element2 = '#chart2',
    element3 = '#chart3',
    element4 = '#chart4';

function drawChart(bardata, chart) {

  var yScale = d3.scale.linear()
          .domain([0, d3.max(bardata)])
          .range([0, height]);

  var xScale = d3.scale.ordinal()
          .domain(d3.range(0, bardata.length))
          .rangeBands([0, width])

// '#chart1'
  d3.select(chart).append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background', '#C9D7D6')
      .selectAll('rect').data(bardata)
      .enter().append('rect')
          .style('fill', '#C61C6F')
          .attr('width', xScale.rangeBand())
          .attr('height', function(d) {
              return yScale(d);
          })
          .attr('x', function(d,i) {
              return xScale(i);
          })
          .attr('y', function(d) {
              return height - yScale(d);
          })

}

drawChart(data1, element1);
drawChart(data2, element2);
drawChart(data3, element3);
drawChart(data4, element4);


  ///////////// Chart 2 /////////////


  ///////////// Chart 3 /////////////


  ///////////// Chart 4 /////////////


})
