// Small number helpers.

export function sum(numbers) {
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
