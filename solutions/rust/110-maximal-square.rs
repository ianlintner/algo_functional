/**
 * Problem 110: Maximal Square (LeetCode 221)
 * Difficulty: Med
 * Language: Rust
 */
fn maximal_square(matrix: &[Vec<char>]) -> i32 {
    let cols = matrix[0].len();
    let (mx, _) = matrix.iter().enumerate().fold(
        (0i32, vec![0i32; cols]),
        |(best, prev), (r, row)| {
            let curr = row.iter().enumerate().fold(Vec::new(),
                |mut acc, (c, &cell)| {
                    let v = if cell == '0' { 0 }
                        else if r == 0 || c == 0 { 1 }
                        else {
                            *[prev[c-1], prev[c],
                              *acc.last().unwrap_or(&0)]
                            .iter().min().unwrap() + 1
                        };
                    acc.push(v); acc
                });
            let row_max = *curr.iter().max().unwrap_or(&0);
            (best.max(row_max), curr)
        });
    mx * mx
}
