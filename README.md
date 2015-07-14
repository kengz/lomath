# index.js API documentation

<!-- div class="toc-container" -->

<!-- div -->

## `basics`
* <a href="#add">`add`</a>
* <a href="#c">`c`</a>
* <a href="#divide">`divide`</a>
* <a href="#log">`log`</a>
* <a href="#logistic">`logistic`</a>
* <a href="#multiply">`multiply`</a>
* <a href="#prod">`prod`</a>
* <a href="#root">`root`</a>
* <a href="#square">`square`</a>
* <a href="#subtract">`subtract`</a>
* <a href="#sum">`sum`</a>

<!-- /div -->

<!-- div -->

## `combinatorics`
* <a href="#combList">`combList`</a>
* <a href="#combination">`combination`</a>
* <a href="#factorial">`factorial`</a>
* <a href="#genAry">`genAry`</a>
* <a href="#pSubset">`pSubset`</a>
* <a href="#permList">`permList`</a>
* <a href="#permutation">`permutation`</a>
* <a href="#permute">`permute`</a>
* <a href="#subset">`subset`</a>
* <a href="#toNumArr">`toNumArr`</a>

<!-- /div -->

<!-- div -->

## `composition`
* <a href="#asso">`asso`</a>
* <a href="#assodist">`assodist`</a>
* <a href="#distribute">`distribute`</a>
* <a href="#distributeBoth">`distributeBoth`</a>
* <a href="#distributeLeft">`distributeLeft`</a>
* <a href="#distributeRight">`distributeRight`</a>
* <a href="#distributeSingle">`distributeSingle`</a>
* <a href="#op">`op`</a>

<!-- /div -->

<!-- div -->

## `initialization`
* <a href="#numeric">`numeric`</a>
* <a href="#seq">`seq`</a>

<!-- /div -->

<!-- div -->

## `native-Math`
* <a href="#abs">`abs`</a>
* <a href="#acos">`acos`</a>
* <a href="#acosh">`acosh`</a>
* <a href="#asin">`asin`</a>
* <a href="#asinh">`asinh`</a>
* <a href="#atan">`atan`</a>
* <a href="#atanh">`atanh`</a>
* <a href="#ceil">`ceil`</a>
* <a href="#cos">`cos`</a>
* <a href="#cosh">`cosh`</a>
* <a href="#exp">`exp`</a>
* <a href="#floor">`floor`</a>
* <a href="#log10">`log10`</a>
* <a href="#log1p">`log1p`</a>
* <a href="#log2">`log2`</a>
* <a href="#pow">`pow`</a>
* <a href="#round">`round`</a>
* <a href="#sign">`sign`</a>
* <a href="#sin">`sin`</a>
* <a href="#sinh">`sinh`</a>
* <a href="#sqrt">`sqrt`</a>
* <a href="#tan">`tan`</a>
* <a href="#tanh">`tanh`</a>
* <a href="#trunc">`trunc`</a>

<!-- /div -->

<!-- div -->

## `plotting`
* <a href="#advPlot">`advPlot`</a>
* <a href="#hc">`hc`</a>
* <a href="#plot">`plot`</a>
* <a href="#render">`render`</a>

<!-- /div -->

<!-- div -->

## `properties`
* <a href="#depth">`depth`</a>
* <a href="#dim">`dim`</a>
* <a href="#isFlat">`isFlat`</a>
* <a href="#maxDeepestLength">`maxDeepestLength`</a>
* <a href="#volume">`volume`</a>

<!-- /div -->

<!-- div -->

## `regexp`
* <a href="#reAnd">`reAnd`</a>
* <a href="#reAndMatch">`reAndMatch`</a>
* <a href="#reGet">`reGet`</a>
* <a href="#reMatch">`reMatch`</a>
* <a href="#reNotMatch">`reNotMatch`</a>
* <a href="#reOr">`reOr`</a>
* <a href="#reOrMatch">`reOrMatch`</a>
* <a href="#reWrap">`reWrap`</a>

<!-- /div -->

<!-- div -->

## `signature`
* <a href="#inRange">`inRange`</a>
* <a href="#isDouble">`isDouble`</a>
* <a href="#isInteger">`isInteger`</a>
* <a href="#isNegative">`isNegative`</a>
* <a href="#isPositive">`isPositive`</a>
* <a href="#isZero">`isZero`</a>
* <a href="#nonNegative">`nonNegative`</a>
* <a href="#nonPositive">`nonPositive`</a>
* <a href="#nonZero">`nonZero`</a>
* <a href="#sameSig">`sameSig`</a>

<!-- /div -->

<!-- div -->

## `statistics`
* <a href="#expGRate">`expGRate`</a>
* <a href="#expVal">`expVal`</a>
* <a href="#mean">`mean`</a>
* <a href="#stdev">`stdev`</a>
* <a href="#trailExpGRate">`trailExpGRate`</a>
* <a href="#variance">`variance`</a>

<!-- /div -->

<!-- div -->

## `timing`
* <a href="#tick">`tick`</a>
* <a href="#tock">`tock`</a>

<!-- /div -->

<!-- div -->

## `transformation`
* <a href="#batchIndexOf">`batchIndexOf`</a>
* <a href="#cbind">`cbind`</a>
* <a href="#cbindByField">`cbindByField`</a>
* <a href="#extend">`extend`</a>
* <a href="#flattenJSON">`flattenJSON`</a>
* <a href="#matMultiply">`matMultiply`</a>
* <a href="#rbind">`rbind`</a>
* <a href="#rectangularize">`rectangularize`</a>
* <a href="#reshape">`reshape`</a>
* <a href="#reverse">`reverse`</a>
* <a href="#swap">`swap`</a>
* <a href="#trace">`trace`</a>
* <a href="#transpose">`transpose`</a>
* <a href="#validInds">`validInds`</a>

<!-- /div -->

<!-- div -->

## `trend`
* <a href="#decreasing">`decreasing`</a>
* <a href="#increasing">`increasing`</a>
* <a href="#nonDecreasing">`nonDecreasing`</a>
* <a href="#nonIncreasing">`nonIncreasing`</a>
* <a href="#stairs">`stairs`</a>
* <a href="#stairsTrend">`stairsTrend`</a>

<!-- /div -->

<!-- div -->

## `vector`
* <a href="#dot">`dot`</a>
* <a href="#norm">`norm`</a>
* <a href="#normalize">`normalize`</a>
* <a href="#powSum">`powSum`</a>
* <a href="#rescale">`rescale`</a>

<!-- /div -->

<!-- div -->

## `Methods`
* <a href="#histogram">`histogram`</a>

<!-- /div -->

<!-- div -->

## `Properties`

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“basics” Methods`

<!-- div -->

### <a id="add"></a>`add([...X])`
<a href="#add">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L332 "View in source") [&#x24C9;][1]

Adds tensors using `_.assodist`.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.add(1, 2, 3)
// → 6

_.add(1, [1, 2, 3])
// → [2, 3, 4]

_.add(1, [[1, 2], [3, 4]])
// → [[2, 3], [4, 5]]

_.add([10, 20], [[1, 2], [3, 4]])
// → [[11, 12], [23, 24]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="c"></a>`c([...X])`
<a href="#c">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L244 "View in source") [&#x24C9;][1]

Concatenates all arguments into single vector by `_.flattenDeep`.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(vector)*:  A vector with the scalars from all tensors.

#### Example
```js
_.c('a', 'b', 'c')
// → ['a', 'b', 'c']

_.c(1, ['a', 'b', 'c'], 2)
// → [1, 'a', 'b', 'c', 2]

