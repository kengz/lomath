////////////
// lomath //
////////////

// Prepare lodash for extension and export
var _ = require('lodash').runInContext();

// the module: lodash extended with math mixins
var lomath = _.mixin({
  AUTHOR: "kengz",
  VERSION: "0.0.8",

  //////////////////////////////
  // Function builder backend //
  //////////////////////////////

  // We employ clearer terminologies to distinguish the "depth" or the "dimension" of the objects. In general, we call generic array of depth-N a "N-tensor" or "rank-N tensor". A scalar is "0-tensor"; a simple array/vector is "1-tensor", matrix (array of arrays) is "2-tensor", and so on.
  // A generic function that operates over tensor is built from an atomic function fn taking two scalar arguments.
  // Applying a function into depths of tensor is done via distribution, and evaluating a multi-argument function is done via associativity.

  /**
   * Sample operation to demonstrate function composition.
   *
   * @category composition
   * @param {*} x An argument.
   * @param {*} y An argument.
   *
   * @example
   * _.op('a', 'b')
   * // → 'a*b'
   *
   */
  // sample operation to demonstrate function composition
  op: function(x, y) {
    return x + '*' + y;
  },
  /**
   * Distributes a unary function over every scalar in tensor Y.
   *
   * @category composition
   * @param {Function} fn A unary function.
   * @param {tensor} Y A non-scalar tensor.
   * @returns {tensor} A tensor from the function applied element-wise to Y.
   *
   * @example
   * _.distributeSingle(_.square, [1, 2, 3, 4])
   * // → [ 1, 4, 9, 16 ]
   *
   * _.distributeSingle(_.square, [[1, 2], [3, 4]])
   * // → [ [ 1, 4 ], [ 9, 16 ] ]
   *
   */
  // distribute a unary function over every scalar in tensor Y;
  distributeSingle: function(fn, Y) {
    if (!(Y instanceof Array)) return fn(Y);
    var len = Y.length,
      res = Array(len);
    while (len--) res[len] = Y[len] instanceof Array ?
      lomath.distributeSingle(fn, Y[len]) : fn(Y[len])
    return res;
  },
  /**
   * Distributes a binary function with left tensor X over right scalar y. Preserves the order of arguments.
   *
   * @category composition
   * @param {Function} fn A binary function.
   * @param {tensor} X A non-scalar tensor.
   * @param {number} y A scalar.
   * @returns {tensor} A tensor from the function applied element-wise between X and y.
   *
   * @example
   * _.distributeLeft(_.op([1, 2, 3, 4], 5))
   * // where _.op is used to show the order of composition
   * // → [ '1*5', '2*5', '3*5', '4*5' ]
   *
   * _.distributeLeft(_.op, [[1, 2], [3, 4]], 5)
   * // → [ [ '1*5', '2*5' ], [ '3*5', '4*5' ] ]
   *
   */
  // Distribute fn with left tensor X over right scalar y.
  distributeLeft: function(fn, X, y) {
    var len = X.length,
      res = Array(len);
    while (len--) res[len] = X[len] instanceof Array ?
      lomath.distributeLeft(fn, X[len], y) : fn(X[len], y)
    return res;
  },
  /**
   * Distributes a binary function with left scalar x over right tensor Y. Preserves the order of arguments.
   *
   * @category composition
   * @param {Function} fn A binary function.
   * @param {number} x A scalar.
   * @param {tensor} Y A non-scalar tensor.
   * @returns {tensor} A tensor from the function applied element-wise between x and Y.
   *
   * @example
   * _.distributeRight(_.op, 5, [1, 2, 3, 4])
   * // where _.op is used to show the order of composition
   * // → [ '5*1', '5*2', '5*3', '5*4' ]
   *
   * _.distributeRight(_.op, 5, [[1, 2], [3, 4]])
   * // → [ [ '5*1', '5*2' ], [ '5*3', '5*4' ] ]
   *
   */
  // Distribute fn with left scalar x over right tensor Y.
  distributeRight: function(fn, x, Y) {
    var len = Y.length,
      res = Array(len);
    while (len--) res[len] = Y[len] instanceof Array ?
      lomath.distributeRight(fn, x, Y[len]) : fn(x, Y[len])
    return res;
  },
  /**
   * Distributes a binary function between non-scalar tensors X, Y: pair them up term-wise and calling `_.distribute` recursively. Perserves the order of arguments.
   * If at any depth X and Y have different lengths, recycle if the mod of lengths is 0.
   *
   * @category composition
   * @param {Function} fn A binary function.
   * @param {tensor} X A non-scalar tensor.
   * @param {tensor} Y A non-scalar tensor.
   * @returns {tensor} A tensor from the function applied element-wise between X and Y.
   *
   * @example
   * _.distributeBoth(_.op, ['a', 'b', 'c'], [1, 2, 3])
   * // where _.op is used to show the order of composition
   * // → [ 'a*1', 'b*2', 'c*3' ]
   *
   * _.distributeBoth(_.op, ['a', 'b', 'c'], [1, 2, 3, 4, 5, 6])
   * // → [ 'a*1', 'b*2', 'c*3' , 'a*4', 'b*5', 'c*6']
   *
   * _.distributeBoth(_.op, ['a', 'b', 'c'], [[1, 2], [3, 4], [5, 6]])
   * // → [ [ 'a*1', 'a*2' ], [ 'b*3', 'b*4' ], [ 'c*5', 'c*6' ] ]
   *
   */
  // Distribute fn between non-scalar tensors X, Y: pair them up term-wise and calling distribute recursively.
  // If at any depth X and Y have different lengths, recycle if the mod of lengths is 0.
  distributeBoth: function(fn, X, Y) {
    var Xlen = X.length,
      Ylen = Y.length;
    if (Xlen % Ylen == 0 || Ylen % Xlen == 0) {
      var res;
      if (Xlen > Ylen) {
        res = Array(Xlen);
        while (Xlen--) res[Xlen] = lomath.distribute(fn, X[Xlen], Y[Xlen % Ylen]);
      } else {
        res = Array(Ylen);
        while (Ylen--) res[Ylen] = lomath.distribute(fn, X[Ylen % Xlen], Y[Ylen]);
      }
      return res;
    } else throw "Cannot distribute arrays of different dimensions.";
  },
  /**
   * Generic Distribution: Distribute fn between left tensor X and right tensor Y, while preserving the argument-ordering (vital for non-commutative functions).
   * Pairs up the tensors term-wise while descending down the depths recursively using `_.distributeBoth`, until finding a scalar to `_.distributeLeft/Right`.
   *
   * @category composition
   * @param {Function} fn A binary function.
   * @param {tensor} X A tensor.
   * @param {tensor} Y A tensor.
   * @returns {tensor} A tensor from the function applied element-wise between X and Y.
   *
   * @example
   * _.distribute(_.op, 'a', [1, 2, 3])
   * // where _.op is used to show the order of composition
   * // → ['a*1', 'a*2', 'a*3']
   *
   * _.distribute(_.op, 'a', [[1, 2], [3, 4])
   * // → [ [ 'a*1', 'a*2' ], [ 'a*3', 'a*4' ] ]
   *
   * _.distribute(_.op, ['a', 'b', 'c'], [1, 2, 3])
   * // → [ 'a*1', 'b*2', 'c*3' ]
   *
   * _.distribute(_.op, ['a', 'b', 'c'], [1, 2, 3, 4, 5, 6])
   * // → [ 'a*1', 'b*2', 'c*3' , 'a*4', 'b*5', 'c*6']
   *
   * _.distribute(_.op, ['a', 'b', 'c'], [[1, 2], [3, 4], [5, 6]])
   * // → [ [ 'a*1', 'a*2' ], [ 'b*3', 'b*4' ], [ 'c*5', 'c*6' ] ]
   *
   */
  // Generic Distribute: Distribute fn between left tensor X and right tensor Y, while preserving the argument-ordering (vital for non-commutative functions).
  // lomath pairs up the tensors term-wise while descending down the depths recursively, until finding a scalar to distributeLeft/Right.
  // Method is at its fastest, and assuming the data depth isn't too deep (otherwise JS will have troubles with it)
  distribute: function(fn, X, Y) {
    if (X instanceof Array)
      return Y instanceof Array ?
        lomath.distributeBoth(fn, X, Y) : lomath.distributeLeft(fn, X, Y);
    else
      return Y instanceof Array ?
        lomath.distributeRight(fn, X, Y) : fn(X, Y);
  },
  /**
   * Generic association: take the arguments object or array and apply atomic function (with scalar arguments) from left to right.
   *
   * @category composition
   * @param {Function} fn An atomic binary function (both arguments must be scalars).
   * @param {...number} [...x] Scalars; can be grouped in a single array.
   * @returns {number} A scalar from the function applied to all arguments in order.
   *
   * @example
   * _.asso(_.op, 'a', 'b', 'c')
   * // where _.op is used to show the order of composition
   * // → 'a*b*c'
   *
   * _.asso(_.op, ['a', 'b', 'c'])
   * // → 'a*b*c'
   *
   */
  // Generic associate: take the arguments object or array and apply atomic fn (non-tensor) from left to right
  asso: function(fn, argObj) {
    var len = argObj.length,
      i = 0;
    // optimize arg form based on length or argObj
    var args = len < 3 ? argObj : _.toArray(argObj),
      res = fn(args[i++], args[i++]);
    while (i < len) res = fn(res, args[i++]);
    return res;
  },
  /**
   * Generic association with distributivity: Similar to `_.asso` but is for tensor functions; apply atomic fn distributively in order using `_.distribute`.
   * Usage: for applying fn on tensors element-wise if they have compatible dimensions.
   *
   * @category composition
   * @param {Function} fn An atomic binary function (both arguments must be scalars).
   * @param {...tensors} [...X] tensors.
   * @returns {tensor} A tensor from the function applied to all arguments in order.
   *
   * @example
   * _.assodist(_.op, 'a', 'b', 'c')
   * // where _.op is used to show the order of composition
   * // → 'a*b*c'
   *
   * _.assodist(_.op, 'a', [1, 2, 3], 'b')
   * // → ['a*1*b', 'a*2*b', 'a*3*b']
   *
   * _.assodist(_.op, 'a', [[1, 2], [3, 4]])
   * // → [['a*1', 'a*2'], ['a*3', 'a*4']]
   *
   * _.assodist(_.op, ['a', 'b'], [[1, 2], [3, 4]])
   * // → [['a*1', 'a*2'], ['b*3', 'b*4']]
   *
   */
  // Associate with distributivity: Similar to asso but is for tensor functions; apply atomic fn distributively from left to right.
  // Usage: for applying fn on tensors element-wise if they have matching dimensions.
  assodist: function(fn, argObj) {
    var len = argObj.length,
      i = 0;
    // optimize arg form based on length or argObj
    var args = len < 3 ? argObj : _.toArray(argObj),
      res = lomath.distribute(fn, args[i++], args[i++]);
    while (i < len) res = lomath.distribute(fn, res, args[i++]);
    return res;
  },

  // Future:
  // Future:
  // Future:
  // cross and wedge, need index summation too, matrix mult.

  /////////////////////
  // Basic functions //
  /////////////////////

  /**
   * Concatenates all arguments into single vector by `_.flattenDeep`.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {vector} A vector with the scalars from all tensors.
   *
   * @example
   * _.c('a', 'b', 'c')
   * // → ['a', 'b', 'c']
   *
   * _.c(1, ['a', 'b', 'c'], 2)
   * // → [1, 'a', 'b', 'c', 2]
   *
   * _.c([[1, 2], [3, 4])
   * // → [1, 2, 3, 4]
   *
   */
  // Concat all arguments into single vector by _.flattenDeep
  c: function() {
    return _.flattenDeep(_.toArray(arguments));
  },
  // atomic sum: takes in a tensor (any rank) and sum all values
  a_sum: function(T) {
    // actual function call; recurse if need to
    var total = 0,
      len = T.length;
    while (len--) total += (T[len] instanceof Array ?
      lomath.a_sum(T[len], 0) : T[len])
    return total;
  },
  /**
   * Sums all scalars in all argument tensors.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {scalar} A scalar summed from all scalars in the tensors.
   *
   * @example
   * _.sum('a', 'b', 'c')
   * // → 'abc'
   *
   * _.sum(0, [1, 2, 3], [[1, 2], [3, 4])
   * // → 16
   *
   */
  // sum all values in all arguments
  sum: function() {
    var res = 0;
    var len = arguments.length;
    while (len--) res += (arguments[len] instanceof Array ?
      lomath.a_sum(arguments[len]) : arguments[len])
    return res;
  },
  // atomic prod, analogue to a_sum. Multiply all values in a tensor
  a_prod: function(T) {
    // actual function call; recurse if need to
    var total = 1,
      len = T.length;
    while (len--) total *= (T[len] instanceof Array ?
      lomath.a_prod(T[len], 1) : T[len])
    return total;
  },
  /**
   * Multiplies together all scalars in all argument tensors.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {scalar} A product scalar from all scalars in the tensors.
   *
   * @example
   * _.prod(1, 2, 3)
   * // → 6
   *
   * _.prod([1, 2, 3])
   * // → 6
   *
   * _.prod(1, [1, 2, 3], [[1, 2], [3, 4]])
   * // → 144
   *
   */
  // product of all values in all arguments
  prod: function() {
    var res = 1,
      len = arguments.length;
    while (len--) res *= (arguments[len] instanceof Array ?
      lomath.a_prod(arguments[len]) : arguments[len])
    return res;
  },
  // atomic add: add two scalars x, y.
  a_add: function(x, y) {
    return x + y;
  },
  /**
   * Adds tensors using `_.assodist`.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.add(1, 2, 3)
   * // → 6
   *
   * _.add(1, [1, 2, 3])
   * // → [2, 3, 4]
   *
   * _.add(1, [[1, 2], [3, 4]])
   * // → [[2, 3], [4, 5]]
   *
   * _.add([10, 20], [[1, 2], [3, 4]])
   * // → [[11, 12], [23, 24]]
   *
   */
  // add all tensor arguments element-wise/distributively and associatively
  add: function() {
    // sample call pattern: pass whole args
    return lomath.assodist(lomath.a_add, arguments);
  },
  // atomic subtract
  a_subtract: function(x, y) {
    return x - y;
  },
  /**
   * Subtracts tensors using `_.assodist`.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.subtract(1, 2, 3)
   * // → -5
   *
   * _.subtract(1, [1, 2, 3])
   * // → [0, -1, -2]
   *
   * _.subtract(1, [[1, 2], [3, 4]])
   * // → [[0, -1], [-2, -3]]
   *
   * _.subtract([10, 20], [[1, 2], [3, 4]])
   * // → [[9, 8], [17, 16]]
   *
   */
  // subtract all tensor arguments element-wise/distributively and associatively
  subtract: function() {
    return lomath.assodist(lomath.a_subtract, arguments);
  },
  // atomic multiply
  a_multiply: function(x, y) {
    return x * y;
  },
  /**
   * Multiplies tensors using `_.assodist`.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.multiply(1, 2, 3)
   * // → 6
   *
   * _.multiply(1, [1, 2, 3])
   * // → [1, 2, 3]
   *
   * _.multiply(1, [[1, 2], [3, 4]])
   * // → [[1, 2], [3, 4]]
   *
   * _.multiply([10, 20], [[1, 2], [3, 4]])
   * // → [[10, 20], [60, 80]]
   *
   */
  // multiply all tensor arguments element-wise/distributively and associatively
  // Note: lomath is generic; is different from matrix multiplication
  multiply: function() {
    return lomath.assodist(lomath.a_multiply, arguments);
  },
  // atomic divide
  a_divide: function(x, y) {
    return x / y;
  },
  /**
   * Divides tensors using `_.assodist`.
   *
   * @category basics
   * @param {...tensors} [...X] tensors.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.divide(3, 2, 1)
   * // → 1.5
   *
   * _.divide([1, 2, 3], 2)
   * // → [0.5, 1, 1.5]
   *
   * _.divide([[1, 2], [3, 4]], 2)
   * // → [[0.5, 1], [1.5, 2]]
   *
   * _.divide([[1, 2], [3, 4]], [1, 2])
   * // → [[1, 2], [1.5, 2]]
   *
   */
  // divide all tensor arguments element-wise/distributively and associatively
  divide: function() {
    return lomath.assodist(lomath.a_divide, arguments);
  },
  // atomic log. Use base e by default
  a_log: function(x, base) {
    return base == undefined ? Math.log(x) : Math.log(x) / Math.log(base);
  },
  /**
   * Takes the log of tensor T to base n (defaulted to e) element-wise using `_.distribute`.
   *
   * @category basics
   * @param {tensor} T A tensor.
   * @param {number} [n=e] The optional base; defaulted to e.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.log([1, Math.E])
   * // → [0, 1]
   *
   */
  // take the log of tensor T to the n element-wise
  log: function(T, base) {
    return lomath.distribute(lomath.a_log, T, base);
  },
  // atomic square
  a_square: function(x) {
    return x * x;
  },
  /**
   * Squares a tensor element-wise using `_.distributeSingle`.
   *
   * @category basics
   * @param {tensor} T A tensor.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.square([1, 2])
   * // → [1, 4]
   *
   */
  square: function(T) {
    return lomath.distributeSingle(lomath.a_square, T);
  },
  // atomic root
  a_root: function(x, base) {
    var n = base == undefined ? 2 : base;
    return n % 2 ?
      // if odd power
      Math.sign(x) * Math.pow(Math.abs(x), 1 / n) :
      Math.pow(x, 1 / n);
  },
  /**
   * Takes the n-th root (defaulted to 2) of tensor T element-wise using `_.distribute`.
   *
   * @category basics
   * @param {tensor} T A tensor.
   * @param {number} [n=2] The optional base; defaulted to 2 for squareroot.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.root([1, 4])
   * // → [1, 2]
   *
   * _.root([-1, -8], 3)
   * // → [-1, -2]
   *
   */
  // take the n-th root of tensor T element-wise
  root: function(T, n) {
    return lomath.distribute(lomath.a_root, T, n);
  },
  // atomic logistic
  a_logistic: function(z) {
    return 1/(1+Math.exp(-z))
  },
  /**
   * Applies the logistic (sigmoid) function to tensor T element-wise.
   *
   * @category basics
   * @param {tensor} T A tensor.
   * @returns {tensor} A tensor.
   *
   * @example
   * _.logistic([-10, 0, 10])
   * // → [ 0.00004539786870243441, 0.5, 0.9999546021312976 ]
   *
   */
  logistic: function(T) {
    return lomath.distributeSingle(lomath.a_logistic, T);
  },

  ////////////////////
  // Basic checkers //
  ////////////////////

  /**
   * Checks if `x` is in range, i.e. `left ≤ x ≤ right`.
   *
   * @category signature
   * @param {number} left The lower bound.
   * @param {number} right The upper bound.
   * @param {number} x The value to check.
   * @returns {boolean} true If `x` is in range.
   *
   * @example
   * _.inRange(0, 3, 3)
   * // → true
   *
   * _.inRange.bind(null, 0, 3)(3)
   * // → true
   *
   */
  // check if x is in range set by left, right
  inRange: function(left, right, x) {
    return left - 1 < x && x < right + 1;
  },
  /**
   * Checks if `x` is an integer.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  // check if x is an integer
  isInteger: function(x) {
    return x == Math.floor(x);
  },
  /**
   * Checks if `x` is a double-precision number/non-Integer.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  // check if x is a double
  isDouble: function(x) {
    return x != Math.floor(x);
  },
  /**
   * Checks if `x > 0`.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  // check if x is positive
  isPositive: function(x) {
    return x > 0;
  },
  /**
   * Checks if `x ≤ 0`.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  // check if x less than or eq to 0
  nonPositive: function(x) {
    return !(x > 0);
  },
  /**
   * Checks if `x < 0`.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  // check if x is negative
  isNegative: function(x) {
    return x < 0;
  },
  /**
   * Checks if `x ≥ 0`.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  // check if x greater than or eq to 0
  nonNegative: function(x) {
    return !(x < 0);
  },
  /**
   * Checks if `x != 0`.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  nonZero: function(x) {
    return x != 0;
  },
  /**
   * Checks if `x == 0`.
   *
   * @category signature
   * @param {number} x The value to check.
   * @returns {boolean} true If so.
   */
  isZero: function(x) {
    return x == 0;
  },
  /**
   * Checks if signature function is true for all scalars of a tensor.
   *
   * @category signature
   * @param {tensor} T The tensor whose values to check.
   * @param {Function} sigFn The signature function.
   * @returns {boolean} true If all scalars of the tensor return true.
   *
   * @example
   * _.sameSig([1, 2, 3], _.isPositive)
   * // → true
   *
   */
  // check if all tensor entries are of the same sign, with the specified sign function
  sameSig: function(T, sigFn) {
    return Boolean(lomath.prod(lomath.distributeSingle(sigFn, T)));
  },

  //////////////////////////////////////////
  // Unary functions from JS Math object, //
  //////////////////////////////////////////
  // wrapped to function with generic tensor

  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   * @example
   * _.abs([-1, -2, -3])
   * // → [1, 2, 3]
   */
  abs: function(T) {
    return lomath.distributeSingle(Math.abs, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  acos: function(T) {
    return lomath.distributeSingle(Math.acos, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  acosh: function(T) {
    return lomath.distributeSingle(Math.acosh, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  asin: function(T) {
    return lomath.distributeSingle(Math.asin, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  asinh: function(T) {
    return lomath.distributeSingle(Math.asinh, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  atan: function(T) {
    return lomath.distributeSingle(Math.atan, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  atanh: function(T) {
    return lomath.distributeSingle(Math.atanh, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  ceil: function(T) {
    return lomath.distributeSingle(Math.ceil, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  cos: function(T) {
    return lomath.distributeSingle(Math.cos, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  cosh: function(T) {
    return lomath.distributeSingle(Math.cosh, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  exp: function(T) {
    return lomath.distributeSingle(Math.exp, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  floor: function(T) {
    return lomath.distributeSingle(Math.floor, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  log10: function(T) {
    return lomath.distributeSingle(Math.log10, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  log1p: function(T) {
    return lomath.distributeSingle(Math.log1p, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  log2: function(T) {
    return lomath.distributeSingle(Math.log2, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  round: function(T) {
    return lomath.distributeSingle(Math.round, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  pow: function(T, n) {
    return lomath.distribute(Math.pow, T, n);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  sign: function(T) {
    return lomath.distributeSingle(Math.sign, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  sin: function(T) {
    return lomath.distributeSingle(Math.sin, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  sinh: function(T) {
    return lomath.distributeSingle(Math.sinh, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  sqrt: function(T) {
    return lomath.distributeSingle(Math.sqrt, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  tan: function(T) {
    return lomath.distributeSingle(Math.tan, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  tanh: function(T) {
    return lomath.distributeSingle(Math.tanh, T);
  },
  /**
   * Generalized JS Math applicable to tensor using function composition.
   * @category native-Math
   * @param {tensor} T A tensor.
   * @returns {tensor} T A tensor.
   */
  trunc: function(T) {
    return lomath.distributeSingle(Math.trunc, T);
  },

  /////////////////////
  // Regex functions //
  /////////////////////

  /**
   * Returns a boolean function that matches the regex.
   * @category regexp
   * @param {RegExp} regex A RegExp.
   * @returns {Function} fn A boolean function used for matching the regex.
   *
   * @example
   * var matcher1 = _.reMatch('foo') // using a string
   * matcher1('foobarbaz')
   * // → true
   *
   * var matcher2 = _.reMatch(/\d+/) // using a regexp
   * matcher2('May 1995')
   * // → true
   *
   */
  // return a function that matches regex,
  // e.g. matchRegex(/red/)('red Apple') returns true
  reMatch: function(regex) {
    return function(str) {
      if (str != undefined)
        return str.search(regex) != -1;
    }
  },
  /**
   * Returns a boolean function that dis-matches the regex.
   * @category regexp
   * @param {RegExp} regex A RegExp to NOT match.
   * @returns {Function} fn A boolean function used for dis-matching the regex.
   *
   * @example
   * var matcher1 = _.reNotMatch('foo') // using a string
   * matcher1('barbaz')
   * // → true
   *
   * var matcher2 = _.reNotMatch(/\d+/) // using a regexp
   * matcher2('foobar')
   * // → true
   *
   */
  // negation of reMatch
  reNotMatch: function(regex) {
    return function(str) {
      if (str != undefined)
        return str.search(regex) == -1;
    }
  },
  /**
   * Returns a function that returns the first string portion matching the regex.
   * @category regexp
   * @param {RegExp} regex A RegExp to match.
   * @returns {Function} fn A function that returns the string matching the regex.
   *
   * @example
   * var getBar = _.reGet('bar') // using a string
   * getBar('foobarbaz')
   * // → 'bar'
   *
   * var getNum = _.reGet(/\d+/) // using a regex
   * getNum('May 1995')
   * // → '1995'
   * getNum('May')
   * // → null
   *
   */
  // return the string matched by regex
  reGet: function(regex) {
    return function(str) {
      if (str != undefined) {
        var matched = str.match(regex);
        return matched == null ? null : matched[0];
      }
    }
  },
  /**
   * Wraps a regex into string for regex set operation.
   * @category regexp
   * @param {RegExp} regex A RegExp to wrap.
   * @returns {string} wrapped The regex wrapped into the form `(?:regex)`
   *
   * @example
   * _.reWrap('foo')
   * // → '(?:foo)'
   *
   */
  // wrap a regex into string for regex set operation
  reWrap: function(reg) {
    return '(?:' + String(reg).replace(/\//g, '') + ')'
  },
  /**
   * Returns a single regex as the "AND" conjunction of all input regexs. This picks up as MANY adjacent substrings that satisfy all the regexs in order.
   * @category regexp
   * @param {...RegExp} regexs All the regexs to conjunct together.
   * @returns {RegExp} regex The conjuncted regex of the form `(?:re1)...(?:reN)`
   *
   * @example
   * var reg1 = _.reAnd('foo', /\d+/)
   * // → /(?:foo)(?:\d+)/
   * _.reGet(reg1)('Mayfoo1995')
   * // → 'foo1995'
   *
   * var reg2 = _.reAnd(/\d+/, 'foo') // order matters here
   * // → /(?:\d+)(?:foo)/
   * _.reGet(reg2)('Mayfoo1995')
   * // → null
   *
   */
  // return a single regex as the "AND" of all arg regex's
  reAnd: function() {
    return new RegExp(_.map(_.toArray(arguments), lomath.reWrap).join(''));
  },
  /**
   * Returns a boolean function that matches all the regexs conjuncted in the specified order.
   *
   * @category regexp
   * @param {...RegExp} regexs All the regexs to conjunct together.
   * @returns {Function} fn A boolean function used for matching the conjuncted regexs.
   *
   * @example
   * _.reAndMatch('foo', /\d+/)('Mayfoo1995')
   * // → true
   *
   * _.reAndMatch(/\d+/, 'foo')('Mayfoo1995') // order matters
   * // → false
   *
   */
  // return a function that matches all(AND) of the regexs
  reAndMatch: function() {
    return lomath.reMatch(lomath.reAnd.apply(null, arguments));
  },
  /**
   * Returns a single regex as the "OR" union of all input regexs. This picks up the FIRST substring that satisfies any of the regexs in any order.
   * @category regexp
   * @param {...RegExp} regexs All the regexs to union together.
   * @returns {RegExp} regex The unioned regex of the form `(?:re1)|...|(?:reN)`
   *
   * @example
   * var reg1 = _.reOr('foo', /\d+/)
   * // → /(?:foo)|(?:\d+)/
   * _.reGet(reg1)('Mayfoo1995')
   * // → 'foo'
   *
   * var reg2 = _.reOr(/\d+/, 'foo') // order doesn't matter here
   * // → /(?:\d+)|(?:foo)/
   * _.reGet(reg2)('Mayfoo1995')
   * // → 'foo'
   *
   */
  // return a single regex as the "OR" of all arg regex's
  reOr: function() {
    return new RegExp(_.map(_.toArray(arguments), lomath.reWrap).join('|'));
  },
  /**
   * Returns a boolean function that matches any of the regexs in any order.
   *
   * @category regexp
   * @param {...RegExp} regexs All the regexs to try to match.
   * @returns {Function} fn A boolean function used for matching the regexs.
   *
   * @example
   * _.reOrMatch('foo', /\d+/)('Mayfoo1995')
   * // → true
   *
   * _.reOrMatch(\d+/, 'foo')('Mayfoo1995') // order doesn't matter
   * // → true
   *
   */
  // return a function that matches at least one(OR) of the regexs
  reOrMatch: function() {
    return lomath.reMatch(lomath.reOr.apply(null, arguments));
  },

  ////////////////////
  // Array creation //
  ////////////////////

  // union, intersection, difference, xor

  /**
   * Returns a sequence of numbers from start to end, with interval. Similar to lodash's `_.range` but the default starts from 1; this is for `R` users who are familiar with `seq()`.
   *
   * @category initialization
   * @param {number} [start=0] The start value.
   * @param {number} end The end value.
   * @param {number} [step=1] The interval step.
   * @returns {Array} seq An array initialized to the sequence.
   *
   * @example
   * _.seq(3)
   * // → [1, 2, 3]
   *
   * _.seq(2, 4)
   * // → [2, 3, 4]
   *
   * _.seq(1, 9, 2)
   * [ 1, 3, 5, 7, 9 ]
   *
   */
  // seq from R: like _.range, but starts with 1 by default
  seq: function(start, stop, step) {
    if (stop == null) {
      stop = start || 1;
      start = 1;
    }
    step = step || 1;
    var length = Math.max(Math.ceil((stop - start) / step), 0) + 1;
    var range = Array(length);
    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }
    return range;
  },

  /**
   * Returns an initialized array of length N filled with the value (defaulted to 0). Reminiscent of `numeric()` of `R`.
   *
   * @category initialization
   * @param {number} N The length of array.
   * @param {*} [val=0] The value to fill array with.
   * @returns {Array} filled An array initialized to the value.
   *
   * @example
   * _.numeric(3)
   * // → [0, 0, 0]
   *
   * _.numeric(3, 'a')
   * // → ['a', 'a', 'a']
   *
   */
  // return an array of length N initialized to val (default to 0)
  numeric: function(N, val) {
    return val == undefined ? _.fill(Array(N), 0) : _.fill(Array(N), val);
  },

  ///////////////////////
  // Tensor properties //
  ///////////////////////

  // Note that a tensor has homogenous depth, that is, there cannot tensors of different ranks in the same vector, e.g. [1, [2,3], 4] is prohibited.

  /**
   * Returns the depth of an (nested) array, i.e. the rank of a tensor.
   * Scalar = rank-0, vector = rank-1, matrix = rank-2, ... so on.
   * Note that a tensor has homogenous depth, that is, there cannot tensors of different ranks in the same vector, e.g. [1, [2,3], 4] is prohibited.
   *
   * @category properties
   * @param {tensor} T The tensor.
   * @returns {number} depth The depth of the array.
   *
   * @example
   * _.depth(0)
   * // → 0
   *
   * _.depth([1, 2, 3])
   * // → 1
   *
   * _.depth([[1, 2], [3, 4]])
   * // → 2
   *
   */
  // return the depth (rank) of tensor, assuming homogeneity
  depth: function(T) {
    var t = T,
      d = 0;
    while (t.length) {
      d++;
      t = t[0];
    }
    return d;
  },

  /**
   * Returns the "volume" of a tensor, i.e. the totaly number of scalars in it.
   *
   * @category properties
   * @param {tensor} T The tensor.
   * @returns {number} volume The number of scalar entries in the tensor.
   *
   * @example
   * _.volume(0)
   * // → 0
   *
   * _.volume([1, 2, 3])
   * // → 3
   *
   * _.volume([[1, 2], [3, 4]])
   * // → 4
   *
   */
  // return the size of a tensor (total number of scalar entries)
  // return 0 for scalar
  volume: function(T) {
    return _.flattenDeep(T).length;
  },

  /**
   * Returns the "dimension" of a tensor.
   * Note that a tensor has homogenous depth, that is, there cannot tensors of different ranks in the same vector, e.g. [1, [2,3], 4] is prohibited.
   *
   * @category properties
   * @param {tensor} T The tensor.
   * @returns {Array} dim The dimension the tensor.
   *
   * @example
   * _.dim(0)
   * // → []
   *
   * _.dim([1, 2, 3])
   * // → [3]
   *
   * _.dim([[1, 2, 3], [4, 5, 6]])
   * // → [2, 3]
   *
   * _.dim([
     [[1,1,1,1],[2,2,2,2],[3,3,3,3]],
     [[4,4,4,4],[5,5,5,5],[6,6,6,6]]
   ])
   * // → [2, 3, 4]
   *
   */
  // Get the dimension of a (non-scalar) tensor by _.flattenDeep, assume rectangular
  dim: function(T) {
    var dim = [],
      ptr = T;
    while (ptr.length) {
      dim.push(ptr.length);
      ptr = ptr[0];
    }
    return dim;
  },
  /**
   * Checks if a tensor is "flat", i.e. all entries are scalars.
   *
   * @category properties
   * @param {tensor} T The tensor.
   * @returns {boolean} true If tensor is flat.
   *
   * @example
   * _.isFlat(0)
   * // → true
   *
   * _.isFlat([1, 2, 3])
   * // → true
   *
   * _.isFlat([[1, 2], [3, 4]])
   * // → false
   *
   */
  // check if a tensor is rank-1
  isFlat: function(T) {
    var flat = true,
      len = T.length;
    while (len--) {
      flat *= !(T[len] instanceof Array);
      if (!flat) break;
    }
    return Boolean(flat);
  },
  /**
   * Returns the maximum length of the deepest array in (non-scalar) tensor T.
   * Useful for probing the data structure and ensuring tensor is rectangular.
   *
   * @category properties
   * @param {tensor} T The tensor.
   * @returns {number} length The maximum length of the deepest array in T.
   *
   * @example
   * _.maxDeepestLength(0)
   * // → 0
   *
   * _.maxDeepestLength([1, 2, 3])
   * // → 3
   *
   * _.maxDeepestLength([[1, 2], [3, 4]])
   * // → 2
   *
   */
  // get the maximum length of the deepest array in (non-scalar) tensor T.
  maxDeepestLength: function(T) {
    if (!(T instanceof Array)) return 0;
    var stack = [],
      sizes = [];
    stack.push(T);
    while (stack.length) {
      var curr = stack.pop(),
        len = curr.length;
      if (lomath.isFlat(curr))
        sizes.push(len);
      else
        while (len--)
          stack.push(curr[len]);
    }
    return _.max(sizes);
  },

  ///////////////////////////
  // Tensor transformation //
  ///////////////////////////

  // lodash methods
  // _.chunk
  // _.flatten, _.flattenDeep

  /**
   * Swaps entries at indices `i,j`.
   * Mutates the array.
   *
   * @category transformation
   * @param {Array} T The array.
   * @param {number} i The swap-index.
   * @param {number} j The swap-index.
   * @returns {Array} T The mutated array after swapping.
   *
   * @example
   * _.swap([1, 2, 3], 0, 2)
   * // → [3, 2, 1]
   *
   */
  // swap at index i, j
  // Mutates the array
  swap: function(arr, i, j) {
    arr[i] = arr.splice(j, 1, arr[i])[0];
    return arr;
  },
  /**
   * Returns a copy of the array reversed, optionally from index `i` to `j` inclusive.
   *
   * @category transformation
   * @param {Array} T The array.
   * @param {number} [i=0] The from-index.
   * @param {number} [j=T.length-1] The to-index.
   * @returns {Array} R The reversed copy of the array.
   *
   * @example
   * _.reverse([0, 1, 2, 3, 4, 5])
   * // → [5, 4, 3, 2, 1, 0]
   *
   * _.reverse([0, 1, 2, 3, 4, 5], 2) // reverse from index 2
   * // → [0, 1, 5, 4, 3, 2]
   *
   * _.reverse([0, 1, 2, 3, 4, 5], null, 2) // reverse to index 2
   * // → [2, 1, 0, 3, 4, 5]
   *
   * _.reverse([0, 1, 2, 3, 4, 5], 2, 4) // reverse from index 2 to 4
   * // → [0, 1, 4, 3, 2, 5]
   *
   */
  // return a copy of reversed arr from index i to j inclusive
  reverse: function(arr, i, j) {
    var vec = arr.slice(0);
    var k = i == undefined ? 0 : i;
    var l = j == undefined ? arr.length - 1 : j;
    var mid = Math.ceil((k + l) / 2);
    while (k < mid)
      lomath.swap(vec, k++, l--);
    return vec;
  },
  /**
   * Extends an array till `toLen` by prepending with `val`.
   * Mutates the array.
   *
   * @category transformation
   * @param {Array} T The array.
   * @param {number} toLen The new length of the array. Must be longer than T.length.
   * @param {number} [val=0] The value to prepend with.
   * @returns {Array} T The mutated array after extending.
   *
   * @example
   * _.extend([1, 2, 3], 6)
   * // → [1, 2, 3, 0, 0, 0]
   *
   * _.extend([1, 2, 3], 6, 'a')
   * // → [1, 2, 3, 'a', 'a', 'a']
   *
   */
  // return a copy: extend an array till toLen, filled with val defaulted to 0.
  // Mutates the array
  extend: function(arr, toLen, val) {
    var lendiff = toLen - arr.length,
      rePal = (val == undefined ? 0 : val);
    if (lendiff < 0)
      throw new Error("Array longer than the length to extend to")
    while (lendiff--)
      arr.push(rePal);
    return arr;
  },
  /**
   * Searches the array in batch by applying `_.indexOf` in batch; returns the indices of the results in order.
   * Useful for grabbing the headers in a data set.
   *
   * @category transformation
   * @param {Array} T The array.
   * @param {Array} fields The array of fields to search for in T.
   * @returns {Array} inds The indices returned by applying `_.indexOf` to fields.
   *
   * @example
   * _.batchIndexOf(['a','b','c','d','e','f'], [1, 'b', 'a', 'a'])
   * // → [-1, 1, 0, 0]
   *
   */
  // applying _.indexOf in batch; returns -1 for field if not found
  batchIndexOf: function(arr, fieldArr) {
    return _.map(fieldArr, function(t) {
      return _.indexOf(arr, t)
    });
  },
  /**
   * Filters out the invalid indices (negatives) in an array of indices. Basically keeps `x` where `0 ≤ x ≤ maxLen`.
   * Used with `_.batchIndexOf`.
   *
   * @category transformation
   * @param {Array} T The array of indices, can be from `_.batchIndexOf`.
   * @param {number} maxLen The max value the indices can have.
   * @returns {Array} inds A copy of the array with only valid indices.
   *
   * @example
   * _.validInds([-2, 4, 0, 2, -1], 2)
   * // → [0, 2]
   *
   */
  // return valid indices from indArr, i.e. in range 0 to maxLen
  validInds: function(indArr, maxLen) {
    return _.filter(indArr, lomath.inRange.bind(null, 0, maxLen));
  },
  /**
   * Returns a new matrix with the selected rows from a matrix. Same as `rbind()` from `R`.
   * Useful for picking certain rows from a matrix/tensor.
   *
   * @category transformation
   * @param {tensor} M The original matrix.
   * @param {Array} indArr The array of indices specifying the rows of M to pick.
   * @returns {tensor} M' The matrix with the selected rows from the indices.
   *
   * @example
   * _.rbind([[1,2,3],[4,5,6],[7,8,9]], [1, 1, 2])
   * // → [[4, 5, 6], [4, 5, 6], [7, 8, 9]]
   *
   */
  // return a copy with sub rows from matrix M
  rbind: function(M, indArr) {
    indArr = lomath.validInds(indArr, M.length);
    if (indArr.length == 0) return [];
    return _.map(indArr, function(i) {
      return _.cloneDeep(M[i]);
    });
  },
  /**
   * Returns a new matrix with the selected columns from a matrix. Same as `cbind()` from `R`.
   * Useful for picking columns from a data matrix/tensor with specified header indices.
   *
   * @category transformation
   * @param {tensor} M The original matrix.
   * @param {Array} indArr The array of indices specifying the columns of M to pick.
   * @returns {tensor} M' The matrix with the selected columns from the indices.
   *
   * @example
   * _.cbind([['a','b','c'],[1,2,3],[-1,-2,-3]], [1, 1, 2])
   * // → [ [ 'b', 'b', 'c' ], [ 2, 2, 3 ], [ -2, -2, -3 ] ]
   *
   * var M = [['a','b','c'],[1,2,3],[-1,-2,-3]]; // using on a dataset
   * var titles = M[0];
   * _.cbind(M, _.batchIndexOf(titles, ['b', 'b', 'c']))
   * // → [ [ 'b', 'b', 'c' ], [ 2, 2, 3 ], [ -2, -2, -3 ] ]
   *
   */
  // return a copy with sub rows from matrix M
  cbind: function(M, indArr) {
    indArr = lomath.validInds(indArr, M[0].length)
    if (indArr.length == 0) return [];
    return _.map(M, function(row) {
      return _.map(indArr, function(i) {
        return row[i];
      });
    });
  },
  /**
   * Returns a new matrix with the selected columns from a matrix. Short for `_.cbind(M, _.batchIndexOf())`
   * Useful for picking columns from a data matrix by directly specifying the header titles.
   *
   * @category transformation
   * @param {tensor} M The original matrix.
   * @param {Array} fields The array of fields of the columns of M to pick.
   * @returns {tensor} M' The matrix with the selected columns from the fields.
   *
   * @example
   * var M = [['a','b','c'],[1,2,3],[-1,-2,-3]]; // using on a dataset
   * _.cbindByField(M, ['b', 'b', 'c'])
   * // → [ [ 'b', 'b', 'c' ], [ 2, 2, 3 ], [ -2, -2, -3 ] ]
   *
   */
  // Assuming matrix has header, rbind by header fields instead of indices
  cbindByField: function(M, fieldArr) {
    // assuming header is first row of matrix
    var header = M[0],
      fieldInds = lomath.batchIndexOf(header, fieldArr);
    return lomath.cbind(M, fieldInds);
  },
  /**
   * Returns a copy of a matrix transposed.
   *
   * @category transformation
   * @param {tensor} M The original matrix.
   * @returns {tensor} M' The copy transposed matrix.
   *
   * @example
   * _.transpose([[1, 2], [3, 4]])
   * // → [[ 1, 3 ], [ 2, 4 ]]
   *
   */
  // transpose a matrix
  transpose: function(M) {
    return _.zip.apply(null, M);
  },
  /**
   * Returns the trace of a square matrix.
   *
   * @category transformation
   * @param {tensor} M The matrix.
   * @returns {number} trM The trace of the matrix.
   *
   * @example
   * _.trace([[1, 2], [3, 4]])
   * // → 5
   *
   */
  // trace a matrix
  trace: function(M) {
    var len = M.length,
    sum = 0;
    while(len--)
      sum += M[len][len]
    return sum;
  },
  /**
   * Multiply two matrices.
   *
   * @category transformation
   * @param {tensor} A The first matrix.
   * @param {tensor} B The second matrix.
   * @returns {tensor} AB The two matrices multiplied together.
   *
   * @example
   * _.matMultiply([[1,2],[3,4]], [[1,2],[3,4]])
   * // → [ [ 7, 10 ], [ 15, 22 ] ]
   *
   */
  // multiply two matrices
  matMultiply: function(A, B) {
    var T = lomath.transpose(B);
    return _.map(A, function(a){
      return _.map(T, lomath.dot.bind(null, a))
    })
  },
  /**
   * Makes a tensor rectangular by filling with val (defaulted to 0).
   * Mutates the tensor.
   *
   * @category transformation
   * @param {tensor} T The original tensor.
   * @returns {tensor} T The mutated tensor that is now rectangular.
   *
   * @example
   * _.rectangularize([
     [1, 2, 3],
     [4]
   ])
   * // → [[ 1, 2, 3 ], [ 4, 0, 0 ]]
   *
   * _.rectangularize([
     [1, 2, 3],
     [4]
   ], 'a')
   * // → [[ 1, 2, 3 ], [ 4, 'a', 'a' ]]
   *
   */
  // make a tensor rectangular by filling with val, defaulted to 0.
  // mutates the tensor
  rectangularize: function(T, val) {
    var toLen = lomath.maxDeepestLength(T),
      stack = [];
    stack.push(T);
    while (stack.length) {
      var curr = stack.pop();
      if (lomath.isFlat(curr))
        lomath.extend(curr, toLen, val);
      else
        _.each(curr, function(c) {
          stack.push(c);
        })
    }
    return T;
  },
  /**
   * Reshapes an array into a multi-dimensional tensor. Applies `_.chunk` using a dimension array in sequence.
   *
   * @category transformation
   * @param {Array} A The original flat array.
   * @param {Array} dimArr The array specifying the dimensions.
   * @returns {tensor} T The tensor reshaped from the copied array.
   *
   * @example
   * _.reshape([1, 2, 3, 4, 5, 6], [2, 3])
   * // → [[ 1, 2, 3 ], [ 4, 5, 6 ]]
   *
   * _.reshape([1, 2, 3, 4], [2, 3])
   * // → [[ 1, 2, 3 ], [ 4 ]]
   *
   */
  // use chunk from inside to outside:
  reshape: function(arr, dimArr) {
    var tensor = arr;
    var len = dimArr.length;
    while (--len)
      tensor = _.chunk(tensor, dimArr[len]);
    return tensor;
  },
  /**
   * Flattens a JSON object (removes nestedness) and serialize it for sending over HTTP formData.
   *
   * @category transformation
   * @param {JSON} obj The original JSON object.
   * @returns {JSON} flat_obj The flattened (unnested) object.
   *
   * @example
   * formData = {
   *  update_id: 87654321,
   *  message: {
   *      message_id: 12345678,
   *      from: {
   *          array: [1,[2],3],
   *          last_name: 'kengz'
   *      },
   *      chat: {
   *          id: 123454,
   *          last_name: 'lomath'
   *      }
   *  }
   *
   * _.flattenJSON(formData)
   * // → { 'update_id': 87654321,
   * // 'message[message_id]': 12345678,
   * // 'message[from][array]': [ 1, [ 2 ], 3 ],
   * // 'message[from][last_name]': 'kengz',
   * // 'message[chat][id]': 123454,
   * // 'message[chat][last_name]': 'lomath' }
   * // The deepest values are not flattened (not stringified)
   */
  // use chunk from inside to outside:
  flattenJSON: function(obj) {
    // variable to keep the deepest vals traversed in proper order
    var _vals = [];
    function _flattenJSON(ins, k) {
      return _.flatten(_.map(ins, function(val, key) {
        // if val is JSON object
        if (_.isObject(val) && !_.isArray(val))
          return _flattenJSON(ins[key], k + '[' + key + ']')
        // else if terminates
        _vals.push(val);
        return k + '[' + key + ']'
      }))
    }
    return _.object(
      _.map(_flattenJSON(obj, ''), function(i){
          return i.replace('[', '').replace(']', '')
      })
      , _vals)
  },

  ///////////////////////////////
  // Subsets and combinatorics //
  ///////////////////////////////

  /**
   * Generates all the strings of N-nary numbers up to length.
   *
   * @category combinatorics
   * @param {number} length The length of the N-nary numbers.
   * @param {number} N The number base.
   * @returns {Array} T The array of strings of the N-nary numbers.
   *
   * @example
   * _.genAry(3, 2) // binary, length 3
   * // → ['000', '001', '010', '011', '100', '101', '110', '111']
   *
   * _.genAry(2, 3) // ternary, length 2
   * // → ['00', '01', '02', '10', '11', '12', '20', '21', '22']
   *
   */
  // generate n-nary number of length
  genAry: function(length, n) {
    var range = _.map(_.range(n), String);
    var tmp = range,
      it = length;
    while (--it) {
      tmp = _.flattenDeep(_.map(range, function(x) {
        return lomath.distributeRight(lomath.a_add, x, tmp)
      }));
    }
    return tmp;
  },
  /**
   * Converts an array of strings to array of array of numbers.
   * Used with `_.genAry` and related number/subset-generating functions.
   *
   * @category combinatorics
   * @param {Array} strings The strings of numbers to convert into arrays.
   * @returns {Array} T The array of array of numbers from the strings.
   *
   * @example
   * _.toNumArr(['00', '01', '10', '11']) // binary, length 2
   * // → [[0, 0], [0, 1], [1, 0], [1, 1]]
   *
   */
  // convert array of strings to array of array of numbers
  toNumArr: function(sarr) {
    return _.map(sarr, function(str) {
      return _.map(str.split(''), function(x) {
        return parseInt(x);
      })
    })
  },
  /**
   * Generates all the permutation subset indices of n items.
   *
   * @category combinatorics
   * @param {number} n The number of items to permute.
   * @returns {Array} T The array of strings of length n, specifying the permutation indices.
   *
   * @example
   * _.pSubset(3)
   * // → [
   * // ['0', '1', '2'],
   * // ['01', '02', '10', '12', '20', '21'],
   * // ['012', '021', '102', '120', '201', '210']
   * // ]
   *
   */
  // generate all permutation subset indices of n items
  pSubset: function(n) {
    var range = _.map(_.range(n), String),
      res = [],
      count = n;
    res.push(range); //init
    while (--count) {
      // the last batch to expand on
      var last = _.last(res);
      var batch = [];
      _.each(last, function(k) {
        for (var i = 0; i < n; i++)
          if (!_.contains(k.split(''), String(i)))
            batch.push(k + i);
      })
      res.push(batch);
    }
    return res;
  },
  /**
   * Generates all the (combination) subset indices of n items.
   *
   * @category combinatorics
   * @param {number} n The number of items to choose.
   * @returns {Array} T The array of strings of length n, specifying the subset indices.
   *
   * @example
   * _.subset(3)
   * // → [
   * // ['0', '1', '2'],
   * // ['01', '02', '12'],
   * // ['012']
   * // ]
   *
   */
  // generate all subset indices of n items
  subset: function(n) {
    var range = _.map(_.range(n), String),
      res = [],
      count = n;
    res.push(range); //init
    while (--count) {
      // the last batch to expand on
      var last = _.last(res);
      var batch = [];
      _.each(last, function(k) {
        for (var i = Number(_.last(k)) + 1; i < n; i++)
          batch.push(k + i);
      })
      res.push(batch);
    }
    return res;
  },
  /**
   * Generates the indices of n-permute-r. Calls `_.pSubset` internally, chooses the array with string length r, and converts to numbers.
   *
   * @category combinatorics
   * @param {number} n The number of items to permute.
   * @param {number} r The number of items chosen.
   * @returns {Array} T The array of index arrays specifying the permutation indices.
   *
   * @example
   * _.permList(3, 2)
   * // → [ [ 0, 1 ], [ 0, 2 ], [ 1, 0 ], [ 1, 2 ], [ 2, 0 ], [ 2, 1 ] ]
   *
   */
  // generate the indices of n-perm-r
  permList: function(n, r) {
    return lomath.toNumArr(lomath.pSubset(n)[r - 1]);
  },
  /**
   * Generates the indices of n-choose-r. Calls `_.subset` internally, chooses the array with string length r, and converts to numbers.
   *
   * @category combinatorics
   * @param {number} n The number of items to choose.
   * @param {number} r The number of items chosen.
   * @returns {Array} T The array of index arrays specifying the subset indices.
   *
   * @example
   * _.combList(3, 2)
   * // → [ [ 0, 1 ], [ 0, 2 ], [ 1, 2 ] ]
   *
   */
  // generate the indices of n-choose-r
  combList: function(n, r) {
    return lomath.toNumArr(lomath.subset(n)[r - 1]);
  },
  /**
   * Generates the permutation indices of n items in lexicographical order.
   *
   * @category combinatorics
   * @param {number} n The number of items to permute.
   * @returns {Array} T The array of index arrays specifying the permutation indices.
   *
   * @example
   * _.permute(3)
   * // → [
   * // [ 0, 1, 2 ],
   * // [ 0, 2, 1 ],
   * // [ 1, 0, 2 ],
   * // [ 1, 2, 0 ],
   * // [ 2, 0, 1 ],
   * // [ 2, 1, 0 ]
   * // ]
   *
   */
  // generate all permutations of n items
  permute: function(n) {
    var range = _.range(n),
      res = [],
      diffs, k = 0;
    while (k != -1) {
      res.push(range.slice(0));
      diffs = lomath.stairs(range),
        k = _.findLastIndex(diffs, lomath.isPositive);
      var l = _.findLastIndex(range, function(t) {
        return t > range[k];
      });
      lomath.swap(range, k, l);
      range = lomath.reverse(range, k + 1, null);
    }
    return res;
  },
  /**
   * Returns n!.
   *
   * @category combinatorics
   * @param {number} n The integer.
   * @returns {number} n!
   *
   * @example
   * _.factorial(5)
   * // → 120
   *
   */
  // return factorial(n)
  // alias: fact
  factorial: function(n) {
    if (n == 0) return 1;
    if (n < 0) throw "Negative factorial not defined"
    var count = n,
      res = n;
    while (--count)
      res *= count;
    return res;
  },
  /**
   * Returns n-permute-r.
   *
   * @category combinatorics
   * @param {number} n The integer.
   * @param {number} r The integer.
   * @returns {number} nPr
   *
   * @example
   * _.permutation(5, 5)
   * // → 120
   *
   * _.permutation(1000, 1)
   * // → 1000
   *
   */
  // return n-permute-r
  // alias: perm
  permutation: function(n, r) {
    if (r == 0) return 1;
    if (n < 0 || r < 0) throw "Negative permutation not defined"
    var count = r,
      term = n;
    res = n;
    while (--count)
      res *= --term;
    return res;
  },
  /**
   * Returns n-choose-r.
   *
   * @category combinatorics
   * @param {number} n The integer.
   * @param {number} r The integer.
   * @returns {number} nCr
   *
   * @example
   * _.combination(1000, 1)
   * // → 1000
   *
   * _.combination(1000, 1000) // No integer overflow; uses symmetry.
   * // → 1
   *
   * _.combination(1000, 500) // Inevitable overflow.
   * // → NaN
   *
   */
  // return n-choose-r
  // alias: comb
  combination: function(n, r) {
    var l = (r > n / 2) ? n - r : r;
    if (n < 0 || l < 0) throw "Negative combination not defined"
    return lomath.permutation(n, l) / lomath.factorial(l);
  },

  /////////////////////
  // Handy vectorial //
  /////////////////////

  /**
   * Returns the dot product between two vectors. If lengths mismatch, recycles the shorter vector.
   *
   * @category vector
   * @param {Array} X A flat array.
   * @param {Array} Y A flat array.
   * @returns {number} X.Y The dot product.
   *
   * @example
   * _.dot([1, 2, 3], [1, 2, 3])
   * // → 14
   *
   * _.dot([1, 2, 3, 4, 5, 6], [1, 2, 3]) // recycle
   * // → 46
   *
   */
  // return the dot product of two vectors
  // recyle if lengths mismatch
  dot: function(X, Y) {
    return _.sum(lomath.multiply(X, Y));
  },
  /**
   * Returns the sums of n-powers (defaulted to 2) of a tensor, i.e. the square of the generalized hypotenuse of a tensor.
   * Useful for doing sums of squares/other L-n metrics.
   *
   * @category vector
   * @param {tensor} T A tensor.
   * @param {number} [n=2] The power base.
   * @returns {number} num The power sum.
   *
   * @example
   * _.powSum([1, 2, 3])
   * // → 14
   *
   * _.powSum([1, 2, 3], 3)
   * // → 36
   *
   * _.dot([[1, 2], [3, 4]], 3) // applicable to a tensor
   * // → 100
   *
   */
  // return the sum of n-powers of a tensor, default to n = 2
  powSum: function(T, n) {
    var L = n == undefined ? 2 : n;
    return _.sum(lomath.pow(T, L));
  },
  /**
   * Returns the L-n norm of a vector, default to L-2 (Euclidean) metric.
   *
   * @category vector
   * @param {tensor} T A tensor.
   * @param {number} [n=2] The metric.
   * @returns {number} num The norm in L-n metric space.
   *
   * @example
   * _.norm([3, 4]) // Euclidean triangle
   * // → 5
   *
   * _.norm([3, 4], 1) // taxicab metric
   * // → 7
   *
   */
  // return the L-n norm of a vector, default to L-2
  norm: function(v, n) {
    var L = n == undefined ? 2 : n;
    return lomath.a_root(lomath.powSum(v, L), L);
  },
  /**
   * Returns a copy of the vector normalized using L-n metric (defaulted to L-2).
   *
   * @category vector
   * @param {tensor} T A tensor.
   * @param {number} [n=2] The metric.
   * @returns {tensor} T' The normalized tensor.
   *
   * @example
   * _.normalize([3, 4]) // Euclidean triangle
   * // → [0.6, 0.8]
   *
   * _.normalize([3, 4], 1) // taxicab metric
   * // → [3/7, 4/7]
   *
   */
  // normalize a vector(tensor) by L-n norm, default to n=2
  normalize: function(v, n) {
    return lomath.divide(v, lomath.norm(v, n));
  },
  /**
   * Returns a copy of the vector rescaled to unit length; is the shorthand for `_.normalize(v, 1)`.
   *
   * @category vector
   * @param {tensor} T A tensor.
   * @returns {tensor} T' The rescaled tensor.
   *
   * @example
   * _.rescale([3, 4])
   * // → [3/7, 4/7]
   *
   */
  // rescale a vector to unit length
  rescale: function(v) {
    return lomath.normalize(v, 1);
  },

  //////////////////
  // handy Matrix //
  //////////////////

  // Matrix ops
  // Matrix ops
  // Matrix ops

  /////////////////
  // Handy trend //
  /////////////////

  /**
   * Returns the stair, i.e. the adjacent differences in the vector.
   *
   * @category trend
   * @param {Array} T An array of values.
   * @returns {Array} S The array showing adjacent differences.
   *
   * @example
   * _.stairs([1, 2, 3, 5, 8])
   * // → [1, 1, 2, 3]
   *
   */
  // return the stairs: adjacent difference in a vector
  stairs: function(v) {
    var dlen = v.length - 1,
      st = Array(dlen);
    while (dlen--)
      st[dlen] = v[dlen + 1] - v[dlen];
    return st;
  },
  /**
   * Check the trend of the array using a signature function.
   * Useful for checking if array entries are increasing.
   *
   * @category trend
   * @param {Array} T An array of values.
   * @param {Function} sigFn A signature function.
   * @returns {boolean} true If stairs of T match the sigFn.
   *
   * @example
   * _.stairsTrend([1, 2, 3, 4, 5], _.isPositive) // Array increasing
   * // → true
   *
   */
  // check the trend of vector v using sign-function
  stairsTrend: function(v, sigFn) {
    return lomath.sameSig(lomath.stairs(v), sigFn);
  },
  /**
   * Shorthand for `_.stairsTrend`. Checks if a vector v is increasing.
   *
   * @category trend
   * @param {Array} T An array of values.
   * @returns {boolean} true If stairs of T match the sigFn.
   */
  // check if vector v is increasing
  increasing: function(v) {
    return lomath.stairsTrend(v, lomath.isPositive);
  },
  /**
   * Shorthand for `_.stairsTrend`. Checks if a vector v is non-decreasing.
   *
   * @category trend
   * @param {Array} T An array of values.
   * @returns {boolean} true If stairs of T match the sigFn.
   */
  // check is vector v is non-decreasing
  nonDecreasing: function(v) {
    return lomath.stairsTrend(v, lomath.nonNegative);
  },
  /**
   * Shorthand for `_.stairsTrend`. Checks if a vector v is decreasing.
   *
   * @category trend
   * @param {Array} T An array of values.
   * @returns {boolean} true If stairs of T match the sigFn.
   */
  // check is vector v is decreasing
  decreasing: function(v) {
    return lomath.stairsTrend(v, lomath.isNegative);
  },
  /**
   * Shorthand for `_.stairsTrend`. Checks if a vector v is non-increasing.
   *
   * @category trend
   * @param {Array} T An array of values.
   * @returns {boolean} true If stairs of T match the sigFn.
   */
  // check is vector v is non-increasing
  nonIncreasing: function(v) {
    return lomath.stairsTrend(v, lomath.nonPositive);
  },

  ///////////////////////
  // Handy statistical //
  ///////////////////////

  /**
   * Returns the mean/average of a tensor.
   *
   * @category statistics
   * @param {tensor} T A tensor.
   * @returns {number} mean
   *
   * @example
   * _.mean([1, 2, 3])
   * // → 2
   *
   * _.mean([[1, 2], [3, 4]])
   * // → 5
   *
   */
  // return the average of a vector
  mean: function(v) {
    return _.sum(v) / v.length;
  },
  /**
   * Returns the expectation value `E(fn(X))` of a random variable vector, optionally with the corresponding probability vector, using the random variable function (defaulted to identity).
   *
   * @category statistics
   * @param {Array} X The random variable vector.
   * @param {Array} [P] The corresponding probability vector.
   * @param {Function} [fn] The random variable function.
   * @returns {number} E(fn(X))
   *
   * @example
   * var X = [-1, 0, 1, 2]
   * var Y = [-1,0,0,1,1,1,2,2,2,2]
   * var P = [0.1, 0.2, 0.3, 0.4]
   *
   * _.expVal(Y) // using a raw data array, E(X)
   * // → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
   * _.expVal(X, P) // equivalent to Y, but using X and P: E(X)
   * // → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
   *
   * _.expVal(Y, _.square) // using raw data array, E(X^2)
   * // → (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4)
   * _.expVal(X, P, _.square) // equivalent to Y, but using X and P: E(X^2)
   * // → (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4)
   *
   */
  // return the expectation value E(fn(x)), given probability and value vectors, and an optional atomic fn, defaulted to identity E(x).
  // Note: fn must be atomic
  // alias E
  expVal: function(X, P, fn) {
    var val, prob, func;
    // if only X is specified
    if (P == undefined && fn == undefined) {
      var hist = lomath.histogram(X);
      val = hist.value,
      prob = hist.prob;
    }
    // if X, P specified (maybe fn too)
    else if (typeof P === 'object') {
      val = X;
      prob = P;
      func = fn;
    }
    // if X, fn specified
    else if (typeof P === 'function'){
      var hist = lomath.histogram(X);
      val = hist.value,
      prob = hist.prob;
      func = P;
    }
    if (func != undefined)
      return lomath.dot(lomath.distributeSingle(func, val), prob);
    return lomath.dot(val, prob);
  },
  /**
   * Returns the variance `Var(fn(X))` of a random variable vector, with the corresponding probability vector, using the random variable function (defaulted to identity).
   *
   * @category statistics
   * @param {Array} X The random variable vector.
   * @param {Array} [P] The corresponding probability vector.
   * @param {Function} [fn] The random variable function.
   * @returns {number} Var(fn(X))
   *
   * @example
   * var X = [-1, 0, 1, 2]
   * var Y = [-1,0,0,1,1,1,2,2,2,2]
   * var P = [0.1, 0.2, 0.3, 0.4]
   *
   * _.variance(Y) // using a raw data array, Var(X)
   * // → 1
   * _.variance(X, P) // equivalent to Y, but using X and P: Var(X)
   * // → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
   *
   * _.variance(Y, _.square) // using raw data array, Var(X^2)
   * // → 2.8
   * _.variance(X, P, _.square) // equivalent to Y, but using X and P: Var(X^2)
   * // → 2.8
   *
   */
  // return the variance, given probability and value vectors
  // alias Var
  variance: function(X, P, fn) {
    // if only X is specified
    if (P == undefined && fn == undefined) {
      return lomath.expVal(X, lomath.a_square) - lomath.a_square(lomath.expVal(X))
    }
    // if X, P specified (maybe fn too)
    else if (typeof P === 'object') {
      return fn == undefined ?
        lomath.expVal(X, P, lomath.a_square) - lomath.a_square(lomath.expVal(X, P)) :
        lomath.expVal(X, P, _.flow(fn, lomath.a_square)) - lomath.a_square(lomath.expVal(X, P, fn));
    }
    // if X, fn specified
    else if (typeof P === 'function'){
      return lomath.expVal(X, _.flow(P, lomath.a_square)) - lomath.a_square(lomath.expVal(X, P));
    }
  },
  /**
   * Returns the standard deviation `sigma(fn(X))` of a random variable vector, with the corresponding probability vector, using the random variable function (defaulted to identity).
   * Simply calles `_.variance` internally and returns its square root.
   *
   * @category statistics
   * @param {Array} X The corresponding random variable vector.
   * @param {Array} [P] The corresponding probability vector.
   * @param {Function} [fn] The random variable function.
   * @returns {number} sigma(fn(X))
   *
   * @example
   * var X = [-1, 0, 1, 2]
   * var Y = [-1,0,0,1,1,1,2,2,2,2]
   * var P = [0.1, 0.2, 0.3, 0.4]
   *
   * _.stdev(Y) // using a raw data array, sigma(X)
   * // → 1
   * _.stdev(X, P) // equivalent to Y, but using X and P: sigma(X)
   * // → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
   *
   * _.stdev(Y, _.square) // using raw data array, sigma(X^2)
   * // → 1.673
   * _.stdev(X, P, _.square) // equivalent to Y, but using X and P: sigma(X^2)
   * // → 1.673
   *
   */
  // return the variance, given probability and value vectors
  stdev: function(X, P, fn) {
    return Math.sqrt(lomath.variance(X, P, fn));
  },
  /**
   * Returns a histogram/distribution from the data. This internally calls `_.countBy` to group data by bins, using the function if specified.
   * Returns the object containing values, frequencies and probabilities as separate array for ease of using them with the statistics methods.
   *
   * @param {Array} data An array of data.
   * @param {Function} [fn] An optional function to group the data by.
   * @param {boolean} [pair] If true, will return an array of `[value, freq]`.
   * @returns {Object|Array} histogram {value, freq, prob} or array of [value, freq].
   *
   * @example
   * // called with data
   * var hist = _.histogram(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd']);
   * hist.value
   * // → ['a', 'b', 'c', 'd']
   * hist.freq
   * // → [1, 2, 3, 4]
   * hist.prob // normalized freq as probabiltiy distribution
   * // → [0.1, 0.2, 0.3, 0.4]
   *
   * // called with data and pair
   * _.histogram(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd'], true);
   * // → [['a',1], ['b',2], ['c',3], ['d',4]
   * 
   * // called with data and fn
   * var histfloor = _.histogram([1.1, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4], Math.floor);
   * histfloor.value
   * // → [ '1', '2', '3', '4' ] // Note the keys from _.countBy are strings
   * hist.freq
   * // → [1, 2, 3, 4]
   * histfloor.prob
   * // → [0.1, 0.2, 0.3, 0.4]
   *
   * // called with data, fn and pair
   * _.histogram([1.1, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4], Math.floor, true);
   * // → [['1',1], ['2',2], ['3',3], ['4',4] ]
   *
   * 
   */
  histogram: function(data, fn, pair) {
    if (fn == true) // called with data, pair
      return _.pairs(_.countBy(data));
    var bin = _.countBy(data, fn);
    if (pair == true) // called with data, fn, pair
      return _.pairs(bin);
    var freq = _.values(bin);
    return { //called with data, [fn]
      value: _.keys(bin),
      freq: freq,
      prob: lomath.rescale(freq)
    }
  },
  /**
   * Returns the rate of return r in % of an exponential growth, given final value m_f, initial value m_i, and time interval t.
   * Formula: `100 * (Math.exp(Math.log(m_f / m_i) / t) - 1)`
   *
   * @category statistics
   * @param {number} m_f The final value.
   * @param {number} m_i The initial value.
   * @param {number} t The time interval between m_f, m_i.
   * @returns {number} r The growth rate in %.
   *
   * @example
   * _.expGRate(8, 2, 2) // 100% growth rate over 2 years
   * // → 100
   *
   */
  // Calculate the rate of return r in % of an exp growth, given final value m_f, initial value m_i, and time interval t
  expGRate: function(m_f, m_i, t) {
    return 100 * (Math.exp(Math.log(m_f / m_i) / t) - 1);
  },
  /**
   * Returns the trailing exponential rate of return in the last t years given a vector. Calls `_.expGRate` internally.
   *
   * @category statistics
   * @param {Array} v The time series vector.
   * @param {number} t The time interval.
   * @returns {number} r The growth rate in %.
   *
   * @example
   * var v = [1, 2, 4, 8]
   * _.trailExpGRate(v, 1)
   * // → 100
   *
   * _.trailExpGRate(v, 2)
   * // → 100
   *
   * _.trailExpGRate(v, 3)
   * // → 100
   *
   */
  // Calculate the trailing exp rate of return in the last t years given a vector v
  trailExpGRate: function(v, t) {
    var len = v.length;
    return lomath.expGRate(v[len - 1], v[len - 1 - t], t);
  },

  //////////////////////////////////////////
  // Plotting modules: normal and dynamic //
  //////////////////////////////////////////
  /**
   * The plotting module constructor.
   * Uses `HighCharts` to plot and `browserSync`. Pulls up browser directly showing your charts like magic!
   * To use this, go into `node_modules/lomath` and do `npm install` there to install the dev dependencies.
   *
   * @category plotting
   * @returns {Object} hc The plotting module of lomath.
   *
   * @example
   * // in the terminal at your project's root, do:
   * cd node_modules/lomath
   * npm install
   *
   * // Go back to your project .js file
   * var _ = require('lomath');
   *
   * var v = _.range(10);
   * var vv = _.square(v);
   *
   * // Construct the plotting modules
   * var hc = _.hc();
   *
   * // first, list all you wish to plot.
   * hc.plot(
       [{
           name: "linear",
           data: v
       }, {
           name: "square",
           data: vv
       }],
       "Title 1"
       )
   * hc.plot(
       [{
           name: "log",
           data: _.log(v)
       }],
       "Title 2"
       )
   *
   * // Finally, the command to render all the plots above.
   * // Pulls up a browser (default to chrome for better support) with the charts.
   * // calling hc.render(true) will autosave all plots to your downloads folder.
   * hc.render();
   *
   * // Magical, eh?
   */
  // hc: require(__dirname+'/chart/plot.js').hc
  hc: function() {
    var p = require(__dirname + '/chart/plot.js').p;
    return new p();
  },
  /**
   * Method of the constructed `hc` object.
   * A simplified wrapper of the HighCharts plot options object.
   * Allows one to use simple data plot by specifying data sets in objects consisting of data name and data.
   * The data specified can be array of y-values, or array of x-y values.
   *
   * @category plotting
   * @param {Array} seriesArr The array of data series, i.e. the series objects in the HighCharts options.
   * @param {string} [title=""] The title of this plot.
   * @param {string} [yLabel=""] The y-axis label.
   * @param {string} [xLabel=""] The x-axis label.
   * @returns {Object} options The options passed, for reference.
   *
   * @example
   * // Plots two data sets using y-values (x-values start from 0).
   * hc.plot(
       [{
           name: "linear",
           data: [1, 2, 3, 4, 5, 6]
       }, {
           name: "square",
           data: [1, 4, 9, 16, 25, 36]
       }],
       "Title 1"
       )

   * // Plots a data set using x-y values.
   * hc.plot(
       [{
           name: "square",
           data: [[3, 9], [4, 16], [5, 25], [6, 36]]
       }],
       "Title 2"
       )
   * // renders the plot
   * hc.render()
   */
  plot: function(seriesArr, title, yLabel, xLabel) {
    console.log("Please call this method by _.hc.plot");
    return 0;
  },
  /**
   * Method of the constructed `hc` object.
   * Advanced plotting for users familiar with HighCharts (see http://www.highcharts.com).
   * This is a highcharts wrapper; takes in a complete HighCharts plot options object.
   *
   * @category plotting
   * @param {Object} options The HighCharts options object.
   * @returns {Object} options The options passed, for reference.
   *
   * @example
   * // Plots using the highcharts options
   * hc.advPlot({
   chart: {
        type: 'column'
    },
    title: {
        text: 'Monthly Average Rainfall'
    },
    subtitle: {
        text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0]

    }, {
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5]

    }, {
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3]

    }, {
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5]

    }]
       })
   * // renders the plot
   * hc.render()
   */
  advPlot: function(options) {
    console.log("Please call this method by _.hc.advPlot");
    return 0;
  },
  /**
   * Method of the constructed `hc` object.
   * Renders the plots: Launches a browser with all the plots listed before this line. Uses a gulp task and browserSync.
   * Pass argument `true` will auto save all the plots to downloads.
   *
   * @category plotting
   * @param {boolean} [autosave] If true, will autosave all the plots to downloads.
   * @returns {*} browser Pulls up a browser.
   *
   * @example
   * hc.plot(...)
   * // renders the plot in a browser
   * hc.render()
   *
   * // hc.render(true) will autosave all plots.
   */
  render: function(autosave) {
    console.log("Please call this method by _.hc.advPlot");
    return 0;
  },
  // The time variables for tick tock
  t_start: 0,
  t_end: 0,
  /**
   * Starts a timer (unique to the whole _ object). Needs to be called before tock. If called again, will restart the timer.
   *
   * @category timing
   * @returns {number} ms Result from _.now(), in milliseconds.
   */
  tick: function() {
    lomath.t_start = _.now();
    return lomath.t_start;
  },
  /**
   * Ends a started timer (unique to the whole _ object). Needs to be called after tick. If called again, will give the next lap (starting from the last tick).
   *
   * @category timing
   * @returns {number} ms Difference between now and the last _.tick() in milliseconds.
   * @example
   * _.tick()
   * // ... run some functions here, use promise for better flow control.
   * someTaskwithPromise().then(tock())
   * // → Returns some time elapsed in ms.
   * 
   */
  tock: function() {
    lomath.t_end = _.now();
    var diff = lomath.t_end - lomath.t_start;
    console.log('Elapsed ms:', diff);
    return diff;
  }

})

// Export lomath as _
module.exports = lomath;
