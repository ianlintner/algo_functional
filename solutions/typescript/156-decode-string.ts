/**
 * Problem 156: Decode String (LeetCode 394)
 * Difficulty: Med
 * Language: TypeScript
 */
function decodeString(s: string): string {
  const helper = (s: string, i: number): [string, number] => {
    let result = '';
    while (i < s.length && s[i] !== ']') {
      if (s[i] >= '0' && s[i] <= '9') {
        let num = 0;
        while (s[i] >= '0' && s[i] <= '9') { num = num * 10 + Number(s[i]); i++; }
        i++; // skip '['
        const [decoded, newI] = helper(s, i);
        result += Array.from({ length: num }, () => decoded).join('');
        i = newI + 1; // skip ']'
      } else { result += s[i]; i++; }
    }
    return [result, i];
  };
  return helper(s, 0)[0];
}
