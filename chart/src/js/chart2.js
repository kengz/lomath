var _ = require('../../../index.js');

var options = {
  credits: false,
  chart: {
    renderTo: 'container2'
  },
  title: {
    text: 'My title2'
  },
  subtitle: {
    text: 'My subtitle'
  },
  tooltip: {
    borderRadius: 0,
    borderWidth: 1,
    crosshairs: [true, false]
  },
  xAxis: {
    type: 'date time'
    // categories: ['Apples', 'Bananas', 'Oranges']
  },
  yAxis: {
    title: {
      text: 'Fruit eaten'
    }
  },
  series: [{
    data: _.square(_.range(10)),
    pointStart: 0,
    pointInterval: 1
    // name: 'Jane',
    // data: _.range(3)
  // }, {
    // name: 'John',
    // data: [5, 7, 3]
  }]
};



$(function() {
  // Apply the theme
  // Highcharts.setOptions(Highcharts.theme);

  var chart1 = new Highcharts.Chart(options);
});
