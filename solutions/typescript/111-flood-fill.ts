/**
 * Problem 111: Flood Fill (LeetCode 733)
 * Difficulty: Easy
 * Language: TypeScript
 */
function floodFill(image: number[][], sr: number, sc: number,
                    color: number): number[][] {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const fill = (img: number[][], r: number, c: number): number[][] => {
    if (r < 0 || r >= img.length || c < 0 || c >= img[0].length) return img;
    if (img[r][c] !== orig) return img;
    const updated = img.map((row, i) =>
      i === r ? row.map((v, j) => j === c ? color : v) : row
    );
    return [[-1,0],[1,0],[0,-1],[0,1]].reduce(
      (acc, [nr, nc]) => fill(acc, r+nr, c+nc), updated);
  };
  return fill(image, sr, sc);
}
