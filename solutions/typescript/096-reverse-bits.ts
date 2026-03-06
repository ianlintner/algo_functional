/**
 * Problem 96: Reverse Bits (LeetCode 190)
 * Difficulty: Easy
 * Language: TypeScript
 */
function reverseBits(n: number): number {
  return Array.from({ length: 32 }).reduce<[number, number]>(
    ([result, num], _, i) => [
      (result | ((num & 1) << (31 - i))) >>> 0,
      num >>> 1
    ],
    [0, n]
  )[0];
}
