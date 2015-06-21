# lomath
[![npm version](https://badge.fury.io/js/lomath.svg)](http://badge.fury.io/js/lomath) [![Build Status](https://travis-ci.org/kengz/lomath.svg?branch=master)](https://travis-ci.org/kengz/lomath) [![Coverage Status](https://coveralls.io/repos/kengz/lomath/badge.svg?branch=master)](https://coveralls.io/r/kengz/lomath?branch=master) [![Dependency Status](https://gemnasium.com/kengz/lomath.svg)](https://gemnasium.com/kengz/lomath)

A high performance, professional math module extending lodash.

**Installation**: `npm install lomath`

testrun:

```Javascript
var _ = require('lomath');

var v = _.range(3); // use lodash as usual!
var m = [v,v,v]; // das a matrix

var res = _.add(v, m); // lomath extension!
console.log(res); // magic

console.log(_.functions(_)) // all the functions in lodash, prepended with lomath functions
```

Docs and tests coming soon.

## visualizer Roadmap
- ✓auto serializer and injector
- ✓json template; use with injector when plot() is called. Serialize.
- ✓charts image export/save button.
- ✓Nope can't do. Image autosave in folder.
- ✓1) more image formats
- ✓2) fully offline: download highcharts pkg
- ✓3) online or local package as backup
- ✓plot() wrapped gulp task in JS function, auto run gulp. Terminates browserSync for non-dev.

## Roadmap
- add aliases
- sample usage
- docs
- ✓tests
- performance benchmark
- ✓data visualization
