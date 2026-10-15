import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum, mean, median, mode } from './sum.mjs';

test('sum adds numbers', () => {
  assert.equal(sum([1, 2, 3]), 6);
  assert.equal(sum([]), 0);
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
  assert.throws(() => mode([]), RangeError);
});

test('mode does not change its input', () => {
  const xs = [3, 1, 1, 3];
  mode(xs);
  assert.deepEqual(xs, [3, 1, 1, 3]);
});
