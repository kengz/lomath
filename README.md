# lomath
[![npm version](https://badge.fury.io/js/lomath.svg)](http://badge.fury.io/js/lomath) [![Build Status](https://travis-ci.org/kengz/lomath.svg?branch=master)](https://travis-ci.org/kengz/lomath) [![Coverage Status](https://coveralls.io/repos/kengz/lomath/badge.svg?branch=master)](https://coveralls.io/r/kengz/lomath?branch=master) [![Dependency Status](https://gemnasium.com/kengz/lomath.svg)](https://gemnasium.com/kengz/lomath)

A high performance, professional math module extending lodash;  comes with plotting module based on highcharts.

**Installation**: `npm install lomath`

To use the plotting module, go into your node_modules/lomath and run `npm install` from there; it requires the dev modules in lomath.

testrun: see `demo/demo.js` for magic.
<!-- 
```Javascript
var _ = require('lomath');

// use lodash as usual
var v = _.range(10);

// lomath: generalized math functions applicable to multi-array
var vv = _.square(v);

console.log(v);
console.log(vv);

// prints all the functions
// console.log(_.functions(_));


// data visualization: highcharts plotter
// call contructor of highcharts plotter. Note the ()
var hc = _.hc();

// first, enum plots
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
        data: _.log(_.range(20))
    }],
    "Title 2"
    )

// Magic here! pulls up a browser (default to chrome for better support) with the plotted charts automatically.
hc.render();

``` -->

Docs and tests coming soon.


## Roadmap
- instruction for using plot
- add aliases
- ✓sample usage
- docs
- ✓tests
- performance benchmark
- ✓data visualization
