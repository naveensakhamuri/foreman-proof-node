// Small number helpers.

export function sum(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('sum() expects an array');
  if (!numbers.every(Number.isFinite)) throw new TypeError('sum() expects finite numbers');
  return numbers.reduce((total, n) => total + n, 0);
}

export function mean(numbers) {
  if (numbers.length === 0) throw new RangeError('mean() of an empty list');
  return sum(numbers) / numbers.length;
}

export function median(numbers) {
  if (numbers.length === 0) throw new RangeError('median() of an empty list');
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return mean([sorted[mid - 1], sorted[mid]]);
}

export function mode(numbers) {
  if (numbers.length === 0) throw new RangeError('mode() of an empty list');
  const counts = new Map();
  for (const n of numbers) counts.set(n, (counts.get(n) ?? 0) + 1);
  let best;
  let bestCount = 0;
  for (const [value, count] of counts) {
    if (count > bestCount || (count === bestCount && value < best)) {
      best = value;
      bestCount = count;
    }
  }
  return best;
}

export function range(numbers) {
  if (numbers.length === 0) throw new RangeError('range() of an empty list');
  let min = numbers[0];
  let max = numbers[0];
  for (const n of numbers) {
    if (n < min) min = n;
    if (n > max) max = n;
  }
  return max - min;
}

export function variance(numbers) {
  if (numbers.length === 0) throw new RangeError('variance() of an empty list');
  const m = mean(numbers);
  return sum(numbers.map((n) => (n - m) ** 2)) / numbers.length;
}

export function sumOfSquares(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('sumOfSquares() expects an array');
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    if (!Number.isFinite(n)) throw new TypeError('sumOfSquares() expects finite numbers');
    total += n * n;
  }
  return total;
}

export function product(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('product() expects an array');
  if (!numbers.every(Number.isFinite)) throw new TypeError('product() expects finite numbers');
  return numbers.reduce((total, n) => total * n, 1);
}

export function max(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('max() expects an array');
  if (numbers.length === 0) throw new RangeError('max() of an empty list');
  if (!numbers.every(Number.isFinite)) throw new TypeError('max() expects finite numbers');
  return numbers.reduce((a, b) => (b > a ? b : a));
}

export function min(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('min() expects an array');
  if (numbers.length === 0) throw new RangeError('min() of an empty list');
  if (!numbers.every(Number.isFinite)) throw new TypeError('min() expects finite numbers');
  return numbers.reduce((a, b) => (b < a ? b : a));
}

export function clamp(value, min, max) {
  if (![value, min, max].every(Number.isFinite)) throw new TypeError('clamp() expects finite numbers');
  if (min > max) throw new RangeError('clamp() expects min <= max');
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
