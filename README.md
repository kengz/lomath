# lomath
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
- docs
- tests
- performance benchmark