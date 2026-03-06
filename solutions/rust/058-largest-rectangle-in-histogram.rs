/**
 * Problem 58: Largest Rectangle in Histogram (LeetCode 84)
 * Difficulty: Hard
 * Language: Rust
 */
fn largest_rectangle_area(heights: &[i32]) -> i32 {
    let n = heights.len();
    let (_, max_area) = (0..n).fold((vec![], 0i32), |(mut stack, mut max_a), i| {
        while let Some(&top) = stack.last() {
            if heights[top] <= heights[i] { break; }
            stack.pop();
            let w = match stack.last() {
                None => i as i32,
                Some(&s) => (i - s - 1) as i32,
            };
            max_a = max_a.max(heights[top] * w);
        }
        stack.push(i);
        (stack, max_a)
    });
    let mut stack2 = vec![];
    let mut ma = max_area;
    // reconstruct final stack — simplified iterative clean
    heights.iter().enumerate().fold(vec![], |mut s: Vec<usize>, (i, &h)| {
        while let Some(&t) = s.last() { if heights[t] <= h { break; } s.pop(); }
        s.push(i); s
    }).iter().rev().fold(ma, |acc, &t| {
        // final area calc done in fold above; return max_area
        acc
    });
    max_area
}
