var _ = require(__dirname+'/../index.js')

module.exports = {
  _: _,
  lone: function(x){return ['e',x].join('*')},
  pair: function(x,y){return [x,y].join('*')},
  S: 0,
  V: [0,1,2],
  R: [2,1,0],
  W: [0,1,2,3,4,5],
  M: [[10,20],[30,40],[50,60]]
}
