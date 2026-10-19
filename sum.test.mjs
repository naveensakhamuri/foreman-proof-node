import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum, mean, median, mode, range, sumOfSquares, product, variance, max } from './sum.mjs';

test('variance is the mean squared distance from the mean', () => {
  assert.equal(variance([2, 4, 4, 4, 5, 5, 7, 9]), 4);
  assert.equal(variance([1, 2, 3, 4]), 1.25);
});

test('variance of a single value is 0', () => {
  assert.equal(variance([3]), 0);
  assert.equal(variance([4, 4]), 0);
});

test('variance of an empty list throws', () => {
  assert.throws(() => variance([]), { name: 'RangeError', message: 'variance() of an empty list' });
});

test('variance of a list with a non-finite value throws TypeError', () => {
  assert.throws(() => variance([1, NaN]), TypeError);
});

test('variance does not change its input', () => {
  const xs = [2, 4, 4, 4, 5, 5, 7, 9];
  const copy = [...xs];
  variance(xs);
  assert.deepEqual(xs, copy);
});

test('sum adds numbers', () => {
  assert.equal(sum([1, 2, 3]), 6);
  assert.equal(sum([]), 0);
});

test('sum still adds valid numbers', () => {
  assert.equal(sum([1, 2]), 3);
  assert.equal(sum([-1, 0.5]), -0.5);
});

test('sum of a non-array throws TypeError', () => {
  assert.throws(() => sum('1,2'), TypeError);
  assert.throws(() => sum(undefined), TypeError);
  assert.throws(() => sum({ length: 0 }), TypeError);
  assert.throws(() => sum({ reduce: () => 0 }), TypeError);
  assert.throws(() => sum(new Float64Array([1, 2])), TypeError);
  assert.throws(() => sum({ every: () => true, reduce: () => 0 }), TypeError);
});

test('sum of an array with a non-number throws TypeError', () => {
  assert.throws(() => sum([1, '2']), TypeError);
  assert.throws(() => sum([1, null]), TypeError);
});

test('sum of an array with a non-finite number throws TypeError', () => {
  assert.throws(() => sum([1, NaN]), TypeError);
  assert.throws(() => sum([Infinity]), TypeError);
  assert.throws(() => sum([1, -Infinity]), TypeError);
});

test('sum does not change its input', () => {
  const xs = [1, 2];
  sum(xs);
  assert.deepEqual(xs, [1, 2]);
});

test('mean averages numbers', () => {
  assert.equal(mean([1, 2, 3]), 2);
  assert.equal(mean([5]), 5);
  assert.equal(mean([1, 2]), 1.5);
});

test('mean of an empty list throws', () => {
  assert.throws(() => mean([]), RangeError);
});

test('mean does not change its input', () => {
  const xs = [1, 2, 3];
  mean(xs);
  assert.deepEqual(xs, [1, 2, 3]);
});

test('median of an odd count is the middle value', () => {
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([5]), 5);
});

test('median of an even count averages the two middle values', () => {
  assert.equal(median([4, 1, 3, 2]), 2.5);
  assert.equal(median([1, 2]), 1.5);
});

test('median sorts numerically', () => {
  assert.equal(median([10, 9, 2]), 9);
});

test('median of an empty list throws', () => {
  assert.throws(() => median([]), RangeError);
});

test('median does not change its input', () => {
  const xs = [3, 1, 2];
  median(xs);
  assert.deepEqual(xs, [3, 1, 2]);
});

test('mode returns the most frequent value', () => {
  assert.equal(mode([1, 2, 2, 3]), 2);
  assert.equal(mode([5]), 5);
});

test('mode picks the smallest value on a tie', () => {
  assert.equal(mode([3, 1, 1, 3]), 1);
  assert.equal(mode([2, 1]), 1);
});

test('mode of an empty list throws', () => {
  assert.throws(() => mode([]), { name: 'RangeError', message: 'mode() of an empty list' });
});

test('mode does not change its input', () => {
  const xs = [3, 1, 1, 3];
  mode(xs);
  assert.deepEqual(xs, [3, 1, 1, 3]);
});

test('range is the largest minus the smallest', () => {
  assert.equal(range([3, 9, 1]), 8);
  assert.equal(range([-2, 5]), 7);
});

test('range of a single value is 0', () => {
  assert.equal(range([5]), 0);
  assert.equal(range([4, 4]), 0);
});

test('range of an empty list throws', () => {
  assert.throws(() => range([]), RangeError);
});

test('range does not change its input', () => {
  const xs = [3, 9, 1];
  range(xs);
  assert.deepEqual(xs, [3, 9, 1]);
});