_.c([[1, 2], [3, 4])
// → [1, 2, 3, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="divide"></a>`divide([...X])`
<a href="#divide">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L413 "View in source") [&#x24C9;][1]

Divides tensors using `_.assodist`.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.divide(3, 2, 1)
// → 1.5

_.divide([1, 2, 3], 2)
// → [0.5, 1, 1.5]

_.divide([[1, 2], [3, 4]], 2)
// → [[0.5, 1], [1.5, 2]]

_.divide([[1, 2], [3, 4]], [1, 2])
// → [[1, 2], [1.5, 2]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="log"></a>`log(T, [n=e])`
<a href="#log">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L432 "View in source") [&#x24C9;][1]

Takes the log of tensor T to base n (defaulted to e) element-wise using `_.distribute`.

#### Arguments
1. `T` *(tensor)*: A tensor.
2. `[n=e]` *(number)*: The optional base; defaulted to e.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.log([1, Math.E])
// → [0, 1]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="logistic"></a>`logistic(T)`
<a href="#logistic">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L493 "View in source") [&#x24C9;][1]

Applies the logistic (sigmoid) function to tensor T element-wise.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.logistic([-10, 0, 10])
// → [ 0.00004539786870243441, 0.5, 0.9999546021312976 ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="multiply"></a>`multiply([...X])`
<a href="#multiply">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L386 "View in source") [&#x24C9;][1]

Multiplies tensors using `_.assodist`.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.multiply(1, 2, 3)
// → 6

_.multiply(1, [1, 2, 3])
// → [1, 2, 3]

_.multiply(1, [[1, 2], [3, 4]])
// → [[1, 2], [3, 4]]

_.multiply([10, 20], [[1, 2], [3, 4]])
// → [[10, 20], [60, 80]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="prod"></a>`prod([...X])`
<a href="#prod">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L301 "View in source") [&#x24C9;][1]

Multiplies together all scalars in all argument tensors.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(scalar)*:  A product scalar from all scalars in the tensors.

#### Example
```js
_.prod(1, 2, 3)
// → 6

_.prod([1, 2, 3])
// → 6

_.prod(1, [1, 2, 3], [[1, 2], [3, 4]])
// → 144
```
* * *

<!-- /div -->

<!-- div -->

### <a id="root"></a>`root(T, [n=2])`
<a href="#root">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L475 "View in source") [&#x24C9;][1]

Takes the n-th root (defaulted to 2) of tensor T element-wise using `_.distribute`.

#### Arguments
1. `T` *(tensor)*: A tensor.
2. `[n=2]` *(number)*: The optional base; defaulted to `2` for squareroot.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.root([1, 4])
// → [1, 2]

_.root([-1, -8], 3)
// → [-1, -2]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="square"></a>`square(T)`
<a href="#square">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L450 "View in source") [&#x24C9;][1]

Squares a tensor element-wise using `_.distributeSingle`.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.square([1, 2])
// → [1, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="subtract"></a>`subtract([...X])`
<a href="#subtract">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L359 "View in source") [&#x24C9;][1]

Subtracts tensors using `_.assodist`.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(tensor)*:  A tensor.

#### Example
```js
_.subtract(1, 2, 3)
// → -5

_.subtract(1, [1, 2, 3])
// → [0, -1, -2]

_.subtract(1, [[1, 2], [3, 4]])
// → [[0, -1], [-2, -3]]

_.subtract([10, 20], [[1, 2], [3, 4]])
// → [[9, 8], [17, 16]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="sum"></a>`sum([...X])`
<a href="#sum">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L269 "View in source") [&#x24C9;][1]

Sums all scalars in all argument tensors.

#### Arguments
1. `[...X]` *(...tensors)*: tensors.

#### Returns
*(scalar)*:  A scalar summed from all scalars in the tensors.

#### Example
```js
_.sum('a', 'b', 'c')
// → 'abc'

_.sum(0, [1, 2, 3], [[1, 2], [3, 4])
// → 16
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“combinatorics” Methods`

<!-- div -->

### <a id="combList"></a>`combList(n, r)`
<a href="#combList">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1685 "View in source") [&#x24C9;][1]

Generates the indices of n-choose-r. Calls `_.subset` internally, chooses the array with string length r, and converts to numbers.

#### Arguments
1. `n` *(number)*: The number of items to choose.
2. `r` *(number)*: The number of items chosen.

#### Returns
*(Array)*:  T The array of index arrays specifying the subset indices.

#### Example
```js
_.combList(3, 2)
// → [ [ 0, 1 ], [ 0, 2 ], [ 1, 2 ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="combination"></a>`combination(n, r)`
<a href="#combination">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1789 "View in source") [&#x24C9;][1]

Returns n-choose-r.

#### Arguments
1. `n` *(number)*: The integer.
2. `r` *(number)*: The integer.

#### Returns
*(number)*:  nCr

#### Example
```js
_.combination(1000, 1)
// → 1000

_.combination(1000, 1000) // No integer overflow; uses symmetry.
// → 1

_.combination(1000, 500) // Inevitable overflow.
// → NaN
```
* * *

<!-- /div -->

<!-- div -->

### <a id="factorial"></a>`factorial(n)`
<a href="#factorial">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1735 "View in source") [&#x24C9;][1]

Returns n!.

#### Arguments
1. `n` *(number)*: The integer.

#### Returns
*(number)*:  n!

#### Example
```js
_.factorial(5)
// → 120
```
* * *

<!-- /div -->

<!-- div -->

### <a id="genAry"></a>`genAry(length, N)`
<a href="#genAry">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1560 "View in source") [&#x24C9;][1]

Generates all the strings of N-nary numbers up to length.

#### Arguments
1. `length` *(number)*: The length of the N-nary numbers.
2. `N` *(number)*: The number base.

#### Returns
*(Array)*:  T The array of strings of the N-nary numbers.

#### Example
```js
_.genAry(3, 2) // binary, length 3
// → ['000', '001', '010', '011', '100', '101', '110', '111']

_.genAry(2, 3) // ternary, length 2
// → ['00', '01', '02', '10', '11', '12', '20', '21', '22']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="pSubset"></a>`pSubset(n)`
<a href="#pSubset">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1607 "View in source") [&#x24C9;][1]

Generates all the permutation subset indices of n items.

#### Arguments
1. `n` *(number)*: The number of items to permute.

#### Returns
*(Array)*:  T The array of strings of length n, specifying the permutation indices.

#### Example
```js
_.pSubset(3)
// → [
// ['0', '1', '2'],
// ['01', '02', '10', '12', '20', '21'],
// ['012', '021', '102', '120', '201', '210']
// ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="permList"></a>`permList(n, r)`
<a href="#permList">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1669 "View in source") [&#x24C9;][1]

Generates the indices of n-permute-r. Calls `_.pSubset` internally, chooses the array with string length r, and converts to numbers.

#### Arguments
1. `n` *(number)*: The number of items to permute.
2. `r` *(number)*: The number of items chosen.

#### Returns
*(Array)*:  T The array of index arrays specifying the permutation indices.

#### Example
```js
_.permList(3, 2)
// → [ [ 0, 1 ], [ 0, 2 ], [ 1, 0 ], [ 1, 2 ], [ 2, 0 ], [ 2, 1 ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="permutation"></a>`permutation(n, r)`
<a href="#permutation">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1760 "View in source") [&#x24C9;][1]

Returns n-permute-r.

#### Arguments
1. `n` *(number)*: The integer.
2. `r` *(number)*: The integer.

#### Returns
*(number)*:  nPr

#### Example
```js
_.permutation(5, 5)
// → 120

_.permutation(1000, 1)
// → 1000
```
* * *

<!-- /div -->

<!-- div -->

### <a id="permute"></a>`permute(n)`
<a href="#permute">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1707 "View in source") [&#x24C9;][1]

Generates the permutation indices of n items in lexicographical order.

#### Arguments
1. `n` *(number)*: The number of items to permute.

#### Returns
*(Array)*:  T The array of index arrays specifying the permutation indices.

#### Example
```js
_.permute(3)
// → [
// [ 0, 1, 2 ],
// [ 0, 2, 1 ],
// [ 1, 0, 2 ],
// [ 1, 2, 0 ],
// [ 2, 0, 1 ],
// [ 2, 1, 0 ]
// ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="subset"></a>`subset(n)`
<a href="#subset">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1640 "View in source") [&#x24C9;][1]

Generates all the (combination) subset indices of n items.

#### Arguments
1. `n` *(number)*: The number of items to choose.

#### Returns
*(Array)*:  T The array of strings of length n, specifying the subset indices.

#### Example
```js
_.subset(3)
// → [
// ['0', '1', '2'],
// ['01', '02', '12'],
// ['012']
// ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="toNumArr"></a>`toNumArr(strings)`
<a href="#toNumArr">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1584 "View in source") [&#x24C9;][1]

Converts an array of strings to array of array of numbers.
Used with `_.genAry` and related number/subset-generating functions.

#### Arguments
1. `strings` *(Array)*: The strings of numbers to convert into arrays.

#### Returns
*(Array)*:  T The array of array of numbers from the strings.

#### Example
```js
_.toNumArr(['00', '01', '10', '11']) // binary, length 2
// → [[0, 0], [0, 1], [1, 0], [1, 1]]
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“composition” Methods`

<!-- div -->

### <a id="asso"></a>`asso(fn, [...x])`
<a href="#asso">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L185 "View in source") [&#x24C9;][1]

Generic association: take the arguments object or array and apply atomic function (with scalar arguments) from left to right.

#### Arguments
1. `fn` *(Function)*: An atomic binary function *(both arguments must be scalars)*.
2. `[...x]` *(...number)*: Scalars; can be grouped in a single array.

#### Returns
*(number)*:  A scalar from the function applied to all arguments in order.

#### Example
```js
_.asso(_.op, 'a', 'b', 'c')
// where _.op is used to show the order of composition
// → 'a*b*c'

_.asso(_.op, ['a', 'b', 'c'])
// → 'a*b*c'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="assodist"></a>`assodist(fn, [...X])`
<a href="#assodist">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L217 "View in source") [&#x24C9;][1]

Generic association with distributivity: Similar to `_.asso` but is for tensor functions; apply atomic fn distributively in order using `_.distribute`.
Usage: for applying fn on tensors element-wise if they have compatible dimensions.

#### Arguments
1. `fn` *(Function)*: An atomic binary function *(both arguments must be scalars)*.
2. `[...X]` *(...tensors)*: tensors.

#### Returns
*(tensor)*:  A tensor from the function applied to all arguments in order.

#### Example
```js
_.assodist(_.op, 'a', 'b', 'c')
// where _.op is used to show the order of composition
// → 'a*b*c'

_.assodist(_.op, 'a', [1, 2, 3], 'b')
// → ['a*1*b', 'a*2*b', 'a*3*b']

_.assodist(_.op, 'a', [[1, 2], [3, 4]])
// → [['a*1', 'a*2'], ['a*3', 'a*4']]

_.assodist(_.op, ['a', 'b'], [[1, 2], [3, 4]])
// → [['a*1', 'a*2'], ['b*3', 'b*4']]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="distribute"></a>`distribute(fn, X, Y)`
<a href="#distribute">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L160 "View in source") [&#x24C9;][1]

Generic Distribution: Distribute fn between left tensor X and right tensor Y, while preserving the argument-ordering (vital for non-commutative functions).
Pairs up the tensors term-wise while descending down the depths recursively using `_.distributeBoth`, until finding a scalar to `_.distributeLeft/Right`.

#### Arguments
1. `fn` *(Function)*: A binary function.
2. `X` *(tensor)*: A tensor.
3. `Y` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  A tensor from the function applied element-wise between X and Y.

#### Example
```js
_.distribute(_.op, 'a', [1, 2, 3])
// where _.op is used to show the order of composition
// → ['a*1', 'a*2', 'a*3']

_.distribute(_.op, 'a', [[1, 2], [3, 4])
// → [ [ 'a*1', 'a*2' ], [ 'a*3', 'a*4' ] ]

_.distribute(_.op, ['a', 'b', 'c'], [1, 2, 3])
// → [ 'a*1', 'b*2', 'c*3' ]

_.distribute(_.op, ['a', 'b', 'c'], [1, 2, 3, 4, 5, 6])
// → [ 'a*1', 'b*2', 'c*3' , 'a*4', 'b*5', 'c*6']

_.distribute(_.op, ['a', 'b', 'c'], [[1, 2], [3, 4], [5, 6]])
// → [ [ 'a*1', 'a*2' ], [ 'b*3', 'b*4' ], [ 'c*5', 'c*6' ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="distributeBoth"></a>`distributeBoth(fn, X, Y)`
<a href="#distributeBoth">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L117 "View in source") [&#x24C9;][1]

Distributes a binary function between non-scalar tensors X, Y: pair them up term-wise and calling `_.distribute` recursively. Perserves the order of arguments.
If at any depth X and Y have different lengths, recycle if the mod of lengths is 0.

#### Arguments
1. `fn` *(Function)*: A binary function.
2. `X` *(tensor)*: A non-scalar tensor.
3. `Y` *(tensor)*: A non-scalar tensor.

#### Returns
*(tensor)*:  A tensor from the function applied element-wise between X and Y.

#### Example
```js
_.distributeBoth(_.op, ['a', 'b', 'c'], [1, 2, 3])
// where _.op is used to show the order of composition
// → [ 'a*1', 'b*2', 'c*3' ]

_.distributeBoth(_.op, ['a', 'b', 'c'], [1, 2, 3, 4, 5, 6])
// → [ 'a*1', 'b*2', 'c*3' , 'a*4', 'b*5', 'c*6']

_.distributeBoth(_.op, ['a', 'b', 'c'], [[1, 2], [3, 4], [5, 6]])
// → [ [ 'a*1', 'a*2' ], [ 'b*3', 'b*4' ], [ 'c*5', 'c*6' ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="distributeLeft"></a>`distributeLeft(fn, X, y)`
<a href="#distributeLeft">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L63 "View in source") [&#x24C9;][1]

Distributes a binary function with left tensor X over right scalar y. Preserves the order of arguments.

#### Arguments
1. `fn` *(Function)*: A binary function.
2. `X` *(tensor)*: A non-scalar tensor.
3. `y` *(number)*: A scalar.

#### Returns
*(tensor)*:  A tensor from the function applied element-wise between X and y.

#### Example
```js
_.distributeLeft(_.op([1, 2, 3, 4], 5))
// where _.op is used to show the order of composition
// → [ '1*5', '2*5', '3*5', '4*5' ]

_.distributeLeft(_.op, [[1, 2], [3, 4]], 5)
// → [ [ '1*5', '2*5' ], [ '3*5', '4*5' ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="distributeRight"></a>`distributeRight(fn, x, Y)`
<a href="#distributeRight">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L88 "View in source") [&#x24C9;][1]

Distributes a binary function with left scalar x over right tensor Y. Preserves the order of arguments.

#### Arguments
1. `fn` *(Function)*: A binary function.
2. `x` *(number)*: A scalar.
3. `Y` *(tensor)*: A non-scalar tensor.

#### Returns
*(tensor)*:  A tensor from the function applied element-wise between x and Y.

#### Example
```js
_.distributeRight(_.op, 5, [1, 2, 3, 4])
// where _.op is used to show the order of composition
// → [ '5*1', '5*2', '5*3', '5*4' ]

_.distributeRight(_.op, 5, [[1, 2], [3, 4]])
// → [ [ '5*1', '5*2' ], [ '5*3', '5*4' ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="distributeSingle"></a>`distributeSingle(fn, Y)`
<a href="#distributeSingle">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L37 "View in source") [&#x24C9;][1]

Distributes a unary function over every scalar in tensor Y.

#### Arguments
1. `fn` *(Function)*: A unary function.
2. `Y` *(tensor)*: A non-scalar tensor.

#### Returns
*(tensor)*:  A tensor from the function applied element-wise to Y.

#### Example
```js
_.distributeSingle(_.square, [1, 2, 3, 4])
// → [ 1, 4, 9, 16 ]

_.distributeSingle(_.square, [[1, 2], [3, 4]])
// → [ [ 1, 4 ], [ 9, 16 ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="op"></a>`op(x, y)`
<a href="#op">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L18 "View in source") [&#x24C9;][1]

Sample operation to demonstrate function composition.

#### Arguments
1. `x` *(&#42;)*: An argument.
2. `y` *(&#42;)*: An argument.

#### Example
```js
_.op('a', 'b')
// → 'a*b'
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“initialization” Methods`

<!-- div -->

### <a id="numeric"></a>`numeric(N, [val=0])`
<a href="#numeric">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1047 "View in source") [&#x24C9;][1]

Returns an initialized array of length N filled with the value (defaulted to 0). Reminiscent of `numeric()` of `R`.

#### Arguments
1. `N` *(number)*: The length of array.
2. `[val=0]` *(&#42;)*: The value to fill array with.

#### Returns
*(Array)*:  filled An array initialized to the value.

#### Example
```js
_.numeric(3)
// → [0, 0, 0]

_.numeric(3, 'a')
// → ['a', 'a', 'a']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="seq"></a>`seq([start=0], end, [step=1])`
<a href="#seq">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1017 "View in source") [&#x24C9;][1]

Returns a sequence of numbers from start to end, with interval. Similar to lodash's `_.range` but the default starts from 1; this is for `R` users who are familiar with `seq()`.

#### Arguments
1. `[start=0]` *(number)*: The start value.
2. `end` *(number)*: The end value.
3. `[step=1]` *(number)*: The interval step.

#### Returns
*(Array)*:  seq An array initialized to the sequence.

#### Example
```js
_.seq(3)
// → [1, 2, 3]

_.seq(2, 4)
// → [2, 3, 4]

_.seq(1, 9, 2)
[ 1, 3, 5, 7, 9 ]
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“native-Math” Methods`

<!-- div -->

### <a id="abs"></a>`abs(T)`
<a href="#abs">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L623 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

#### Example
```js
_.abs([-1, -2, -3])
// → [1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="acos"></a>`acos(T)`
<a href="#acos">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L632 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="acosh"></a>`acosh(T)`
<a href="#acosh">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L641 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="asin"></a>`asin(T)`
<a href="#asin">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L650 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="asinh"></a>`asinh(T)`
<a href="#asinh">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L659 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="atan"></a>`atan(T)`
<a href="#atan">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L668 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="atanh"></a>`atanh(T)`
<a href="#atanh">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L677 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="ceil"></a>`ceil(T)`
<a href="#ceil">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L686 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="cos"></a>`cos(T)`
<a href="#cos">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L695 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="cosh"></a>`cosh(T)`
<a href="#cosh">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L704 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="exp"></a>`exp(T)`
<a href="#exp">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L713 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="floor"></a>`floor(T)`
<a href="#floor">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L722 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="log10"></a>`log10(T)`
<a href="#log10">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L731 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="log1p"></a>`log1p(T)`
<a href="#log1p">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L740 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="log2"></a>`log2(T)`
<a href="#log2">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L749 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="pow"></a>`pow(T)`
<a href="#pow">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L767 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="round"></a>`round(T)`
<a href="#round">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L758 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="sign"></a>`sign(T)`
<a href="#sign">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L776 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="sin"></a>`sin(T)`
<a href="#sin">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L785 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="sinh"></a>`sinh(T)`
<a href="#sinh">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L794 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="sqrt"></a>`sqrt(T)`
<a href="#sqrt">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L803 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="tan"></a>`tan(T)`
<a href="#tan">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L812 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="tanh"></a>`tanh(T)`
<a href="#tanh">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L821 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- div -->

### <a id="trunc"></a>`trunc(T)`
<a href="#trunc">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L830 "View in source") [&#x24C9;][1]

Generalized JS Math applicable to tensor using function composition.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T A tensor.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“plotting” Methods`

<!-- div -->

### <a id="advPlot"></a>`advPlot(options)`
<a href="#advPlot">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2346 "View in source") [&#x24C9;][1]

Method of the constructed `hc` object.
Advanced plotting for users familiar with HighCharts (see http://www.highcharts.com).
This is a highcharts wrapper; takes in a complete HighCharts plot options object.

#### Arguments
1. `options` *(Object)*: The HighCharts options object.

#### Returns
*(Object)*:  options The options passed, for reference.

#### Example
```js
// Plots using the highcharts options
hc.advPlot({
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
// renders the plot
hc.render()
```
* * *

<!-- /div -->

<!-- div -->

### <a id="hc"></a>`hc()`
<a href="#hc">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2243 "View in source") [&#x24C9;][1]

The plotting module constructor.
Uses `HighCharts` to plot and `browserSync`. Pulls up browser directly showing your charts like magic!
To use this, go into `node_modules/lomath` and do `npm install` there to install the dev dependencies.

#### Returns
*(Object)*:  hc The plotting module of lomath.

#### Example
```js
// in the terminal at your project's root, do:
cd node_modules/lomath
npm install

// Go back to your project .js file
var _ = require('lomath');

var v = _.range(10);
var vv = _.square(v);

// Construct the plotting modules
var hc = _.hc();

// first, list all you wish to plot.
hc.plot(
       [{
           name: "linear",
           data: v
       }, {
           name: "square",
           data: vv
       }],
       "Title 1"
       )
hc.plot(
       [{
           name: "log",
           data: _.log(v)
       }],
       "Title 2"
       )

// Finally, the command to render all the plots above.
// Pulls up a browser (default to chrome for better support) with the charts.
// calling hc.render(true) will autosave all plots to your downloads folder.
hc.render();

// Magical, eh?
```
* * *

<!-- /div -->

<!-- div -->

### <a id="plot"></a>`plot(seriesArr, [title=""], [yLabel=""], [xLabel=""])`
<a href="#plot">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2284 "View in source") [&#x24C9;][1]

Method of the constructed `hc` object.
A simplified wrapper of the HighCharts plot options object.
Allows one to use simple data plot by specifying data sets in objects consisting of data name and data.
The data specified can be array of y-values, or array of x-y values.

#### Arguments
1. `seriesArr` *(Array)*: The array of data series, i.e. the series objects in the HighCharts options.
2. `[title=""]` *(string)*: The title of this plot.
3. `[yLabel=""]` *(string)*: The y-axis label.
4. `[xLabel=""]` *(string)*: The x-axis label.

#### Returns
*(Object)*:  options The options passed, for reference.

#### Example
```js
// Plots two data sets using y-values (x-values start from 0).
hc.plot(
       [{
           name: "linear",
           data: [1, 2, 3, 4, 5, 6]
       }, {
           name: "square",
           data: [1, 4, 9, 16, 25, 36]
       }],
       "Title 1"
       )

// Plots a data set using x-y values.
hc.plot(
       [{
           name: "square",
           data: [[3, 9], [4, 16], [5, 25], [6, 36]]
       }],
       "Title 2"
       )
// renders the plot
hc.render()
```
* * *

<!-- /div -->

<!-- div -->

### <a id="render"></a>`render([autosave])`
<a href="#render">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2366 "View in source") [&#x24C9;][1]

Method of the constructed `hc` object.
Renders the plots: Launches a browser with all the plots listed before this line. Uses a gulp task and browserSync.
Pass argument `true` will auto save all the plots to downloads.

#### Arguments
1. `[autosave]` *(boolean)*: If true, will autosave all the plots to downloads.

#### Returns
*(&#42;)*:  browser Pulls up a browser.

#### Example
```js
hc.plot(...)
// renders the plot in a browser
hc.render()

// hc.render(true) will autosave all plots.
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“properties” Methods`

<!-- div -->

### <a id="depth"></a>`depth(T)`
<a href="#depth">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1071 "View in source") [&#x24C9;][1]

Returns the depth of an (nested) array, i.e. the rank of a tensor.
Scalar = rank-0, vector = rank-1, matrix = rank-2, ... so on.
Note that a tensor has homogenous depth, that is, there cannot tensors of different ranks in the same vector, e.g. [1, [2,3], 4] is prohibited.

#### Arguments
1. `T` *(tensor)*: The tensor.

#### Returns
*(number)*:  depth The depth of the array.

#### Example
```js
_.depth(0)
// → 0

_.depth([1, 2, 3])
// → 1

_.depth([[1, 2], [3, 4]])
// → 2
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dim"></a>`dim(T)`
<a href="#dim">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1128 "View in source") [&#x24C9;][1]

Returns the "dimension" of a tensor.
Note that a tensor has homogenous depth, that is, there cannot tensors of different ranks in the same vector, e.g. [1, [2,3], 4] is prohibited.

#### Arguments
1. `T` *(tensor)*: The tensor.

#### Returns
*(Array)*:  dim The dimension the tensor.

#### Example
```js
_.dim(0)
// → []

_.dim([1, 2, 3])
// → [3]

_.dim([[1, 2, 3], [4, 5, 6]])
// → [2, 3]

_.dim([
     [[1,1,1,1],[2,2,2,2],[3,3,3,3]],
     [[4,4,4,4],[5,5,5,5],[6,6,6,6]]
   ])
// → [2, 3, 4]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="isFlat"></a>`isFlat(T)`
<a href="#isFlat">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1155 "View in source") [&#x24C9;][1]

Checks if a tensor is "flat", i.e. all entries are scalars.

#### Arguments
1. `T` *(tensor)*: The tensor.

#### Returns
*(boolean)*:  true If tensor is flat.

#### Example
```js
_.isFlat(0)
// → true

_.isFlat([1, 2, 3])
// → true

_.isFlat([[1, 2], [3, 4]])
// → false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="maxDeepestLength"></a>`maxDeepestLength(T)`
<a href="#maxDeepestLength">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1183 "View in source") [&#x24C9;][1]

Returns the maximum length of the deepest array in (non-scalar) tensor T.
Useful for probing the data structure and ensuring tensor is rectangular.

#### Arguments
1. `T` *(tensor)*: The tensor.

#### Returns
*(number)*:  length The maximum length of the deepest array in T.

#### Example
```js
_.maxDeepestLength(0)
// → 0

_.maxDeepestLength([1, 2, 3])
// → 3

_.maxDeepestLength([[1, 2], [3, 4]])
// → 2
```
* * *

<!-- /div -->

<!-- div -->

### <a id="volume"></a>`volume(T)`
<a href="#volume">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1099 "View in source") [&#x24C9;][1]

Returns the "volume" of a tensor, i.e. the totaly number of scalars in it.

#### Arguments
1. `T` *(tensor)*: The tensor.

#### Returns
*(number)*:  volume The number of scalar entries in the tensor.

#### Example
```js
_.volume(0)
// → 0

_.volume([1, 2, 3])
// → 3

_.volume([[1, 2], [3, 4]])
// → 4
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“regexp” Methods`

<!-- div -->

### <a id="reAnd"></a>`reAnd(regexs)`
<a href="#reAnd">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L936 "View in source") [&#x24C9;][1]

Returns a single regex as the "AND" conjunction of all input regexs. This picks up as MANY adjacent substrings that satisfy all the regexs in order.

#### Arguments
1. `regexs` *(...RegExp)*: All the regexs to conjunct together.

#### Returns
*(RegExp)*:  regex The conjuncted regex of the form `(?:re1)...(?:reN)`

#### Example
```js
var reg1 = _.reAnd('foo', /\d+/)
// → /(?:foo)(?:\d+)/
_.reGet(reg1)('Mayfoo1995')
// → 'foo1995'

var reg2 = _.reAnd(/\d+/, 'foo') // order matters here
// → /(?:\d+)(?:foo)/
_.reGet(reg2)('Mayfoo1995')
// → null
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reAndMatch"></a>`reAndMatch(regexs)`
<a href="#reAndMatch">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L954 "View in source") [&#x24C9;][1]

Returns a boolean function that matches all the regexs conjuncted in the specified order.

#### Arguments
1. `regexs` *(...RegExp)*: All the regexs to conjunct together.

#### Returns
*(Function)*:  fn A boolean function used for matching the conjuncted regexs.

#### Example
```js
_.reAndMatch('foo', /\d+/)('Mayfoo1995')
// → true

_.reAndMatch(/\d+/, 'foo')('Mayfoo1995') // order matters
// → false
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reGet"></a>`reGet(regex)`
<a href="#reGet">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L896 "View in source") [&#x24C9;][1]

Returns a function that returns the first string portion matching the regex.

#### Arguments
1. `regex` *(RegExp)*: A RegExp to match.

#### Returns
*(Function)*:  fn A function that returns the string matching the regex.

#### Example
```js
var getBar = _.reGet('bar') // using a string
getBar('foobarbaz')
// → 'bar'

var getNum = _.reGet(/\d+/) // using a regex
getNum('May 1995')
// → '1995'
getNum('May')
// → null
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reMatch"></a>`reMatch(regex)`
<a href="#reMatch">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L850 "View in source") [&#x24C9;][1]

Returns a boolean function that matches the regex.

#### Arguments
1. `regex` *(RegExp)*: A RegExp.

#### Returns
*(Function)*:  fn A boolean function used for matching the regex.

#### Example
```js
var matcher1 = _.reMatch('foo') // using a string
matcher1('foobarbaz')
// → true

var matcher2 = _.reMatch(/\d+/) // using a regexp
matcher2('May 1995')
// → true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reNotMatch"></a>`reNotMatch(regex)`
<a href="#reNotMatch">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L872 "View in source") [&#x24C9;][1]

Returns a boolean function that dis-matches the regex.

#### Arguments
1. `regex` *(RegExp)*: A RegExp to NOT match.

#### Returns
*(Function)*:  fn A boolean function used for dis-matching the regex.

#### Example
```js
var matcher1 = _.reNotMatch('foo') // using a string
matcher1('barbaz')
// → true

var matcher2 = _.reNotMatch(/\d+/) // using a regexp
matcher2('foobar')
// → true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reOr"></a>`reOr(regexs)`
<a href="#reOr">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L975 "View in source") [&#x24C9;][1]

Returns a single regex as the "OR" union of all input regexs. This picks up the FIRST substring that satisfies any of the regexs in any order.

#### Arguments
1. `regexs` *(...RegExp)*: All the regexs to union together.

#### Returns
*(RegExp)*:  regex The unioned regex of the form `(?:re1)|...|(?:reN)`

#### Example
```js
var reg1 = _.reOr('foo', /\d+/)
// → /(?:foo)|(?:\d+)/
_.reGet(reg1)('Mayfoo1995')
// → 'foo'

var reg2 = _.reOr(/\d+/, 'foo') // order doesn't matter here
// → /(?:\d+)|(?:foo)/
_.reGet(reg2)('Mayfoo1995')
// → 'foo'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reOrMatch"></a>`reOrMatch(regexs)`
<a href="#reOrMatch">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L993 "View in source") [&#x24C9;][1]

Returns a boolean function that matches any of the regexs in any order.

#### Arguments
1. `regexs` *(...RegExp)*: All the regexs to try to match.

#### Returns
*(Function)*:  fn A boolean function used for matching the regexs.

#### Example
```js
_.reOrMatch('foo', /\d+/)('Mayfoo1995')
// → true

_.reOrMatch(\d+/, 'foo')('Mayfoo1995') // order doesn't matter
// → true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reWrap"></a>`reWrap(regex)`
<a href="#reWrap">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L915 "View in source") [&#x24C9;][1]

Wraps a regex into string for regex set operation.

#### Arguments
1. `regex` *(RegExp)*: A RegExp to wrap.

#### Returns
*(string)*:  wrapped The regex wrapped into the form `(?:regex)`

#### Example
```js
_.reWrap('foo')
// → '(?:foo)'
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“signature” Methods`

<!-- div -->

### <a id="inRange"></a>`inRange(left, right, x)`
<a href="#inRange">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L514 "View in source") [&#x24C9;][1]

Checks if `x` is in range, i.e. `left ≤ x ≤ right`.

#### Arguments
1. `left` *(number)*: The lower bound.
2. `right` *(number)*: The upper bound.
3. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If `x` is in range.

#### Example
```js
_.inRange(0, 3, 3)
// → true

_.inRange.bind(null, 0, 3)(3)
// → true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="isDouble"></a>`isDouble(x)`
<a href="#isDouble">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L534 "View in source") [&#x24C9;][1]

Checks if `x` is a double-precision number/non-Integer.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="isInteger"></a>`isInteger(x)`
<a href="#isInteger">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L524 "View in source") [&#x24C9;][1]

Checks if `x` is an integer.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="isNegative"></a>`isNegative(x)`
<a href="#isNegative">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L564 "View in source") [&#x24C9;][1]

Checks if `x < 0`.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="isPositive"></a>`isPositive(x)`
<a href="#isPositive">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L544 "View in source") [&#x24C9;][1]

Checks if `x > 0`.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="isZero"></a>`isZero(x)`
<a href="#isZero">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L594 "View in source") [&#x24C9;][1]

Checks if `x == 0`.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="nonNegative"></a>`nonNegative(x)`
<a href="#nonNegative">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L574 "View in source") [&#x24C9;][1]

Checks if `x ≥ 0`.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="nonPositive"></a>`nonPositive(x)`
<a href="#nonPositive">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L554 "View in source") [&#x24C9;][1]

Checks if `x ≤ 0`.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="nonZero"></a>`nonZero(x)`
<a href="#nonZero">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L584 "View in source") [&#x24C9;][1]

Checks if `x != 0`.

#### Arguments
1. `x` *(number)*: The value to check.

#### Returns
*(boolean)*:  true If so.

* * *

<!-- /div -->

<!-- div -->

### <a id="sameSig"></a>`sameSig(T, sigFn)`
<a href="#sameSig">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L610 "View in source") [&#x24C9;][1]

Checks if signature function is true for all scalars of a tensor.

#### Arguments
1. `T` *(tensor)*: The tensor whose values to check.
2. `sigFn` *(Function)*: The signature function.

#### Returns
*(boolean)*:  true If all scalars of the tensor return true.

#### Example
```js
_.sameSig([1, 2, 3], _.isPositive)
// → true
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“statistics” Methods`

<!-- div -->

### <a id="expGRate"></a>`expGRate(m_f, m_i, t)`
<a href="#expGRate">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2168 "View in source") [&#x24C9;][1]

Returns the rate of return r in % of an exponential growth, given final value m_f, initial value m_i, and time interval t.
Formula: `100 * (Math.exp(Math.log(m_f / m_i) / t) - 1)`

#### Arguments
1. `m_f` *(number)*: The final value.
2. `m_i` *(number)*: The initial value.
3. `t` *(number)*: The time interval between m_f, m_i.

#### Returns
*(number)*:  r The growth rate in %.

#### Example
```js
_.expGRate(8, 2, 2) // 100% growth rate over 2 years
// → 100
```
* * *

<!-- /div -->

<!-- div -->

### <a id="expVal"></a>`expVal(X, [P], [fn])`
<a href="#expVal">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2013 "View in source") [&#x24C9;][1]

Returns the expectation value `E(fn(X))` of a random variable vector, optionally with the corresponding probability vector, using the random variable function (defaulted to identity).

#### Arguments
1. `X` *(Array)*: The random variable vector.
2. `[P]` *(Array)*: The corresponding probability vector.
3. `[fn]` *(Function)*: The random variable function.

#### Returns
*(number)*:  E(fn(X))

#### Example
```js
var X = [-1, 0, 1, 2]
var Y = [-1,0,0,1,1,1,2,2,2,2]
var P = [0.1, 0.2, 0.3, 0.4]

_.expVal(Y) // using a raw data array, E(X)
// → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)
_.expVal(X, P) // equivalent to Y, but using X and P: E(X)
// → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)

_.expVal(Y, _.square) // using raw data array, E(X^2)
// → (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4)
_.expVal(X, P, _.square) // equivalent to Y, but using X and P: E(X^2)
// → (1 * 0.1 + 0 + 1 * 0.3 + 4 * 0.4)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="mean"></a>`mean(T)`
<a href="#mean">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1985 "View in source") [&#x24C9;][1]

Returns the mean/average of a tensor.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(number)*:  mean

#### Example
```js
_.mean([1, 2, 3])
// → 2

_.mean([[1, 2], [3, 4]])
// → 5
```
* * *

<!-- /div -->

<!-- div -->

### <a id="stdev"></a>`stdev(X, [P], [fn])`
<a href="#stdev">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2099 "View in source") [&#x24C9;][1]

Returns the standard deviation `sigma(fn(X))` of a random variable vector, with the corresponding probability vector, using the random variable function (defaulted to identity).
Simply calles `_.variance` internally and returns its square root.

#### Arguments
1. `X` *(Array)*: The corresponding random variable vector.
2. `[P]` *(Array)*: The corresponding probability vector.
3. `[fn]` *(Function)*: The random variable function.

#### Returns
*(number)*:  sigma(fn(X))

#### Example
```js
var X = [-1, 0, 1, 2]
var Y = [-1,0,0,1,1,1,2,2,2,2]
var P = [0.1, 0.2, 0.3, 0.4]

_.stdev(Y) // using a raw data array, sigma(X)
// → 1
_.stdev(X, P) // equivalent to Y, but using X and P: sigma(X)
// → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)

_.stdev(Y, _.square) // using raw data array, sigma(X^2)
// → 1.673
_.stdev(X, P, _.square) // equivalent to Y, but using X and P: sigma(X^2)
// → 1.673
```
* * *

<!-- /div -->

<!-- div -->

### <a id="trailExpGRate"></a>`trailExpGRate(v, t)`
<a href="#trailExpGRate">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2191 "View in source") [&#x24C9;][1]

Returns the trailing exponential rate of return in the last t years given a vector. Calls `_.expGRate` internally.

#### Arguments
1. `v` *(Array)*: The time series vector.
2. `t` *(number)*: The time interval.

#### Returns
*(number)*:  r The growth rate in %.

#### Example
```js
var v = [1, 2, 4, 8]
_.trailExpGRate(v, 1)
// → 100

_.trailExpGRate(v, 2)
// → 100

_.trailExpGRate(v, 3)
// → 100
```
* * *

<!-- /div -->

<!-- div -->

### <a id="variance"></a>`variance(X, [P], [fn])`
<a href="#variance">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2060 "View in source") [&#x24C9;][1]

Returns the variance `Var(fn(X))` of a random variable vector, with the corresponding probability vector, using the random variable function (defaulted to identity).

#### Arguments
1. `X` *(Array)*: The random variable vector.
2. `[P]` *(Array)*: The corresponding probability vector.
3. `[fn]` *(Function)*: The random variable function.

#### Returns
*(number)*:  Var(fn(X))

#### Example
```js
var X = [-1, 0, 1, 2]
var Y = [-1,0,0,1,1,1,2,2,2,2]
var P = [0.1, 0.2, 0.3, 0.4]

_.variance(Y) // using a raw data array, Var(X)
// → 1
_.variance(X, P) // equivalent to Y, but using X and P: Var(X)
// → ((-1) * 0.1 + 0 + 1 * 0.3 + 2 * 0.4)

_.variance(Y, _.square) // using raw data array, Var(X^2)
// → 2.8
_.variance(X, P, _.square) // equivalent to Y, but using X and P: Var(X^2)
// → 2.8
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“timing” Methods`

<!-- div -->

### <a id="tick"></a>`tick()`
<a href="#tick">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2378 "View in source") [&#x24C9;][1]

Starts a timer (unique to the whole _ object). Needs to be called before tock. If called again, will restart the timer.

#### Returns
*(number)*:  ms Result from _.now(), in milliseconds.

* * *

<!-- /div -->

<!-- div -->

### <a id="tock"></a>`tock()`
<a href="#tock">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2394 "View in source") [&#x24C9;][1]

Ends a started timer (unique to the whole _ object). Needs to be called after tick. If called again, will give the next lap (starting from the last tick).

#### Returns
*(number)*:  ms Difference between now and the last _.tick() in milliseconds.

#### Example
```js
_.tick()
// ... run some functions here, use promise for better flow control.
someTaskwithPromise().then(tock())
// → Returns some time elapsed in ms.
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“transformation” Methods`

<!-- div -->

### <a id="batchIndexOf"></a>`batchIndexOf(T, fields)`
<a href="#batchIndexOf">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1292 "View in source") [&#x24C9;][1]

Searches the array in batch by applying `_.indexOf` in batch; returns the indices of the results in order.
Useful for grabbing the headers in a data set.

#### Arguments
1. `T` *(Array)*: The array.
2. `fields` *(Array)*: The array of fields to search for in T.

#### Returns
*(Array)*:  inds The indices returned by applying `_.indexOf` to fields.

#### Example
```js
_.batchIndexOf(['a','b','c','d','e','f'], [1, 'b', 'a', 'a'])
// → [-1, 1, 0, 0]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="cbind"></a>`cbind(M, indArr)`
<a href="#cbind">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1354 "View in source") [&#x24C9;][1]

Returns a new matrix with the selected columns from a matrix. Same as `cbind()` from `R`.
Useful for picking columns from a data matrix/tensor with specified header indices.

#### Arguments
1. `M` *(tensor)*: The original matrix.
2. `indArr` *(Array)*: The array of indices specifying the columns of M to pick.

#### Returns
*(tensor)*:  M' The matrix with the selected columns from the indices.

#### Example
```js
_.cbind([['a','b','c'],[1,2,3],[-1,-2,-3]], [1, 1, 2])
// → [ [ 'b', 'b', 'c' ], [ 2, 2, 3 ], [ -2, -2, -3 ] ]

var M = [['a','b','c'],[1,2,3],[-1,-2,-3]]; // using on a dataset
var titles = M[0];
_.cbind(M, _.batchIndexOf(titles, ['b', 'b', 'c']))
// → [ [ 'b', 'b', 'c' ], [ 2, 2, 3 ], [ -2, -2, -3 ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="cbindByField"></a>`cbindByField(M, fields)`
<a href="#cbindByField">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1378 "View in source") [&#x24C9;][1]

Returns a new matrix with the selected columns from a matrix. Short for `_.cbind(M, _.batchIndexOf())`
Useful for picking columns from a data matrix by directly specifying the header titles.

#### Arguments
1. `M` *(tensor)*: The original matrix.
2. `fields` *(Array)*: The array of fields of the columns of M to pick.

#### Returns
*(tensor)*:  M' The matrix with the selected columns from the fields.

#### Example
```js
var M = [['a','b','c'],[1,2,3],[-1,-2,-3]]; // using on a dataset
_.cbindByField(M, ['b', 'b', 'c'])
// → [ [ 'b', 'b', 'c' ], [ 2, 2, 3 ], [ -2, -2, -3 ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="extend"></a>`extend(T, toLen, [val=0])`
<a href="#extend">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1269 "View in source") [&#x24C9;][1]

Extends an array till `toLen` by prepending with `val`.
Mutates the array.

#### Arguments
1. `T` *(Array)*: The array.
2. `toLen` *(number)*: The new length of the array. Must be longer than T.length.
3. `[val=0]` *(number)*: The value to prepend with.

#### Returns
*(Array)*:  T The mutated array after extending.

#### Example
```js
_.extend([1, 2, 3], 6)
// → [1, 2, 3, 0, 0, 0]

_.extend([1, 2, 3], 6, 'a')
// → [1, 2, 3, 'a', 'a', 'a']
```
* * *

<!-- /div -->

<!-- div -->

### <a id="flattenJSON"></a>`flattenJSON(obj)`
<a href="#flattenJSON">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1527 "View in source") [&#x24C9;][1]

Flattens a JSON object (removes nestedness) and serialize it for sending over HTTP formData.

#### Arguments
1. `obj` *(JSON)*: The original JSON object.

#### Returns
*(JSON)*:  flat_obj The flattened *(unnested)* object.

#### Example
```js
formData = {
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

_.flattenJSON(formData)
// → { 'update_id': 87654321,
// 'message[message_id]': 12345678,
// 'message[from][array]': [ 1, [ 2 ], 3 ],
// 'message[from][last_name]': 'kengz',
// 'message[chat][id]': 123454,
// 'message[chat][last_name]': 'lomath' }
// The deepest values are not flattened (not stringified)
```
* * *

<!-- /div -->

<!-- div -->

### <a id="matMultiply"></a>`matMultiply(A, B)`
<a href="#matMultiply">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1430 "View in source") [&#x24C9;][1]

Multiply two matrices.

#### Arguments
1. `A` *(tensor)*: The first matrix.
2. `B` *(tensor)*: The second matrix.

#### Returns
*(tensor)*:  AB The two matrices multiplied together.

#### Example
```js
_.matMultiply([[1,2],[3,4]], [[1,2],[3,4]])
// → [ [ 7, 10 ], [ 15, 22 ] ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="rbind"></a>`rbind(M, indArr)`
<a href="#rbind">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1328 "View in source") [&#x24C9;][1]

Returns a new matrix with the selected rows from a matrix. Same as `rbind()` from `R`.
Useful for picking certain rows from a matrix/tensor.

#### Arguments
1. `M` *(tensor)*: The original matrix.
2. `indArr` *(Array)*: The array of indices specifying the rows of M to pick.

#### Returns
*(tensor)*:  M' The matrix with the selected rows from the indices.

#### Example
```js
_.rbind([[1,2,3],[4,5,6],[7,8,9]], [1, 1, 2])
// → [[4, 5, 6], [4, 5, 6], [7, 8, 9]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="rectangularize"></a>`rectangularize(T)`
<a href="#rectangularize">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1458 "View in source") [&#x24C9;][1]

Makes a tensor rectangular by filling with val (defaulted to 0).
Mutates the tensor.

#### Arguments
1. `T` *(tensor)*: The original tensor.

#### Returns
*(tensor)*:  T The mutated tensor that is now rectangular.

#### Example
```js
_.rectangularize([
     [1, 2, 3],
     [4]
   ])
// → [[ 1, 2, 3 ], [ 4, 0, 0 ]]

_.rectangularize([
     [1, 2, 3],
     [4]
   ], 'a')
// → [[ 1, 2, 3 ], [ 4, 'a', 'a' ]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reshape"></a>`reshape(A, dimArr)`
<a href="#reshape">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1489 "View in source") [&#x24C9;][1]

Reshapes an array into a multi-dimensional tensor. Applies `_.chunk` using a dimension array in sequence.

#### Arguments
1. `A` *(Array)*: The original flat array.
2. `dimArr` *(Array)*: The array specifying the dimensions.

#### Returns
*(tensor)*:  T The tensor reshaped from the copied array.

#### Example
```js
_.reshape([1, 2, 3, 4, 5, 6], [2, 3])
// → [[ 1, 2, 3 ], [ 4, 5, 6 ]]

_.reshape([1, 2, 3, 4], [2, 3])
// → [[ 1, 2, 3 ], [ 4 ]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="reverse"></a>`reverse(T, [i=0], [j=T.length-1])`
<a href="#reverse">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1242 "View in source") [&#x24C9;][1]

Returns a copy of the array reversed, optionally from index `i` to `j` inclusive.

#### Arguments
1. `T` *(Array)*: The array.
2. `[i=0]` *(number)*: The from-index.
3. `[j=T.length-1]` *(number)*: The to-index.

#### Returns
*(Array)*:  R The reversed copy of the array.

#### Example
```js
_.reverse([0, 1, 2, 3, 4, 5])
// → [5, 4, 3, 2, 1, 0]

_.reverse([0, 1, 2, 3, 4, 5], 2) // reverse from index 2
// → [0, 1, 5, 4, 3, 2]

_.reverse([0, 1, 2, 3, 4, 5], null, 2) // reverse to index 2
// → [2, 1, 0, 3, 4, 5]

_.reverse([0, 1, 2, 3, 4, 5], 2, 4) // reverse from index 2 to 4
// → [0, 1, 4, 3, 2, 5]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="swap"></a>`swap(T, i, j)`
<a href="#swap">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1215 "View in source") [&#x24C9;][1]

Swaps entries at indices `i,j`.
Mutates the array.

#### Arguments
1. `T` *(Array)*: The array.
2. `i` *(number)*: The swap-index.
3. `j` *(number)*: The swap-index.

#### Returns
*(Array)*:  T The mutated array after swapping.

#### Example
```js
_.swap([1, 2, 3], 0, 2)
// → [3, 2, 1]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="trace"></a>`trace(M)`
<a href="#trace">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1410 "View in source") [&#x24C9;][1]

Returns the trace of a square matrix.

#### Arguments
1. `M` *(tensor)*: The matrix.

#### Returns
*(number)*:  trM The trace of the matrix.

#### Example
```js
_.trace([[1, 2], [3, 4]])
// → 5
```
* * *

<!-- /div -->

<!-- div -->

### <a id="transpose"></a>`transpose(M)`
<a href="#transpose">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1395 "View in source") [&#x24C9;][1]

Returns a copy of a matrix transposed.

#### Arguments
1. `M` *(tensor)*: The original matrix.

#### Returns
*(tensor)*:  M' The copy transposed matrix.

#### Example
```js
_.transpose([[1, 2], [3, 4]])
// → [[ 1, 3 ], [ 2, 4 ]]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="validInds"></a>`validInds(T, maxLen)`
<a href="#validInds">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1311 "View in source") [&#x24C9;][1]

Filters out the invalid indices (negatives) in an array of indices. Basically keeps `x` where `0 ≤ x ≤ maxLen`.
Used with `_.batchIndexOf`.

#### Arguments
1. `T` *(Array)*: The array of indices, can be from `_.batchIndexOf`.
2. `maxLen` *(number)*: The max value the indices can have.

#### Returns
*(Array)*:  inds A copy of the array with only valid indices.

#### Example
```js
_.validInds([-2, 4, 0, 2, -1], 2)
// → [0, 2]
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“trend” Methods`

<!-- div -->

### <a id="decreasing"></a>`decreasing(T)`
<a href="#decreasing">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1956 "View in source") [&#x24C9;][1]

Shorthand for `_.stairsTrend`. Checks if a vector v is decreasing.

#### Arguments
1. `T` *(Array)*: An array of values.

#### Returns
*(boolean)*:  true If stairs of T match the sigFn.

* * *

<!-- /div -->

<!-- div -->

### <a id="increasing"></a>`increasing(T)`
<a href="#increasing">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1936 "View in source") [&#x24C9;][1]

Shorthand for `_.stairsTrend`. Checks if a vector v is increasing.

#### Arguments
1. `T` *(Array)*: An array of values.

#### Returns
*(boolean)*:  true If stairs of T match the sigFn.

* * *

<!-- /div -->

<!-- div -->

### <a id="nonDecreasing"></a>`nonDecreasing(T)`
<a href="#nonDecreasing">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1946 "View in source") [&#x24C9;][1]

Shorthand for `_.stairsTrend`. Checks if a vector v is non-decreasing.

#### Arguments
1. `T` *(Array)*: An array of values.

#### Returns
*(boolean)*:  true If stairs of T match the sigFn.

* * *

<!-- /div -->

<!-- div -->

### <a id="nonIncreasing"></a>`nonIncreasing(T)`
<a href="#nonIncreasing">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1966 "View in source") [&#x24C9;][1]

Shorthand for `_.stairsTrend`. Checks if a vector v is non-increasing.

#### Arguments
1. `T` *(Array)*: An array of values.

#### Returns
*(boolean)*:  true If stairs of T match the sigFn.

* * *

<!-- /div -->

<!-- div -->

### <a id="stairs"></a>`stairs(T)`
<a href="#stairs">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1905 "View in source") [&#x24C9;][1]

Returns the stair, i.e. the adjacent differences in the vector.

#### Arguments
1. `T` *(Array)*: An array of values.

#### Returns
*(Array)*:  S The array showing adjacent differences.

#### Example
```js
_.stairs([1, 2, 3, 5, 8])
// → [1, 1, 2, 3]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="stairsTrend"></a>`stairsTrend(T, sigFn)`
<a href="#stairsTrend">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1926 "View in source") [&#x24C9;][1]

Check the trend of the array using a signature function.
Useful for checking if array entries are increasing.

#### Arguments
1. `T` *(Array)*: An array of values.
2. `sigFn` *(Function)*: A signature function.

#### Returns
*(boolean)*:  true If stairs of T match the sigFn.

#### Example
```js
_.stairsTrend([1, 2, 3, 4, 5], _.isPositive) // Array increasing
// → true
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“vector” Methods`

<!-- div -->

### <a id="dot"></a>`dot(X, Y)`
<a href="#dot">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1811 "View in source") [&#x24C9;][1]

Returns the dot product between two vectors. If lengths mismatch, recycles the shorter vector.

#### Arguments
1. `X` *(Array)*: A flat array.
2. `Y` *(Array)*: A flat array.

#### Returns
*(number)*:  X.Y The dot product.

#### Example
```js
_.dot([1, 2, 3], [1, 2, 3])
// → 14

_.dot([1, 2, 3, 4, 5, 6], [1, 2, 3]) // recycle
// → 46
```
* * *

<!-- /div -->

<!-- div -->

### <a id="norm"></a>`norm(T, [n=2])`
<a href="#norm">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1854 "View in source") [&#x24C9;][1]

Returns the L-n norm of a vector, default to L-2 (Euclidean) metric.

#### Arguments
1. `T` *(tensor)*: A tensor.
2. `[n=2]` *(number)*: The metric.

#### Returns
*(number)*:  num The norm in L-n metric space.

#### Example
```js
_.norm([3, 4]) // Euclidean triangle
// → 5

_.norm([3, 4], 1) // taxicab metric
// → 7
```
* * *

<!-- /div -->

<!-- div -->

### <a id="normalize"></a>`normalize(T, [n=2])`
<a href="#normalize">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1874 "View in source") [&#x24C9;][1]

Returns a copy of the vector normalized using L-n metric (defaulted to L-2).

#### Arguments
1. `T` *(tensor)*: A tensor.
2. `[n=2]` *(number)*: The metric.

#### Returns
*(tensor)*:  T' The normalized tensor.

#### Example
```js
_.normalize([3, 4]) // Euclidean triangle
// → [0.6, 0.8]

_.normalize([3, 4], 1) // taxicab metric
// → [3/7, 4/7]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="powSum"></a>`powSum(T, [n=2])`
<a href="#powSum">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1834 "View in source") [&#x24C9;][1]

Returns the sums of n-powers (defaulted to 2) of a tensor, i.e. the square of the generalized hypotenuse of a tensor.
Useful for doing sums of squares/other L-n metrics.

#### Arguments
1. `T` *(tensor)*: A tensor.
2. `[n=2]` *(number)*: The power base.

#### Returns
*(number)*:  num The power sum.

#### Example
```js
_.powSum([1, 2, 3])
// → 14

_.powSum([1, 2, 3], 3)
// → 36

_.dot([[1, 2], [3, 4]], 3) // applicable to a tensor
// → 100
```
* * *

<!-- /div -->

<!-- div -->

### <a id="rescale"></a>`rescale(T)`
<a href="#rescale">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L1889 "View in source") [&#x24C9;][1]

Returns a copy of the vector rescaled to unit length; is the shorthand for `_.normalize(v, 1)`.

#### Arguments
1. `T` *(tensor)*: A tensor.

#### Returns
*(tensor)*:  T' The rescaled tensor.

#### Example
```js
_.rescale([3, 4])
// → [3/7, 4/7]
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="histogram"></a>`histogram(data, [fn], [pair])`
<a href="#histogram">#</a> [&#x24C8;](https://github.com/kengz/lomath/blob/master/index.js#L2140 "View in source") [&#x24C9;][1]

Returns a histogram/distribution from the data. This internally calls `_.countBy` to group data by bins, using the function if specified.
Returns the object containing values, frequencies and probabilities as separate array for ease of using them with the statistics methods.

#### Arguments
1. `data` *(Array)*: An array of data.
2. `[fn]` *(Function)*: An optional function to group the data by.
3. `[pair]` *(boolean)*: If true, will return an array of `[value, freq]`.

#### Returns
*(Object|Array)*:  histogram {value, freq, prob} or array of &#91;value, freq&#93;.

#### Example
```js
// called with data
var hist = _.histogram(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd']);
hist.value
// → ['a', 'b', 'c', 'd']
hist.freq
// → [1, 2, 3, 4]
hist.prob // normalized freq as probabiltiy distribution
// → [0.1, 0.2, 0.3, 0.4]

// called with data and pair
_.histogram(['a', 'b', 'b', 'c', 'c', 'c', 'd', 'd', 'd', 'd'], true);
// → [['a',1], ['b',2], ['c',3], ['d',4]

// called with data and fn
var histfloor = _.histogram([1.1, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4], Math.floor);
histfloor.value
// → [ '1', '2', '3', '4' ] // Note the keys from _.countBy are strings
hist.freq
// → [1, 2, 3, 4]
histfloor.prob
// → [0.1, 0.2, 0.3, 0.4]

// called with data, fn and pair
_.histogram([1.1, 2.1, 2.2, 3.1, 3.2, 3.3, 4.1, 4.2, 4.3, 4.4], Math.floor, true);
// → [['1',1], ['2',2], ['3',3], ['4',4] ]
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Properties`

<!-- /div -->

<!-- /div -->

 [1]: #basics "Jump back to the TOC."
