export function createRandomArray(size, max) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}