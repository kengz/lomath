// chai assertation library
var chai = require('chai'),

  // assert = chai.assert,
  expect = chai.expect,
  should = chai.should()

// a separate test asset for convenience
var A = require(__dirname + '/asset.js')
var _ = A._

//==============================================
suite('Function builder backend', function() {

  //==============================================
  suite('Distribute', function() {

    //----------------------------------------------
    suite('op(x, y)', function() {
      var fn;
      beforeEach(function() {
        fn = _.op;
      })
      test('order-preserving function composition', function() {
        fn('a', 'b').should.equal('a*b')
      })
    })

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
    suite('distributeBoth(X, Y)', function() {
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
    suite('distribute(X, Y)', function() {
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
    suite('asso(fn, argObj)', function() {
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
    suite('assodist(fn, argObj)', function() {
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
  suite('c()', function() {
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
  suite('a_sum(T)', function() {
    var fn;
    before(function() {
      fn = _.a_sum
    })
    test('atomic sum single tensor', function() {
      fn(A.M).should.equal(1 + 2 + 3 + 4 + 5 + 6)
    })
  })

  //----------------------------------------------
  suite('sum()', function() {
    var fn;
    before(function() {
      fn = _.sum
    })
    test('sum tensors', function() {
      fn(A.T, A.V, A.M).should.equal(0 + 1 + 2 + 3 + 1 + 2 + 3 + 4 + 5 + 6)
    })
  })

  //----------------------------------------------
  suite('a_prod(T)', function() {
    var fn;
    before(function() {
      fn = _.a_prod
    })
    test('atomic product single tensor', function() {
      fn(A.M).should.equal(1 * 2 * 3 * 4 * 5 * 6)
    })
  })

  //----------------------------------------------
  suite('prod()', function() {
    var fn;
    before(function() {
      fn = _.prod
    })
    test('prod tensors', function() {
      fn(A.T, A.V, A.M).should.equal(0 * 1 * 2 * 3 * 1 * 2 * 3 * 4 * 5 * 6)
    })
  })

  //----------------------------------------------
  suite('a_add(x,y)', function() {
    var fn;
    before(function() {
      fn = _.a_add
    })
    test('atomic add scalars', function() {
      fn(1, 2).should.equal(1 + 2)
    })
  })

  //----------------------------------------------
  suite('add()', function() {
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
  suite('a_subtract(x,y)', function() {
    var fn;
    before(function() {
      fn = _.a_subtract
    })
    test('atomic subtract scalars', function() {
      fn(1, 2).should.equal(1 - 2)
    })
  })

  //----------------------------------------------
  suite('subtract()', function() {
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
  suite('a_multiply(x,y)', function() {
    var fn;
    before(function() {
      fn = _.a_multiply
    })
    test('atomic multiply scalars', function() {
      fn(1, 2).should.equal(1 * 2)
    })
  })

  //----------------------------------------------
  suite('multiply()', function() {
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
  suite('a_divide(x,y)', function() {
    var fn;
    before(function() {
      fn = _.a_divide
    })
    test('atomic divide scalars', function() {
      fn(1, 2).should.equal(1 / 2)
    })
  })

  //----------------------------------------------
  suite('divide()', function() {
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
  suite('a_log(x, base)', function() {
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
  suite('log(T, base)', function() {
    var fn;
    before(function() {
      fn = _.log
    })
    test('tensor', function() {
      fn(A.V).should.deep.equal([_.a_log(1), _.a_log(2), _.a_log(3)])
    })
  })

  //----------------------------------------------
  suite('a_square(x)', function() {
    var fn;
    before(function() {
      fn = _.a_square
    })
    test('atomic square', function() {
      fn(2).should.equal(4)
    })
  })

  //----------------------------------------------
  suite('square(T)', function() {
    var fn;
    before(function() {
      fn = _.square
    })
    test('tensor', function() {
      fn(A.V).should.deep.equal([_.a_square(1), _.a_square(2), _.a_square(3)])
    })
  })

  //----------------------------------------------
  suite('a_root(x)', function() {
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
  suite('root(T)', function() {
    var fn;
    before(function() {
      fn = _.root
    })
    test('tensor', function() {
      fn(A.V).should.deep.equal([_.a_root(1), _.a_root(2), _.a_root(3)])
    })
  })

  //----------------------------------------------
  suite('a_logistic(x)', function() {
    var fn;
    before(function() {
      fn = _.a_logistic
    })
    test('atomic logistic', function() {
      fn(0).should.equal(0.5);
    })
  })

  //----------------------------------------------
  suite('logistic(x)', function() {
    var fn;
    before(function() {
      fn = _.logistic
    })
    test('atomic logistic', function() {
      fn([0, 0]).should.deep.equal([0.5, 0.5]);
    })
  })
})

//==============================================
suite('Simple signature checkers for tensors', function() {

  //----------------------------------------------
  suite('inRange(left, right, x)', function() {
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
  suite('sameSig(T, sigFn), sigFn:', function() {
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
    test('isZero', function() {
      fn([0,0,0], _.isZero).should.be.true
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
    _.abs(-1).should.equal(Math.abs(-1))
    _.acos(1).should.equal(Math.acos(1))
    _.acosh(1).should.equal(Math.acosh(1))
    _.asin(1).should.equal(Math.asin(1))
    _.asinh(1).should.equal(Math.asinh(1))
    _.atan(1).should.equal(Math.atan(1))
    _.atanh(1).should.equal(Math.atanh(1))
    _.ceil(1).should.equal(Math.ceil(1))
    _.cos(1).should.equal(Math.cos(1))
    _.cosh(1).should.equal(Math.cosh(1))
    _.exp(1).should.equal(Math.exp(1))
    _.floor(1).should.equal(Math.floor(1))
    _.log10(2).should.equal(Math.log10(2))
    _.log1p(2).should.equal(Math.log1p(2))
    _.log2(2).should.equal(Math.log2(2))
    _.round(1).should.equal(Math.round(1))
    _.pow(1,1).should.equal(Math.pow(1,1))
    _.sign(1).should.equal(Math.sign(1))
    _.sin(1).should.equal(Math.sin(1))
    _.sinh(1).should.equal(Math.sinh(1))
    _.sqrt(1).should.equal(Math.sqrt(1))
    _.tan(1).should.equal(Math.tan(1))
    _.tanh(1).should.equal(Math.tanh(1))
    _.trunc(1).should.equal(Math.trunc(1))
  })
})

//==============================================
suite('Regex functions', function() {
  test('reMatch(regex)', function() {
    _.reMatch(A.reWord)(A.strWord).should.be.true
    _.reMatch(A.reWord)(A.strNum).should.be.false
    _.reMatch(A.reNum)(A.strNum).should.be.true
    _.reMatch(A.reNum)(A.strWord).should.be.false
  })
  test('reNotMatch(regex)', function() {
    _.reNotMatch(A.reWord)(A.strWord).should.be.false
    _.reNotMatch(A.reWord)(A.strNum).should.be.true
    _.reNotMatch(A.reNum)(A.strNum).should.be.false
    _.reNotMatch(A.reNum)(A.strWord).should.be.true
  })
  test('reGet(regex)', function() {
    _.reGet(A.reWord)(A.str).should.equal(A.strWord)
    _.reGet(A.reNum)(A.str).should.equal(A.strNum)
    expect(_.reGet(A.reWord)(A.strNum)).to.be.null
  })
  test('reWrap(reg)', function() {
    _.reWrap(A.reWord).should.be.a('string')
    _.reWrap(A.reWord).should.equal('(?:[a-zA-Z]+)')
  })
  test('reAnd()', function() {
    _.reAnd(A.reWord, A.reNum).should.be.an.instanceof(RegExp)
    _.reAnd(A.reWord, A.reNum).should.deep.equal(/(?:[a-zA-Z]+)(?:[0-9]+)/)
  })
  test('reAndMatch()', function() {
    _.reAndMatch(A.reWord, A.reNum)(A.str).should.be.true
    _.reAndMatch(A.reWord, A.reNum)(A.strWord).should.be.false
    _.reAndMatch(A.reWord, A.reNum)(A.strNum).should.be.false
  })
  test('reOr()', function() {
    _.reOr(A.reWord, A.reNum).should.be.an.instanceof(RegExp)
    _.reOr(A.reWord, A.reNum).should.deep.equal(/(?:[a-zA-Z]+)|(?:[0-9]+)/)
  })
  test('reAndMatch()', function() {
    _.reOrMatch(A.reWord, A.reNum)(A.str).should.be.true
    _.reOrMatch(A.reWord, A.reNum)(A.strWord).should.be.true
    _.reOrMatch(A.reWord, A.reNum)(A.strNum).should.be.true
  })
})

//==============================================
suite('Array creation', function() {

  //----------------------------------------------
  suite('seq([start], stop, [step])', function() {
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
  suite('numeric(N, [val])', function() {
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
  suite('depth(T)', function() {
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
  suite('volume(T)', function() {
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
  suite('dim(T)', function() {
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
  suite('isFlat(T)', function() {
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
  suite('maxDeepestLength(T)', function() {
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
  suite('swap(arr, i, j); mutates', function() {
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
  suite('reverse(arr, [i, [j]])', function() {
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
  suite('extend(arr, toLen, [val]); mutates', function() {
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
  suite('batchIndexOf(arr, fieldArr)', function() {
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
  suite('validInds(indArr, maxLen)', function() {
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
  suite('rbind(M, indArr)', function() {
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
  suite('cbind(M, indArr)', function() {
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
  suite('cbindByField(M, fieldArr)', function() {
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
  suite('transpose(M)', function() {
    var fn;
    before(function() {
      fn = _.transpose
    })
    test('square', function() {
      fn(A.C).should.deep.equal([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
      ])
    })
    test('non-square', function() {
      fn(A.M).should.deep.equal([
        [1, 3, 5],
        [2, 4, 6]
      ])
    })
  })

  //----------------------------------------------
  suite('trace(M)', function() {
    var fn;
    before(function() {
      fn = _.trace
    })
    test('square', function() {
      fn(A.C).should.equal(15)
    })
  })

  //----------------------------------------------
  suite('matMultiply(A,B)', function() {
    var fn;
    before(function() {
      fn = _.matMultiply
    })
    test('square', function() {
      fn([[1,2],[3,4]], [[1,2],[3,4]]).should.deep.equal([[7, 10], [15, 22]])
    })
  })

  //----------------------------------------------
  suite('rectangularize(T, val); mutates', function() {
    var fn, Q, R;
    beforeEach(function() {
      fn = _.rectangularize
      Q = [
        [1, 2, 3],
        [4]
      ]
      R = [
        [1, 2, 3],
        [4, 5, 6]
      ]
    })
    test('non-rectangular, default', function() {
      fn(Q).should.deep.equal([
        [1, 2, 3],
        [4, 0, 0]
      ])
    })
    test('non-rectangular, val', function() {
      fn(Q, -1).should.deep.equal([
        [1, 2, 3],
        [4, -1, -1]
      ])
    })
    test('rectangular, no change', function() {
      fn(R).should.deep.equal([
        [1, 2, 3],
        [4, 5, 6]
      ])
    })
  })

  //----------------------------------------------
  suite('reshape(arr, dimArr)', function() {
    var fn, Q, R;
    before(function() {
      fn = _.reshape
      Q = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6]
      R = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6]
    })
    test('used with _.c and _.dim', function() {
      fn(_.c(A.B), _.dim(A.B)).should.deep.equal(A.B)
    })
    test('rectangular', function() {
      fn(R, [2, 3, 4]).should.deep.equal(A.B)
    })
    test('non-rectangular', function() {
      fn(Q, [2, 3, 4]).should.deep.equal([
        [
          [1, 1, 1, 1],
          [2, 2, 2, 2],
          [3, 3, 3, 3]
        ],
        [
          [4, 4, 4, 4],
          [5, 5, 5, 5],
          [6, 6]
        ]
      ])
    })
  })

  //----------------------------------------------
  suite('flattenJSON(obj)', function() {
    var fn, R;
    before(function() {
      fn = _.flattenJSON
      R = {
        update_id: 87654321,
        message: {
          message_id: 12345678,
          from: {
            array: [1,[2],3],
            last_name: 'kengz'
          },
          chat: {
            id: 123454,
            last_name: 'lomath'
          }
        }
      }
    })
    test('remove nestedness', function() {
      fn(R).should.deep.equal({ update_id: 87654321,
        'message[message_id]': 12345678,
        'message[from][array]': [ 1, [ 2 ], 3 ],
        'message[from][last_name]': 'kengz',
        'message[chat][id]': 123454,
        'message[chat][last_name]': 'lomath' })
    })
  })
})

//==============================================
suite('Subsets and combinatorics', function() {

  //----------------------------------------------
  suite('genAry(length, n)', function() {
    var fn;
    before(function() {
      fn = _.genAry
    })
    test('binary', function() {
      fn(1, 2).should.deep.equal(['0', '1'])
      fn(2, 2).should.deep.equal(['00', '01', '10', '11'])
      fn(3, 2).should.deep.equal(
        ['000', '001', '010', '011', '100', '101', '110', '111']
      )
    })
    test('ternary', function() {
      fn(2, 3).should.deep.equal(['00', '01', '02', '10', '11', '12', '20', '21', '22'])
    })
  })

  //----------------------------------------------
  suite('toNumArr(strArr)', function() {
    var fn;
    before(function() {
      fn = _.toNumArr
    })
    test('binary', function() {
      fn(['00', '01', '10', '11']).should.deep.equal([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
      ])
    })
  })

  //----------------------------------------------
  suite('pSubset(n)', function() {
    var fn;
    before(function() {
      fn = _.pSubset
    })
    test('3 elements', function() {
      fn(3).should.deep.equal([
        ['0', '1', '2'],
        ['01', '02', '10', '12', '20', '21'],
        ['012', '021', '102', '120', '201', '210']
      ])
    })
  })

  //----------------------------------------------
  suite('subset(n)', function() {
    var fn;
    before(function() {
      fn = _.subset
    })
    test('3 elements', function() {
      fn(3).should.deep.equal([
        ['0', '1', '2'],
        ['01', '02', '12'],
        ['012']
      ])
    })
  })

  //----------------------------------------------
  suite('permList(n)', function() {
    var fn;
    before(function() {
      fn = _.permList
    })
    test('3 elements, with _.toNumArr', function() {
      fn(3, 1).should.deep.equal(_.toNumArr(['0', '1', '2']))
      fn(3, 2).should.deep.equal(_.toNumArr(['01', '02', '10', '12', '20', '21']))
      fn(3, 3).should.deep.equal(_.toNumArr(['012', '021', '102', '120', '201', '210']))
    })
  })

  //----------------------------------------------
  suite('subset(n)', function() {
    var fn;
    before(function() {
      fn = _.combList
    })
    test('3 elements, with _.toNumArr', function() {
      fn(3, 1).should.deep.equal(_.toNumArr(['0', '1', '2']))
      fn(3, 2).should.deep.equal(_.toNumArr(['01', '02', '12']))
      fn(3, 3).should.deep.equal(_.toNumArr(['012']))
    })
  })

  //----------------------------------------------
  suite('permute(n)', function() {
    var fn;
    before(function() {
      fn = _.permute
    })
    test('n elements', function() {
      fn(2).should.deep.equal(_.permList(2, 2))
      fn(3).should.deep.equal(_.permList(3, 3))
      fn(4).should.deep.equal(_.permList(4, 4))
    })
  })

  //----------------------------------------------
  suite('factorial(n)', function() {
    var fn;
    before(function() {
      fn = _.factorial
    })
    test('normal', function() {
      fn(5).should.equal(120)
    })
    test('0', function() {
      fn(0).should.equal(1)
    })
    test('-1 throw error', function() {
      (function() {
        return fn(-1)
      }).should.throw(/Negative factorial not defined/)
    })
    test('big, without stackoverflow', function() {
      fn(1000).should.deep.equal(Infinity)
    })
  })

  //----------------------------------------------
  suite('permutation(n,r)', function() {
    var fn;
    before(function() {
      fn = _.permutation
    })
    test('normal', function() {
      fn(5, 1).should.deep.equal(5)
      fn(5, 5).should.deep.equal(120)
      fn(1000, 1).should.deep.equal(1000)
    })
    test('0', function() {
      fn(5, 0).should.deep.equal(1)
    })
    test('-1 throw error', function() {
      (function() {
        return fn(5, -1)
      }).should.throw(/Negative permutation not defined/)
    })
    test('big, without stackoverflow', function() {
      fn(1000, 1000).should.deep.equal(Infinity)
    })
  })

  //----------------------------------------------
  suite('combination(n,r)', function() {
    var fn;
    before(function() {
      fn = _.combination
    })
    test('normal', function() {
      fn(5, 1).should.deep.equal(5)
      fn(5, 5).should.deep.equal(1)
      fn(1000, 1).should.deep.equal(1000)
      fn(1000, 1000).should.deep.equal(1)
    })
    test('0', function() {
      fn(5, 0).should.deep.equal(1)
    })
    test('-1 throw error', function() {
      (function() {
        return fn(5, -1)
      }).should.throw(/Negative combination not defined/)
    })
    test('big, without stackoverflow', function() {
      fn(1000, 500).should.deep.equal(NaN)
    })
  })
})

//==============================================
suite('vectorial', function() {

  //----------------------------------------------
  suite('dot(X, Y)', function() {
    var fn;
    before(function() {
      fn = _.dot
    })
    test('normal', function() {
      fn(A.V, A.V).should.deep.equal(1 + 4 + 9)
    })
    test('length mismatch, recycle', function() {
      fn(A.V, A.VV).should.deep.equal(fn(_.c(A.V, A.V), A.VV))
    })
  })

  //----------------------------------------------
  suite('powSum(T, [n])', function() {
    var fn;
    before(function() {
      fn = _.powSum
    })
    test('(V) vector, default to 2', function() {
      fn(A.V).should.deep.equal(1 + 4 + 9)
    })
    test('(V, n)', function() {
      fn(A.V, 3).should.deep.equal(1 + 8 + 27)
    })
    test('(T, n) tensor', function() {
      fn(A.M).should.deep.equal(1 + 4 + 9 + 16 + 25 + 36)
    })
  })

  //----------------------------------------------
  suite('norm(v, [n])', function() {
    var fn;
    before(function() {
      fn = _.norm
    })
    test('default to L-2 norm', function() {
      fn([3, 4]).should.deep.equal(5)
    })
    test('specify L-n norm', function() {
      fn([3, 4], 1).should.deep.equal(7)
    })
  })

  //----------------------------------------------
  suite('normalize(v, [n])', function() {
    var fn;
    before(function() {
      fn = _.normalize
    })
    test('default to L-2 norm', function() {
      fn([3, 4]).should.deep.equal([3 / 5, 4 / 5])
    })
    test('specify to L-n norm', function() {
      fn([3, 4], 1).should.deep.equal([3 / 7, 4 / 7])
    })
  })

  //----------------------------------------------
  suite('rescale(v)', function() {
    var fn;
    before(function() {
      fn = _.rescale
    })
    test('simply L-1 norm', function() {
      fn([3, 4]).should.deep.equal([3 / 7, 4 / 7])
    })
  })
})

//==============================================
suite('trend', function() {

  //----------------------------------------------
  suite('stairs(v)', function() {
    var fn;
    before(function() {
      fn = _.stairs
    })
    test('length be 1 less', function() {
      fn(A.V).length.should.equal(A.V.length - 1)
    })
    test('next - current index', function() {
      fn([1, 2, 3, 5, 8]).should.deep.equal([1, 1, 2, 3])
    })
  })

  //----------------------------------------------
  suite('stairsTrend(v, sigFn)', function() {
    var fn;
    before(function() {
      fn = _.stairsTrend
    })
    test('specify stairs sign, collapsed', function() {
      fn(A.V, _.isPositive).should.be.true
    })
    test('increasing', function() {
      _.increasing(A.V).should.be.true
    })
    test('nonDecreasing', function() {
      _.nonDecreasing([1, 1, 2, 3]).should.be.true
    })
    test('decreasing', function() {
      _.decreasing(A.R).should.be.true
    })
    test('nonIncreasing', function() {
      _.nonIncreasing([3, 2, 1, 1]).should.be.true
    })
  })
})

//==============================================
suite('statistical', function() {

  //----------------------------------------------
  suite('mean(v)', function() {
    var fn;
    before(function() {
      fn = _.mean
    })
    test('0 mean', function() {
      fn([-2, -1, 0, 1, 2]).should.equal(0)
    })
  })

  //----------------------------------------------
  suite('expVal(X, P, [fn])', function() {
    var fn, p, v, vv;
    before(function() {
      fn = _.expVal
      v = [-1, 0, 1, 2]
      vv = [-1,0,0,1,1,1,2,2,2,2]
      p = [0.1, 0.2, 0.3, 0.4]
    })
    test('if only X is specified', function(){
      fn(vv).should.equal((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
    })
    test('if X, P specified; no fn', function() {
      fn(v, p).should.equal((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
    })
    test('if X, fn specified; no P', function() {
      fn(vv, _.a_square).should.equal(1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4)
    })
    test('if X, P, fn specified: atomic function: square', function() {
      fn(v, p, _.a_square).should.equal(1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4)
    })
  })

  //----------------------------------------------
  suite('variance(P, X, [fn])', function() {
    var fn, p, v, vv;
    before(function() {
      fn = _.variance
      v = [-1, 0, 1, 2]
      vv = [-1,0,0,1,1,1,2,2,2,2]
      p = [0.1, 0.2, 0.3, 0.4]
    })
    test('if only X is specified', function() {
      fn(vv).should.equal(
        (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4) -
        _.a_square((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
      )
    })
    test('if X, P specified; no fn', function() {
      fn(v, p).should.equal(
        (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4) -
        _.a_square((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
      )
    })
    test('if X, fn specified; no P', function() {
      fn(vv, _.a_square).should.be.closeTo(
        (1 * 0.1 + 0 + 1 * 0.3 + 16 * 0.4) -
        _.a_square(1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4), 0.0001)
    })
    test('if X, P, fn specified: atomic function: square', function() {
      fn(v, p, _.a_square).should.be.closeTo(
        (1 * 0.1 + 0 + 1 * 0.3 + 16 * 0.4) -
        _.a_square(1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4), 0.0001)
    })
  })

  //----------------------------------------------
  suite('stdev(P, X, [fn])', function() {
    var fn, v, p;
    before(function() {
      fn = _.variance
      v = [-1, 0, 1, 2]
      p = [0.1, 0.2, 0.3, 0.4]
    })
    test('trvial sqrt of variance', function() {
      _.stdev(v, p).should.equal(
        Math.sqrt(
          (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4) -
          _.a_square((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
        )
      )
    })
  })

  //----------------------------------------------
  suite('histogram(data, [fn], [pair])', function() {
    var fn;
    before(function() {
      fn = _.histogram
    })
    test('called with data only', function() {
      var hist = fn(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd'])
      hist.value.should.deep.equal(['a', 'b', 'c', 'd'])
      hist.freq.should.deep.equal([1, 2, 3, 4])
      hist.prob.should.deep.equal([0.1, 0.2, 0.3, 0.4])
    })
    test('call with data, fn', function() {
      var hist = fn(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd'], _.identity)
      hist.value.should.deep.equal(['a', 'b', 'c', 'd'])
      hist.freq.should.deep.equal([1, 2, 3, 4])
      hist.prob.should.deep.equal([0.1, 0.2, 0.3, 0.4])
    })
    test('call with data, fn, pair', function() {
      var hist = fn(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd'], _.identity, true)
      hist.should.be.an.instanceof(Array)
      hist.should.deep.equal([['a',1], ['b',2], ['c',3], ['d',4]])
    })
    test('call with data, pair', function() {
      var hist = fn(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd'], true)
      hist.should.be.an.instanceof(Array)
      hist.should.deep.equal([['a',1], ['b',2], ['c',3], ['d',4]])
    })
  })

  //----------------------------------------------
  suite('expGRate(m_f, m_i, t)', function() {
    var fn;
    before(function() {
      fn = _.expGRate
    })
    test('rate of expGrowth return', function() {
      fn(8, 2, 2).should.equal(100)
    })
  })

  //----------------------------------------------
  suite('trailExpGRate(v, t)', function() {
    var fn, v;
    before(function() {
      fn = _.trailExpGRate
      v = [1, 2, 4, 8]
    })
    test('trailing expGRate', function() {
      fn(v, 1).should.equal(100)
      fn(v, 2).should.equal(100)
      fn(v, 3).should.equal(100)
    })
  })
})

//==============================================
suite('plotter', function() {
  test('call constructor', function(){
    _.hc().should.not.equal(0)
  })
  test('call plot', function(){
    _.plot().should.equal(0)
  })
  test('call advPlot', function(){
    _.advPlot().should.equal(0)
  })
  test('call render', function(){
    _.render().should.equal(0)
  })
})

//==============================================
suite('timer', function() {
  test('tick', function(){
    _.tick().should.be.a('number')
  })
  test('tock', function(){
    _.tock().should.be.a('number')
  })
})
