# lomath

[![npm version](https://badge.fury.io/js/lomath.svg)](http://badge.fury.io/js/lomath) [![Build Status](https://travis-ci.org/kengz/lomath.svg?branch=master)](https://travis-ci.org/kengz/lomath) [![Coverage Status](https://coveralls.io/repos/kengz/lomath/badge.svg?branch=master)](https://coveralls.io/r/kengz/lomath?branch=master) [![Dependency Status](https://gemnasium.com/kengz/lomath.svg)](https://gemnasium.com/kengz/lomath)

[**Lomath**](https://github.com/kengz/lomath) is the data analysts' module in `Node JS` - data analysis and visualization in `Node` is now possible with `lomath`.

It is the mathematical extension of [`lodash`](https://lodash.com) with many high performance functions, generalized and applicable to tensors (multi-arrays). It comes with a standalone plotting module that using `HighCharts` and `BrowserSync`.

See the [API documentation](http://kengz.github.io/lomath/). For the included functions, see the [lodash API documentation](https://lodash.com/docs).

## Community

[![Join the chat at https://gitter.im/kengz/lomath](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/kengz/lomath?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation

**Installation**:

```
npm install lomath
```


To use the plotting module, do:

```
// in the terminal at your project's root, do:
cd node_modules/lomath
npm install
```

## Usage

See the [API documentation](http://kengz.github.io/lomath/) and [lodash API documentation](https://lodash.com/docs) for example usage.

**Lomath** comes with the latest version of [`lodash`](https://lodash.com), and more. Use it as you would normally use `lodash` or `underscore`, and it has many math functions familiar to users of the `R` language.

For clearer terminology, we call `tensors` the generic data structures:

| data structure | terminology |
|:---|:---|
| `0` | scalar = rank-0 tensor |
| `[1, 2, 3]` | vector = rank-1 tensor |
| `[[1, 2], [3, 4]]` | matrix = rank-2 tensor |
| ...and so on | rank-n tensor |

You can also extend `lomath` and define your own function that applies to tensors, using the function composition module such as `_.distribute, _.asso`, etc.

## Plotting Module

<img src="./docs/demo.gif" alt="Sample plot" width="100%" style="display:inline-block" />

`lomath` comes with a standalone plotting module that using `HighCharts` and `BrowserSync`. Just run your JS file normally when you plot (example below), and it will automatically pull up a browser showing you the charts; you can save them!

**Demo**: see `demo/demo.js` for magic.

```
var _ = require('lomath');

// use lodash as usual
var v = _.range(10);

// lomath: generalized math functions applicable to multi-array
var vv = _.square(v);

console.log(v);
console.log(vv);

// prints all the functions in lomath
// console.log(_.functions(_));


// data visualization: highcharts plotter
// call contructor of highcharts plotter. Note the ()
var hc = _.hc();

// first, list all you wish to plot.
hc.plot(
    [{
        name: "linear",
        data: v
    }, {
        name: "square",
        data: vv
    }],
    "Title 1"
    )

hc.plot(
    [{
        name: "log",
        data: _.log(v)
    }],
    "Title 2"
    )

//optionally you can use the original HighCharts plot options object by:
hc.advPlot(HighChartsOptions);

// Magic here! Finally, the command to render all the plots above.
// Pulls up a browser (default to chrome for better support) with the charts.
// calling hc.render(true) will autosave all plots to your downloads folder.
hc.render();

```


## Roadmap
- add timer tick tock
- Multivar methods for ML: special dot, matrix mult, sum of expression using index, trace, det, inverse, logistic fn.
- add aliases
- add Randomjs engine
- higher dimensional math
- JSON object methods
- more stats methods: sample, multidim probs, covarience, distributions
- performance benchmark
