/**
 * Problem 132: First Bad Version (LeetCode 278)
 * Difficulty: Easy
 * Language: Rust
 */
fn first_bad_version(n: i32, is_bad: impl Fn(i32) -> bool) -> i32 {
    fn search(lo: i32, hi: i32, is_bad: &dyn Fn(i32) -> bool) -> i32 {
        if lo >= hi { return lo; }
        let mid = lo + (hi - lo) / 2;
        if is_bad(mid) { search(lo, mid, is_bad) }
        else { search(mid + 1, hi, is_bad) }
    }
    search(1, n, &is_bad)
}
