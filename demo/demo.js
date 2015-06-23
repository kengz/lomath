// import as usual:
var _ = require(__dirname+'/../index.js')

// use lodash as usual
var v = _.range(10);

// lomath: generalized math functions applicable to multi-array
var vv = _.square(v);

console.log(v);
console.log(vv);

// prints all the functions
// console.log(_.functions(_));


////////////////////////////////////////////
// data visualization: highcharts plotter //
////////////////////////////////////////////
// call contructor of highcharts plotter. Note the ()
// var hc = _.hc();

// // first, list all you wish to plot.
// hc.plot(
//     [{
//         name: "linear",
//         data: v
//     }, {
//         name: "square",
//         data: vv
//     }],
//     "Title 1"
//     )
// hc.plot(
//     [{
//         name: "log",
//         data: _.log(v)
//     }],
//     "Title 2"
//     )

// // finally, render all the enumerate plots
// // pulls up a browser (default to chrome for better support) with the plotted charts
// hc.render();

// Magical, eh?
