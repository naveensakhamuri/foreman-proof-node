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

export function sumOfSquares(numbers) {
  if (!Array.isArray(numbers)) throw new TypeError('sumOfSquares() expects an array');
  if (!numbers.every(Number.isFinite)) throw new TypeError('sumOfSquares() expects finite numbers');
  return numbers.reduce((total, n) => total + n * n, 0);
}
