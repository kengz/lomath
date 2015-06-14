// assets for convenience
var A = require(__dirname + '/asset.js')
var _ = A._
  // chai assertation library
var chai = require('chai'),
  // assert = chai.assert,
  // expect = chai.expect,
  should = chai.should()


// describe('Array', function() {
//   describe('_.range', function() {
//     it('should start from 0 by default', function() {
//       assert.equal(0, _.range(3)[0]);
//     })
//   })
// })



//##############################################
suite('Function builder backend', function() {

  //==============================================
  suite('Distribute', function() {

    //----------------------------------------------
    suite('distributeSingle(fn, Y)', function() {
      var fn;
      beforeEach(function() {
        fn = _.distributeSingle;
      })

      test('scalar', function() {
        fn(A.lone, A.S).should.equal('*a')
      })

      test('vector', function() {
        fn(A.lone, A.V).should.deep.equal(['*1', '*2', '*3'])
      })

      test('matrix', function() {
        fn(A.lone, A.M).should.deep.equal([
          ['*1', '*2'],
          ['*3', '*4'],
          ['*5', '*6']
        ])
      })

    })

    //----------------------------------------------
    suite('distributeLeft(fn, X, y)', function() {
      var fn;
      before(function() {
        fn = _.distributeLeft
      })

      test('vector * scalar', function() {
        fn(A.pair, A.V, A.S).should.deep.equal(['1*a', '2*a', '3*a'])
      })

      test('matrix * scalar', function() {
        fn(A.pair, A.M, A.S).should.deep.equal([
          ['1*a', '2*a'],
          ['3*a', '4*a'],
          ['5*a', '6*a']
        ])
      })

    })

    //----------------------------------------------
    suite('distributeRight(fn, x, Y)', function() {
      var fn;
      before(function() {
        fn = _.distributeRight
      })

      test('scalar * vector', function() {
        fn(A.pair, A.S, A.V).should.deep.equal(['a*1', 'a*2', 'a*3'])
      })

      test('scalar * matrix', function() {
        fn(A.pair, A.S, A.M).should.deep.equal([
          ['a*1', 'a*2'],
          ['a*3', 'a*4'],
          ['a*5', 'a*6']
        ])
      })


    })

    //----------------------------------------------
    suite('distributeBoth', function() {
      var fn;
      before(function() {
        fn = _.distributeBoth
      })

      test('vector * vector', function() {
        fn(A.pair, A.U, A.R).should.deep.equal(['a*3', 'b*2', 'c*1'])
      })

      test('vector * matrix', function() {
        fn(A.pair, A.U, A.M).should.deep.equal([
          ['a*1', 'a*2'],
          ['b*3', 'b*4'],
          ['c*5', 'c*6']
        ])
      })

      test('matrix * matrix', function() {
        fn(A.pair, A.L, A.M).should.deep.equal([
          ['a*1', 'b*2'],
          ['c*3', 'd*4'],
          ['e*5', 'f*6']
        ])
      })

      test('non-commutative: order-preserving', function() {
        fn(A.pair, A.U, A.R).should.not.deep.equal(fn(A.pair, A.R, A.U))
      })

      test('vector * longer vector', function() {
        fn(A.pair, A.U, A.VV).should.deep.equal(['a*1', 'b*2', 'c*3', 'a*4', 'b*5', 'c*6'])
      })

      test('longer vector * matrix', function() {
        fn(A.pair, A.UU, A.M).should.deep.equal([
          ['a*1', 'a*2'],
          ['b*3', 'b*4'],
          ['c*5', 'c*6'],
          ['d*1', 'd*2'],
          ['e*3', 'e*4'],
          ['f*5', 'f*6']
        ])
      })

    })

    //----------------------------------------------
    suite('distribute', function() {
      var fn;
      before(function() {
        fn = _.distribute
      })

      test('scalar * scalar', function() {
        fn(A.pair, A.S, A.T).should.deep.equal('a*0')
      })

      test('scalar * vector', function() {
        fn(A.pair, A.S, A.V).should.deep.equal(['a*1', 'a*2', 'a*3'])
      })

      test('scalar * matrix', function() {
        fn(A.pair, A.S, A.M).should.deep.equal([
          ['a*1', 'a*2'],
          ['a*3', 'a*4'],
          ['a*5', 'a*6']
        ])
      })

      test('vector * vector', function() {
        fn(A.pair, A.U, A.R).should.deep.equal(['a*3', 'b*2', 'c*1'])
      })

      test('vector * matrix', function() {
        fn(A.pair, A.U, A.M).should.deep.equal([
          ['a*1', 'a*2'],
          ['b*3', 'b*4'],
          ['c*5', 'c*6']
        ])
      })

      test('matrix * matrix', function() {
        fn(A.pair, A.L, A.M).should.deep.equal([
          ['a*1', 'b*2'],
          ['c*3', 'd*4'],
          ['e*5', 'f*6']
        ])
      })

      test('non-commutative: order-preserving', function() {
        fn(A.pair, A.U, A.R).should.not.deep.equal(fn(A.pair, A.R, A.U))
      })

      test('vector * longer vector', function() {
        fn(A.pair, A.U, A.VV).should.deep.equal(['a*1', 'b*2', 'c*3', 'a*4', 'b*5', 'c*6'])
      })

      test('longer vector * matrix', function() {
        fn(A.pair, A.UU, A.M).should.deep.equal([
          ['a*1', 'a*2'],
          ['b*3', 'b*4'],
          ['c*5', 'c*6'],
          ['d*1', 'd*2'],
          ['e*3', 'e*4'],
          ['f*5', 'f*6']
        ])
      })

    })



  })


  //==============================================
  suite('Associate', function() {

    //----------------------------------------------
    suite('asso', function() {
      var fn, wrapfn;
      before(function() {
        fn = _.asso
        wrapfn = function() {
          return fn(A.pair, arguments)
        }
      })

      test('apply in order', function() {
        wrapfn('a', 'b', 'c').should.equal('a*b*c');
      })

      test('applicable to single array', function() {
        fn(A.pair, ['a', 'b', 'c']).should.equal('a*b*c');
      })

    })

    //----------------------------------------------
    suite('assodist', function() {
      var fn, wrapfn;
      before(function() {
        fn = _.assodist
        wrapfn = function() {
          return fn(A.pair, arguments)
        }
      })

      test('apply in order, distribute while can', function() {
        wrapfn('a', A.V, 'b').should.deep.equal(['a*1*b', 'a*2*b', 'a*3*b']);
      })

    })


  })


})




// The "TDD" interface provides suite(), test(), suiteSetup(), suiteTeardown(), setup(), and teardown()
//
// suite('Array', function() {
//   setup(function() {
//     // ...
//   });
//
//   suite('#indexOf()', function() {
//     test('should return -1 when not present', function() {
//       assert.equal(-1, [1, 2, 3].indexOf(4));
//     });
//   });
// })

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
