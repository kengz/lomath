// module that takes data sets,
// serialize them wrt number of total options,
// generate highcharts options with serialized target,
// save into optionArr.json
// and inject target into html with src
// generate chart.js for bundling
// run gulp task browser sync

// dependencies
var fs = require('fs');
var q = require('q');
var _ = require('lodash');

// imports
var tmpOpt = require(__dirname + '/src/template-option.json');

// definition of plot package, uses highcharts
function p() {

    // global promise object to wait for all plot options to be completed before writing
    this.promises = [];
    // global array for options to plot
    this.optArray = [];

    // simple plot
    this.plot = function(seriesArr, title, yLabel, xLabel) {
        // console.log("plotting")
        var defer = q.defer();
        this.promises.push(defer.promise);

        title = title || false;
        yLabel = yLabel || false;
        xLabel = xLabel || false;

        var opt = _.cloneDeep(tmpOpt),
        set = _.set.bind(null, opt);

        set('series', seriesArr);
        set('title.text', title);
        set('yAxis.title.text', yLabel);
        set('xAxis.title.text', xLabel);

        // setTimeout(function() {}, 2000);
        this.optArray.push(opt);
        defer.resolve();
        return opt;
    };

    // advance plot = specify your own highcharts options
    this.advPlot = function(opt) {
        var defer = q.defer();
        this.promises.push(defer.promise);
        this.optArray.push(opt);
        defer.resolve();

        return opt;
    };

    // write highchart options to json for rendering
    // if autosave is true, charts will save on view
    this.write = function(autosave) {
        var defer = q.defer();
        for (var i = 0; i < this.optArray.length; i++) {
            _.set(this.optArray[i], 'chart.renderTo', 'hchart' + i);
            _.set(this.optArray[i], 'autosave', autosave);
        }
        fs.writeFile(__dirname + '/src/options.json', JSON.stringify(this.optArray), defer.resolve);

        return defer.promise;
    };

    // serialize optArray and write to
    this.serialize = function(autosave) {
        var defer = q.defer();

        q.all(this.promises)
        .then(this.write(autosave))
        .then(defer.resolve());

        return defer.promise;
    };

    // finally, render after all plots specified
    // if autosave is true, charts will save on view
    this.render = function(autosave) {
        var gulpplot = require(__dirname + '/../gulpfile.js').gulpplot;
        
        this.serialize(autosave)
        .then(gulpplot)
    };

    this.dynrender = function() {
        this.serialize()
        // .then(dyngulpplot)
    };
}

exports.p = p;


