// Small number helpers.

export function sum(numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

export function mean(numbers) {
  if (numbers.length === 0) throw new RangeError('mean() of an empty list');
  return sum(numbers) / numbers.length;
}
