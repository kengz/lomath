var _ = require(__dirname+'/../index.js')

// call contructor of highcharts plotter. Note the ()
var hc = _.hc();

// first, enum plots
hc.plot(
    [{
        name: "linear",
        data: _.range(10)
    }, {
        name: "square",
        data: _.square(_.range(10))
    }],
    "Title 1"
    )
hc.plot(
    [{
        name: "log",
        data: _.log(_.range(20))
    }],
    "Title 2"
    )

// finally, render all the enumerate plots
// pulls up a browser (default to chrome for better support) with the plotted charts
hc.render();
