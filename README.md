# lomath
[![Build Status](https://travis-ci.org/kengz/lomath.svg?branch=master)](https://travis-ci.org/kengz/lomath)
[![Coverage Status](https://coveralls.io/repos/kengz/lomath/badge.svg)](https://coveralls.io/r/kengz/lomath)

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

## Roadmap
- add aliases
- sample usage
- docs
- tests
- performance benchmark
- data visualization
