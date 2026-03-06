/**
 * Problem 86: Sort List (LeetCode 148)
 * Difficulty: Med
 * Language: Rust
 */
fn sort_list(xs: &[i32]) -> Vec<i32> {
    if xs.len() <= 1 { return xs.to_vec(); }
    let mid = xs.len() / 2;
    let (l, r) = (sort_list(&xs[..mid]), sort_list(&xs[mid..]));
    let mut res = Vec::new();
    let (mut i, mut j) = (0, 0);
    while i < l.len() && j < r.len() {
        if l[i] <= r[j] { res.push(l[i]); i += 1; }
        else { res.push(r[j]); j += 1; }
    }
    res.extend_from_slice(&l[i..]);
    res.extend_from_slice(&r[j..]);
    res
}
