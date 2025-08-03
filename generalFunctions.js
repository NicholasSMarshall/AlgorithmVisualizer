export function createRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - 1 + 1)) + 1);
}
