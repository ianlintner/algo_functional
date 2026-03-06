/**
 * Problem 136: Find the Duplicate Number (LeetCode 287)
 * Difficulty: Med
 * Language: Rust
 */
fn find_duplicate(nums: &[i32]) -> i32 {
    let step = |i: usize| nums[i] as usize;
    fn find_meet(s: usize, f: usize, nums: &[i32]) -> usize {
        let s2 = nums[s] as usize;
        let f2 = nums[nums[f] as usize] as usize;
        if s2 == f2 { s2 } else { find_meet(s2, f2, nums) }
    }
    fn find_start(a: usize, b: usize, nums: &[i32]) -> i32 {
        if a == b { a as i32 }
        else { find_start(nums[a] as usize, nums[b] as usize, nums) }
    }
    let meet = find_meet(0, 0, nums);
    find_start(0, meet, nums)
}
