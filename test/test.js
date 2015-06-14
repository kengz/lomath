// assets for convenience
var A = require(__dirname + '/asset.js')
var _ = A._
  // chai assertation library
var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should()


// describe('Array', function() {
//   describe('_.range', function() {
//     it('should start from 0 by default', function() {
//       assert.equal(0, _.range(3)[0]);
//     })
//   })
// })



//==============================================
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
      test('mismatch vector length', function() {
        (function() {
          return fn(A.pair, A.V, [1, 2])
        }).should.throw(/different dimensions/)
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





//==============================================
suite('Simple functions generalized with assodist for tensor', function() {

  //----------------------------------------------
  suite('c', function() {
    var fn;
    before(function() {
      fn = _.c
    })

    test('concat scalars', function() {
      fn('a', 'b', 'c').should.deep.equal(['a', 'b', 'c'])
    })

    test('concat vector', function() {
      fn(A.V).should.deep.equal(A.V)
    })

    test('concat matrix', function() {
      fn(A.M).should.deep.equal([1, 2, 3, 4, 5, 6])
    })

    test('concat tensors', function() {
      fn(A.S, A.V, A.U, A.M).should.deep.equal(['a', 1, 2, 3, 'a', 'b', 'c', 1, 2, 3, 4, 5, 6])
    })

  })


  //----------------------------------------------
  suite('a_sum', function() {
    var fn;
    before(function() {
      fn = _.a_sum
    })

    test('atomic sum single tensor', function() {
      fn(A.M).should.equal(1 + 2 + 3 + 4 + 5 + 6)
    })

  })

  //----------------------------------------------
  suite('sum', function() {
    var fn;
    before(function() {
      fn = _.sum
    })

    test('sum tensors', function() {
      fn(A.T, A.V, A.M).should.equal(0 + 1 + 2 + 3 + 1 + 2 + 3 + 4 + 5 + 6)
    })

  })

  //----------------------------------------------
  suite('a_prod', function() {
    var fn;
    before(function() {
      fn = _.a_prod
    })

    test('atomic product single tensor', function() {
      fn(A.M).should.equal(1 * 2 * 3 * 4 * 5 * 6)
    })

  })

  //----------------------------------------------
  suite('prod', function() {
    var fn;
    before(function() {
      fn = _.prod
    })

    test('prod tensors', function() {
      fn(A.T, A.V, A.M).should.equal(0 * 1 * 2 * 3 * 1 * 2 * 3 * 4 * 5 * 6)
    })

  })

  //----------------------------------------------
  suite('a_add', function() {
    var fn;
    before(function() {
      fn = _.a_add
    })

    test('atomic add scalars', function() {
      fn(1, 2).should.equal(1 + 2)
    })

  })

  //----------------------------------------------
  suite('add', function() {
    var fn;
    before(function() {
      fn = _.add
    })

    test('scalars', function() {
      fn(1, 2, 3).should.equal(1 + 2 + 3)
    })

    test('scalar and vector', function() {
      fn(A.T, A.V).should.deep.equal(A.V)
    })

    test('scalar and matrix', function() {
      fn(A.T, A.M).should.deep.equal(A.M)
    })

    test('vector and vector', function() {
      fn(A.V, A.N).should.deep.equal([0, 0, 0])
    })

    test('vector and matrix', function() {
      fn(A.V, A.M).should.deep.equal([
        [1 + 1, 1 + 2],
        [2 + 3, 2 + 4],
        [3 + 5, 3 + 6]
      ])
    })

    test('matrix and matrix', function() {
      fn(A.K, A.M).should.deep.equal([
        [0, 0],
        [0, 0],
        [0, 0]
      ])
    })

    test('vectors of unequal lengths', function() {
      fn(A.V, A.VV).should.deep.equal([1 + 1, 2 + 2, 3 + 3, 1 + 4, 2 + 5, 3 + 6])
    })

    test('tensors of unequal lengths', function() {
      fn(A.VV, A.M).should.deep.equal([
        [1 + 1, 1 + 2],
        [2 + 3, 2 + 4],
        [3 + 5, 3 + 6],
        [4 + 1, 4 + 2],
        [5 + 3, 5 + 4],
        [6 + 5, 6 + 6]
      ])
    })

    test('multiple tensors', function() {
      fn(A.V, A.M, A.R).should.deep.equal([
        [1 + 1 + 3, 1 + 2 + 3],
        [2 + 3 + 2, 2 + 4 + 2],
        [3 + 5 + 1, 3 + 6 + 1]
      ])
    })

  })


  //----------------------------------------------
  suite('a_subtract', function() {
    var fn;
    before(function() {
      fn = _.a_subtract
    })

    test('atomic subtract scalars', function() {
      fn(1, 2).should.equal(1 - 2)
    })

  })


  //----------------------------------------------
  suite('subtract', function() {
    var fn;
    before(function() {
      fn = _.subtract
    })

    test('scalars', function() {
      fn(1, 2, 3).should.equal(1 - 2 - 3)
    })

    test('scalar and vector', function() {
      fn(A.T, A.V).should.deep.equal(A.N)
    })

    test('scalar and matrix', function() {
      fn(A.T, A.M).should.deep.equal(A.K)
    })

    test('vector and vector', function() {
      fn(A.V, A.V).should.deep.equal([0, 0, 0])
    })

    test('vector and matrix', function() {
      fn(A.V, A.M).should.deep.equal([
        [1 - 1, 1 - 2],
        [2 - 3, 2 - 4],
        [3 - 5, 3 - 6]
      ])
    })

    test('matrix and matrix', function() {
      fn(A.M, A.M).should.deep.equal([
        [0, 0],
        [0, 0],
        [0, 0]
      ])
    })

    test('vectors of unequal lengths', function() {
      fn(A.V, A.VV).should.deep.equal([1 - 1, 2 - 2, 3 - 3, 1 - 4, 2 - 5, 3 - 6])
    })

    test('tensors of unequal lengths', function() {
      fn(A.VV, A.M).should.deep.equal([
        [1 - 1, 1 - 2],
        [2 - 3, 2 - 4],
        [3 - 5, 3 - 6],
        [4 - 1, 4 - 2],
        [5 - 3, 5 - 4],
        [6 - 5, 6 - 6]
      ])
    })

    test('multiple tensors', function() {
      fn(A.V, A.M, A.R).should.deep.equal([
        [1 - 1 - 3, 1 - 2 - 3],
        [2 - 3 - 2, 2 - 4 - 2],
        [3 - 5 - 1, 3 - 6 - 1]
      ])
    })

  })



  //----------------------------------------------
  suite('a_multiply', function() {
    var fn;
    before(function() {
      fn = _.a_multiply
    })

    test('atomic multiply scalars', function() {
      fn(1, 2).should.equal(1 * 2)
    })

  })


  //----------------------------------------------
  suite('multiply', function() {
    var fn;
    before(function() {
      fn = _.multiply
    })

    test('scalars', function() {
      fn(1, 2, 3).should.equal(1 * 2 * 3)
    })

    test('scalar and vector', function() {
      fn(A.T, A.V).should.deep.equal([0, 0, 0])
    })

    test('scalar and matrix', function() {
      fn(A.T, A.M).should.deep.equal([
        [0, 0],
        [0, 0],
        [0, 0]
      ])
    })

    test('vector and vector', function() {
      fn(A.V, A.V).should.deep.equal([1 * 1, 2 * 2, 3 * 3])
    })

    test('vector and matrix', function() {
      fn(A.V, A.M).should.deep.equal([
        [1 * 1, 1 * 2],
        [2 * 3, 2 * 4],
        [3 * 5, 3 * 6]
      ])
    })

    test('matrix and matrix', function() {
      fn(A.M, A.M).should.deep.equal([
        [1 * 1, 2 * 2],
        [3 * 3, 4 * 4],
        [5 * 5, 6 * 6]
      ])
    })

    test('vectors of unequal lengths', function() {
      fn(A.V, A.VV).should.deep.equal([1 * 1, 2 * 2, 3 * 3, 1 * 4, 2 * 5, 3 * 6])
    })

    test('tensors of unequal lengths', function() {
      fn(A.VV, A.M).should.deep.equal([
        [1 * 1, 1 * 2],
        [2 * 3, 2 * 4],
        [3 * 5, 3 * 6],
        [4 * 1, 4 * 2],
        [5 * 3, 5 * 4],
        [6 * 5, 6 * 6]
      ])
    })

    test('multiple tensors', function() {
      fn(A.V, A.M, A.R).should.deep.equal([
        [1 * 1 * 3, 1 * 2 * 3],
        [2 * 3 * 2, 2 * 4 * 2],
        [3 * 5 * 1, 3 * 6 * 1]
      ])
    })

  })



  //----------------------------------------------
  suite('a_divide', function() {
    var fn;
    before(function() {
      fn = _.a_divide
    })

    test('atomic divide scalars', function() {
      fn(1, 2).should.equal(1 / 2)
    })

  })


  //----------------------------------------------
  suite('divide', function() {
    var fn;
    before(function() {
      fn = _.divide
    })

    test('scalars', function() {
      fn(1, 2, 3).should.equal(1 / 2 / 3)
    })

    test('scalar and vector', function() {
      fn(A.T, A.V).should.deep.equal([0, 0, 0])
    })

    test('scalar and matrix', function() {
      fn(A.T, A.M).should.deep.equal([
        [0, 0],
        [0, 0],
        [0, 0]
      ])
    })

    test('vector and vector', function() {
      fn(A.V, A.V).should.deep.equal([1 / 1, 2 / 2, 3 / 3])
    })

    test('vector and matrix', function() {
      fn(A.V, A.M).should.deep.equal([
        [1 / 1, 1 / 2],
        [2 / 3, 2 / 4],
        [3 / 5, 3 / 6]
      ])
    })

    test('matrix and matrix', function() {
      fn(A.M, A.M).should.deep.equal([
        [1 / 1, 2 / 2],
        [3 / 3, 4 / 4],
        [5 / 5, 6 / 6]
      ])
    })

    test('vectors of unequal lengths', function() {
      fn(A.V, A.VV).should.deep.equal([1 / 1, 2 / 2, 3 / 3, 1 / 4, 2 / 5, 3 / 6])
    })

    test('tensors of unequal lengths', function() {
      fn(A.VV, A.M).should.deep.equal([
        [1 / 1, 1 / 2],
        [2 / 3, 2 / 4],
        [3 / 5, 3 / 6],
        [4 / 1, 4 / 2],
        [5 / 3, 5 / 4],
        [6 / 5, 6 / 6]
      ])
    })

    test('multiple tensors', function() {
      fn(A.V, A.M, A.R).should.deep.equal([
        [1 / 1 / 3, 1 / 2 / 3],
        [2 / 3 / 2, 2 / 4 / 2],
        [3 / 5 / 1, 3 / 6 / 1]
      ])
    })

  })


  //----------------------------------------------
  suite('a_log', function() {
    var fn;
    before(function() {
      fn = _.a_log
    })

    test('atomic log, base e default', function() {
      fn(Math.E).should.equal(1);
    })

    test('base specified', function() {
      fn(8, 2).should.equal(3);
    })

    test('log(0)', function() {
      fn(0).should.equal(-Infinity);
    })

    test('log(Infinity)', function() {
      fn(-1).should.deep.equal(NaN);
    })

  })

  //----------------------------------------------
  suite('log', function() {
    var fn;
    before(function() {
      fn = _.log
    })

    test('tensor', function() {
      fn(A.V).should.deep.equal([_.a_log(1), _.a_log(2), _.a_log(3)])
    })

  })


  //----------------------------------------------
  suite('a_square', function() {
    var fn;
    before(function() {
      fn = _.a_square
    })

    test('atomic square', function() {
      fn(2).should.equal(4)
    })

  })

  //----------------------------------------------
  suite('square', function() {
    var fn;
    before(function() {
      fn = _.square
    })

    test('tensor', function() {
      fn(A.V).should.deep.equal([_.a_square(1), _.a_square(2), _.a_square(3)])
    })

  })


  //----------------------------------------------
  suite('a_root', function() {
    var fn;
    before(function() {
      fn = _.a_root
    })

    test('atomic root, base 2 default', function() {
      fn(4).should.equal(2);
    })

    test('base specified', function() {
      fn(8, 3).should.equal(2);
    })

    test('negative with even base', function() {
      fn(-4, 2).should.deep.equal(NaN);
    })

    test('negative with odd base', function() {
      fn(-8, 3).should.equal(-2);
    })

    test('base == 0', function() {
      fn(4, 0).should.deep.equal(Infinity);
    })

  })

  //----------------------------------------------
  suite('root', function() {
    var fn;
    before(function() {
      fn = _.root
    })

    test('tensor', function() {
      fn(A.V).should.deep.equal([_.a_root(1), _.a_root(2), _.a_root(3)])
    })

  })

})


//==============================================
suite('Simple signature checkers for tensors', function() {


  //----------------------------------------------
  suite('ternary fn inRange', function() {
    var fn;
    before(function() {
      fn = _.inRange
    })

    test('is in range', function() {
      fn(0, 3, 2).should.be.true
    })
    test('out of range', function() {
      fn(0, 3, -2).should.be.false
    })
    test('left boundary', function() {
      fn(0, 3, 0).should.be.true
    })
    test('right boundary', function() {
      fn(0, 3, 3).should.be.true
    })

  })

  //----------------------------------------------
  suite('sameSig', function() {
    var fn;
    before(function() {
      fn = _.sameSig
    })

    test('isInteger', function() {
      fn(A.V, _.isInteger).should.be.true
    })
    test('isDouble', function() {
      fn([0.1, 0.2], _.isDouble).should.be.true
    })
    test('isPositive', function() {
      fn(A.V, _.isPositive).should.be.true
    })
    test('nonPositive', function() {
      fn([0, -1, -2], _.nonPositive).should.be.true
    })
    test('isNegative', function() {
      fn(A.N, _.isNegative).should.be.true
    })
    test('nonNegative', function() {
      fn([0, 1, 2], _.nonNegative).should.be.true
    })
    test('nonZero', function() {
      fn(A.V, _.nonZero).should.be.true
    })

  })

})


//==============================================
suite('Simple JS Math functions for tensors', function() {

  var fn;
  beforeEach(function() {
    fn = _.distributeSingle;
  })
  test('tests implied from Function builder backend', function() {
    fn(A.lone, A.S).should.equal('*a')
  })

})


//==============================================
suite('Regex functions', function() {

  test('reMatch', function() {
    _.reMatch(A.reWord)(A.strWord).should.be.true
    _.reMatch(A.reWord)(A.strNum).should.be.false
    _.reMatch(A.reNum)(A.strNum).should.be.true
    _.reMatch(A.reNum)(A.strWord).should.be.false
  })
  test('reNotMatch', function() {
    _.reNotMatch(A.reWord)(A.strWord).should.be.false
    _.reNotMatch(A.reWord)(A.strNum).should.be.true
    _.reNotMatch(A.reNum)(A.strNum).should.be.false
    _.reNotMatch(A.reNum)(A.strWord).should.be.true
  })
  test('reGet', function() {
    _.reGet(A.reWord)(A.str).should.equal(A.strWord)
    _.reGet(A.reNum)(A.str).should.equal(A.strNum)
    expect(_.reGet(A.reWord)(A.strNum)).to.be.null
  })
  test('reAnd', function() {
    _.reAnd(A.reWord, A.reNum).should.be.an.instanceof(RegExp)
    _.reAnd(A.reWord, A.reNum).should.deep.equal(/(?=.*[a-zA-Z]+)(?=.*[0-9]+)/)
  })
  test('reAndMatch', function() {
    _.reAndMatch(A.reWord, A.reNum)(A.str).should.be.true
    _.reAndMatch(A.reWord, A.reNum)(A.strWord).should.be.false
    _.reAndMatch(A.reWord, A.reNum)(A.strNum).should.be.false
  })
  test('reOr', function() {
    _.reOr(A.reWord, A.reNum).should.be.an.instanceof(RegExp)
    _.reOr(A.reWord, A.reNum).should.deep.equal(/(?=.*[a-zA-Z]+)|(?=.*[0-9]+)/)
  })
  test('reAndMatch', function() {
    _.reOrMatch(A.reWord, A.reNum)(A.str).should.be.true
    _.reOrMatch(A.reWord, A.reNum)(A.strWord).should.be.true
    _.reOrMatch(A.reWord, A.reNum)(A.strNum).should.be.true
  })

})



//==============================================
suite('Array creation', function() {

  //----------------------------------------------
  suite('seq', function() {
    var fn;
    before(function() {
      fn = _.seq
    })

    test('(to)', function() {
      fn(3).should.deep.equal([1, 2, 3])
    })
    test('(from,to)', function() {
      fn(0, 2).should.deep.equal([0, 1, 2])
      fn(-2, 2).should.deep.equal([-2, -1, 0, 1, 2])
    })
    test('(from,to,diff)', function() {
      fn(-4, 4, 2).should.deep.equal([-4, -2, 0, 2, 4])
    })

  })

  //----------------------------------------------
  suite('numeric', function() {
    var fn;
    before(function() {
      fn = _.numeric
    })

    test('(len)', function() {
      fn(3).should.deep.equal([0, 0, 0])
    })
    test('(len,val)', function() {
      fn(3, 'a').should.deep.equal(['a', 'a', 'a'])
    })

  })

})



//==============================================
suite('Tensor properties', function() {

  //----------------------------------------------
  suite('depth', function() {
    var fn;
    before(function() {
      fn = _.depth
    })

    test('(T)', function() {
      fn(A.T).should.equal(0)
      fn(A.B).should.equal(3)
    })

  })

  //----------------------------------------------
  suite('volume', function() {
    var fn;
    before(function() {
      fn = _.volume
    })

    test('(T)', function() {
      fn(A.T).should.equal(0)
      fn(A.B).should.equal(4 * 3 * 2)
    })

  })

  //----------------------------------------------
  suite('dim', function() {
    var fn;
    before(function() {
      fn = _.dim
    })

    test('(T)', function() {
      fn(A.T).should.deep.equal([])
      fn(A.B).should.deep.equal([2, 3, 4])
    })

  })

  //----------------------------------------------
  suite('isFlat', function() {
    var fn;
    before(function() {
      fn = _.isFlat
    })

    test('(T)', function() {
      fn(A.S).should.be.true
      fn(A.V).should.be.true
      fn(A.M).should.be.false
    })

  })

  //----------------------------------------------
  suite('maxDeepestLength', function() {
    var fn;
    before(function() {
      fn = _.maxDeepestLength
    })

    test('(T)', function() {
      fn(A.T).should.equal(0)
      fn(A.V).should.equal(3)
      fn(A.M).should.equal(2)
    })

  })

})




//==============================================
suite('Tensor transformation', function() {

  //----------------------------------------------
  suite('swap; mutates', function() {
    var fn, v;
    before(function() {
      fn = _.swap
      v = [1, 2, 3]
    })

    test('(V,i,j); mutates', function() {
      fn(v, 0, 2).should.deep.equal(A.R)
      v.should.deep.equal(A.R)
    })

  })

  //----------------------------------------------
  suite('reverse', function() {
    var fn;
    before(function() {
      fn = _.reverse
    })

    test('reverse all (V)', function() {
      fn(A.VZ).should.deep.equal([5, 4, 3, 2, 1, 0])
    })
    test('reverse from (V,i)', function() {
      fn(A.VZ, 2).should.deep.equal([0, 1, 5, 4, 3, 2])
    })
    test('reverse till (V,null,j)', function() {
      fn(A.VZ, null, 2).should.deep.equal([2, 1, 0, 3, 4, 5])
    })
    test('reverse from to (V,i,j)', function() {
      fn(A.VZ, 2, 4).should.deep.equal([0, 1, 4, 3, 2, 5])
    })

  })

  //----------------------------------------------
  suite('extend; mutates', function() {
    var fn, v;
    beforeEach(function() {
      fn = _.extend
      v = A.V.slice(0)
    })

    test('(V, toLen) default val == 0', function() {
      fn(v, 6).should.deep.equal([1, 2, 3, 0, 0, 0])
    })
    test('(V, toLen, val)', function() {
      fn(v, 6, 'a').should.deep.equal([1, 2, 3, 'a', 'a', 'a'])
    })
    test('shorter (V,0)', function() {
      (function() {
        return fn(v, 0)
      }).should.throw(/Array longer/)
    })

  })

  //----------------------------------------------
  suite('batchIndexOf', function() {
    var fn;
    before(function() {
      fn = _.batchIndexOf
    })

    test('none valid', function() {
      fn(A.UU, [1, 2, 3]).should.deep.equal([-1, -1, -1])
    })
    test('some valid', function() {
      fn(A.UU, [1, 'a', 3]).should.deep.equal([-1, 0, -1])
    })
    test('all valid', function() {
      fn(A.UU, A.U).should.deep.equal([0, 1, 2])
    })
    test('shuffled', function() {
      fn(A.UU, ['c', 'b', 'a']).should.deep.equal([2, 1, 0])
    })
    test('repeated', function() {
      fn(A.UU, ['a', 'a', 'a']).should.deep.equal([0, 0, 0])
    })

  })

  //----------------------------------------------
  suite('validInds', function() {
    var fn;
    before(function() {
      fn = _.validInds
    })

    test('none valid', function() {
      fn([-2, -1], 2).should.deep.equal([])
    })
    test('some valid', function() {
      fn([-2, 0, 2, 4], 2).should.deep.equal([0, 2])
    })
    test('shuffled', function() {
      fn([-2, 4, 2, 0], 2).should.deep.equal([2, 0])
    })
    test('repeated', function() {
      fn([-2, 4, 0, 2, 0], 2).should.deep.equal([0, 2, 0])
    })

  })


  //----------------------------------------------
  suite('rbind', function() {
    var fn;
    before(function() {
      fn = _.rbind
    })

    test('none valid', function() {
      fn(A.C, [-1, -2, 100]).should.deep.equal([])
    })
    test('some valid', function() {
      fn(A.C, [-1, 0, 1]).should.deep.equal([
        [1, 2, 3],
        [4, 5, 6]
      ])
    })
    test('all valid', function() {
      fn(A.C, [0, 1]).should.deep.equal([
        [1, 2, 3],
        [4, 5, 6]
      ])
    })
    test('shuffled', function() {
      fn(A.C, [1, 0]).should.deep.equal([
        [4, 5, 6],
        [1, 2, 3]
      ])
    })
    test('repeated', function() {
      fn(A.C, [1, 1]).should.deep.equal([
        [4, 5, 6],
        [4, 5, 6]
      ])
    })

  })

  //----------------------------------------------
  suite('cbind', function() {
    var fn;
    before(function() {
      fn = _.cbind
    })

    test('none valid', function() {
      fn(A.D, [-1, -2, 100]).should.deep.equal([])
    })
    test('some valid', function() {
      fn(A.D, [-1, 0, 100]).should.deep.equal([
        ['a'],
        [1],
        [-1]
      ])
    })
    test('all valid', function() {
      fn(A.D, [0, 2]).should.deep.equal([
        ['a', 'c'],
        [1, 3],
        [-1, -3]
      ])
    })
    test('shuffled', function() {
      fn(A.D, [2, 1, 0]).should.deep.equal([
        ['c', 'b', 'a'],
        [3, 2, 1],
        [-3, -2, -1]
      ])
    })
    test('repeated', function() {
      fn(A.D, [0, 0]).should.deep.equal([
        ['a', 'a'],
        [1, 1],
        [-1, -1]
      ])
    })

  })

  //----------------------------------------------
  suite('cbindByField', function() {
    var fn;
    before(function() {
      fn = _.cbindByField
    })

    test('none valid', function() {
      fn(A.D, [1, 2, 3]).should.deep.equal([])
    })
    test('some valid', function() {
      fn(A.D, [1, 'a', 3]).should.deep.equal([
        ['a'],
        [1],
        [-1]
      ])
    })
    test('all valid', function() {
      fn(A.D, ['a', 'c']).should.deep.equal([
        ['a', 'c'],
        [1, 3],
        [-1, -3]
      ])
    })
    test('shuffled', function() {
      fn(A.D, ['c', 'b', 'a']).should.deep.equal([
        ['c', 'b', 'a'],
        [3, 2, 1],
        [-3, -2, -1]
      ])
    })
    test('repeated', function() {
      fn(A.D, ['a', 'a']).should.deep.equal([
        ['a', 'a'],
        [1, 1],
        [-1, -1]
      ])
    })

  })


  //----------------------------------------------
  suite('transpose', function(){
    var fn;
    before(function(){
      fn = _.transpose
    })

    test('square', function(){
      fn(A.C).should.deep.equal([
        [1,4,7],
        [2,5,8],
        [3,6,9]
      ])
    })
    test('non-square', function(){
      fn(A.M).should.deep.equal([
        [1,3,5],
        [2,4,6]
      ])
    })

  })

  //----------------------------------------------
  suite('rectangularize; mutates', function(){
    var fn, Q, R;
    beforeEach(function(){
      fn = _.rectangularize
      Q = [[1,2,3],[4]]
      R = [[1,2,3],[4,5,6]]
    })

    test('non-rectangular, default', function(){
      fn(Q).should.deep.equal([
        [1,2,3],
        [4,0,0]
      ])
    })
    test('non-rectangular, val', function(){
      fn(Q, -1).should.deep.equal([
        [1,2,3],
        [4,-1,-1]
      ])
    })
    test('rectangular, no change', function(){
      fn(R).should.deep.equal([
        [1,2,3],
        [4,5,6]
      ])
    })

  })


  //----------------------------------------------
  suite('reshape', function(){
    var fn, Q, R;
    before(function(){
      fn = _.reshape
      Q = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6]
      R = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6]
    })

    test('used with _.c and _.dim', function(){
      fn(_.c(A.B), _.dim(A.B)).should.deep.equal(A.B)
    })
    test('rectangular', function(){
      fn(R, [2,3,4]).should.deep.equal(A.B)
    })
    test('non-rectangular', function(){
      fn(Q, [2,3,4]).should.deep.equal([
        [[1,1,1,1],[2,2,2,2],[3,3,3,3]],
        [[4,4,4,4],[5,5,5,5],[6,6]]
      ])
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
