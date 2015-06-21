// import as usual: 
var _ = require(__dirname+'/../index.js')

// use lodash as usual
var v = _.range(4);

// lomath: generalized math functions applicable to multi-array
var vv = _.square(v);

console.log(v);
console.log(vv);

// prints all the functions
// console.log(_.functions(_));