import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum, mean } from './sum.mjs';

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