test('sumOfSquares adds each value squared', () => {
  assert.equal(sumOfSquares([1, 2, 3]), 14);
  assert.equal(sumOfSquares([5]), 25);
});

test('sumOfSquares of an empty list is 0', () => {
  assert.equal(sumOfSquares([]), 0);
});

test('sumOfSquares squares negatives and decimals', () => {
  assert.equal(sumOfSquares([-2, 0.5]), 4.25);
  assert.equal(sumOfSquares([-3]), 9);
});

test('sumOfSquares of a non-array throws TypeError', () => {
  assert.throws(() => sumOfSquares('1,2'), TypeError);
  assert.throws(() => sumOfSquares(undefined), TypeError);
  assert.throws(() => sumOfSquares({ length: 0 }), TypeError);
  assert.throws(() => sumOfSquares({ every: () => true, reduce: () => 0 }), TypeError);
  assert.throws(() => sumOfSquares(new Float64Array([1, 2])), TypeError);
  assert.throws(() => sumOfSquares('1,2'), { name: 'TypeError', message: /expects an array/ });
});

test('sumOfSquares of a sparse array throws TypeError', () => {
  assert.throws(() => sumOfSquares([1, , 2]), { name: 'TypeError', message: /expects finite numbers/ });
  assert.throws(() => sumOfSquares(new Array(3)), TypeError);
});

test('sumOfSquares of finite values that overflow returns Infinity', () => {
  assert.equal(sumOfSquares([1e200, 1e200]), Infinity);
});

test('sumOfSquares of an array with a non-number or non-finite value throws TypeError', () => {
  assert.throws(() => sumOfSquares([1, '2']), TypeError);
  assert.throws(() => sumOfSquares([1, null]), TypeError);
  assert.throws(() => sumOfSquares([NaN]), TypeError);
  assert.throws(() => sumOfSquares([1, Infinity]), TypeError);
});

test('sumOfSquares does not change its input', () => {
  const xs = [1, 2, 3];
  sumOfSquares(xs);
  assert.deepEqual(xs, [1, 2, 3]);
});

test('product multiplies numbers', () => {
  assert.equal(product([2, 3, 4]), 24);
  assert.equal(product([5]), 5);
});

test('product of an empty list is 1', () => {
  assert.equal(product([]), 1);
});

test('product handles negatives, decimals and zero', () => {
  assert.equal(product([-2, 0.5]), -1);
  assert.equal(product([-2, -3]), 6);
  assert.equal(product([0, 5]), 0);
});

test('product of a non-array throws TypeError', () => {
  assert.throws(() => product('1,2'), TypeError);
  assert.throws(() => product(undefined), TypeError);
  assert.throws(() => product({ length: 0 }), TypeError);
  assert.throws(() => product(new Float64Array([2, 3])), TypeError);
  assert.throws(() => product({ every: () => true, reduce: () => 0 }), TypeError);
});

test('product of an array with a non-number or non-finite value throws TypeError', () => {
  assert.throws(() => product([1, '2']), TypeError);
  assert.throws(() => product([1, null]), TypeError);
  assert.throws(() => product([NaN]), TypeError);
  assert.throws(() => product([1, Infinity]), TypeError);
});

test('product does not change its input', () => {
  const xs = [2, 3, 4];
  product(xs);
  assert.deepEqual(xs, [2, 3, 4]);
});

test('max returns the largest value', () => {
  assert.equal(max([3, 9, 2]), 9);
  assert.equal(max([9, 3, 2]), 9);
  assert.equal(max([2, 3, 9]), 9);
});

test('max of a single negative value', () => {
  assert.equal(max([-5]), -5);
  assert.equal(max([-5, -2, -9]), -2);
  assert.equal(max([4, 4]), 4);
});

test('max of an empty list throws', () => {
  assert.throws(() => max([]), { name: 'RangeError', message: 'max() of an empty list' });
});

test('max of a non-array throws TypeError', () => {
  for (const bad of ['1,2', undefined, { length: 0 }, new Float64Array(2)]) {
    assert.throws(() => max(bad), { name: 'TypeError', message: 'max() expects an array' });
  }
});

test('max of a non-finite or non-number value throws TypeError', () => {
  for (const bad of [[1, NaN], [1, Infinity], [1, '2'], [1, null]]) {
    assert.throws(() => max(bad), { name: 'TypeError', message: 'max() expects finite numbers' });
  }
});

test('max does not change its input', () => {
  const input = [3, 9, 2];
  max(input);
  assert.deepEqual(input, [3, 9, 2]);
});
