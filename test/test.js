// var _ = require(__dirname+'/../index.js')
var A = require(__dirname + '/asset.js')
var _ = A._
// var assert = require('assert')
var assert = require('chai').assert

describe('Array', function() {
  describe('_.range', function() {
    it('should start from 0 by default', function() {
      assert.equal(0, _.range(3)[0]);
    })
  })
})


suite('Distribute', function() {

  suite('distributeSingle(fn, Y)', function() {
		var fn = _.distributeSingle;
    test('should return', function() {
      assert.equal('e*0', fn(A.lone, A.S))
    })
		test('should do', function(){
		  assert.deepEqual(['e*0', 'e*1', 'e*2'], fn(A.lone, A.V))
		})

  })

})



// The "TDD" interface provides suite(), test(), suiteSetup(), suiteTeardown(), setup(), and teardown()

suite('Array', function() {
  setup(function() {
    // ...
  });

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
})

// BDD
// The "BDD" interface provides describe(), context(), it(), before(), after(), beforeEach(), and afterEach():

// context() is just an alias for describe(), and behaves the same way; it just provides a way to keep tests easier to read and organized
// describe('Array', function(){
//   before(function(){
//     // ...
//   });
//
//   describe('#indexOf()', function(){
//     context('when not present', function(){
//       it('should not throw an error', function(){
//         (function(){
//           [1,2,3].indexOf(4);
//         }).should.not.throw();
//       });
//       it('should return -1', function(){
//         [1,2,3].indexOf(4).should.equal(-1);
//       });
//     });
//     context('when present', function(){
//       it('should return the index where the element first appears in the array', function(){
//         [1,2,3].indexOf(3).should.equal(2);
//       });
//     });
//   });
// })

// QUnit
// function ok(expr, msg) {
//   if (!expr) throw new Error(msg);
// }
//
// suite('Array');
//
// test('#length', function(){
//   var arr = [1,2,3];
//   ok(arr.length == 3);
// });
//
// test('#indexOf()', function(){
//   var arr = [1,2,3];
//   ok(arr.indexOf(1) == 0);
//   ok(arr.indexOf(2) == 1);
//   ok(arr.indexOf(3) == 2);
// });
//
// suite('String');
//
// test('#length', function(){
//   ok('foo'.length == 3);
// });
