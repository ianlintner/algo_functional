/**
 * Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
 * Difficulty: Hard
 * Language: Rust
 */
fn smallest_range(nums: Vec<Vec<i32>>) -> Vec<i32> {
    let k = nums.len();
    let mut tagged: Vec<(i32, usize)> = nums.iter().enumerate()
        .flat_map(|(i, list)| list.iter().map(move |&v| (v, i))).collect();
    tagged.sort();
    let (mut left, mut best) = (0, (i32::MIN, i32::MAX));
    let mut counts = vec![0usize; k];
    let mut covered = 0usize;
    for &(v, g) in &tagged {
        if counts[g] == 0 { covered += 1; }
        counts[g] += 1;
        while covered == k {
            let (lv, lg) = tagged[left];
            if v - lv < best.1 - best.0 { best = (lv, v); }
            counts[lg] -= 1;
            if counts[lg] == 0 { covered -= 1; }
            left += 1;
        }
    }
    vec![best.0, best.1]
}
