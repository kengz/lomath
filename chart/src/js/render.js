var _ = require('../../../index.js');
var optArray = require('./../options.json');

$(function() {
  // local save via svg -> canvas -> png/jpeg
  Highcharts.Chart.prototype.createCanvas = function(title, ext, index) {
    var svg = this.getSVG(),
    width = parseInt(svg.match(/width="([0-9]+)"/)[1]),
    height = parseInt(svg.match(/height="([0-9]+)"/)[1]),
    canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    if (canvas.getContext && canvas.getContext('2d')) {

      // uses canvg
      canvg(canvas, svg);

      // download
      var filename = title.text ? title.text: 'chart'+index;
      var link = document.createElement('a');
      link.href = canvas.toDataURL('image/' + ext);
      link.download = filename + '.' + ext;
      link.click();

    } 
    else {
      alert("Your browser doesn't support this feature, please use a modern browser");
    }
  }

  // extending exporting properties for local save
  function localExport(opt) {
    var ind = _.reGet(/\d/)(opt.chart.renderTo);
    _.assign(opt, {
      'exporting': {
        'buttons': {
          'contextButton': {
            'y': -10,
            'menuItems': [{
              'text': 'Save as PNG',
              onclick: function() {
                this.createCanvas(opt.title, 'png', ind);
              },
              'separator': false
            }, {
              'text': 'Save as JPEG',
              onclick: function() {
                this.createCanvas(opt.title, 'jpeg', ind);
              },
              'separator': false
            }]
          }
        }
      }
    })
    return opt;
  }

  // call for each chart in optArray
  for (var i = 0; i < optArray.length; i++) {
    var c = new Highcharts.Chart(
      localExport(optArray[i])
      )
    // auto-call download png if autosave is true in render(autosave)
    if (optArray[i].autosave) {
      c.createCanvas(optArray[i].title, 'png', i);
    }
  };

});
