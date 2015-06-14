// lomath import
var _ = require(__dirname+'/../index.js')
// Asset for export
var A = {
  _: _,
  lone: function(x){return ['',x].join('*')},
  pair: function(x,y){return [x,y].join('*')},
  S: 'a',
  T: 0,
  U: ['a','b','c'],
  UU: ['a','b','c','d','e','f'],
  V: [1,2,3],
  VV: [1,2,3,4,5,6],
  VZ: [0,1,2,3,4,5],
  N: [-1,-2,-3],
  R: [3,2,1],
  L: [['a','b'],['c','d'],['e','f']],
  M: [[1,2],[3,4],[5,6]],
  K: [[-1,-2],[-3,-4],[-5,-6]],
  reNum: /[0-9]+/,
  reWord: /[a-zA-Z]+/,
  str: 'Pi314159',
  strNum: '314159',
  strWord: 'Pi',
  B: [
    [[1,1,1,1],[2,2,2,2],[3,3,3,3]],
    [[4,4,4,4],[5,5,5,5],[6,6,6,6]]
  ],
  C: [[1,2,3],[4,5,6],[7,8,9]],
  D: [['a','b','c'],[1,2,3],[-1,-2,-3]]
}
// export asset
module.exports = A;
