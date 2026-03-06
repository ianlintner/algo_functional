/**
 * Problem 111: Flood Fill (LeetCode 733)
 * Difficulty: Easy
 * Language: Rust
 */
fn flood_fill(image: &[Vec<i32>], sr: usize, sc: usize,
              color: i32) -> Vec<Vec<i32>> {
    let orig = image[sr][sc];
    if orig == color { return image.to_vec(); }
    fn fill(mut img: Vec<Vec<i32>>, r: i32, c: i32,
            color: i32, orig: i32) -> Vec<Vec<i32>> {
        let (rows, cols) = (img.len() as i32, img[0].len() as i32);
        if r < 0 || r >= rows || c < 0 || c >= cols { return img; }
        if img[r as usize][c as usize] != orig { return img; }
        img[r as usize][c as usize] = color;
        [(-1,0),(1,0),(0,-1),(0,1)].iter()
            .fold(img, |im, &(dr,dc)| fill(im, r+dr, c+dc, color, orig))
    }
    fill(image.to_vec(), sr as i32, sc as i32, color, orig)
}
