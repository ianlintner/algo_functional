/**
 * Problem 49: Add Binary (LeetCode 67)
 * Difficulty: Easy
 * Language: TypeScript
 */
function addBinary(a: string, b: string): string {
  const go = (i: number, j: number, carry: number): string => {
    if (i < 0 && j < 0 && carry === 0) return "";
    const da = i >= 0 ? Number(a[i]) : 0;
    const db = j >= 0 ? Number(b[j]) : 0;
    const sum = da + db + carry;
    return go(i - 1, j - 1, Math.floor(sum / 2)) + String(sum % 2);
  };
  return go(a.length - 1, b.length - 1, 0) || "0";
}
