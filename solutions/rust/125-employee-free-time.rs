/**
 * Problem 125: Employee Free Time (LeetCode 759)
 * Difficulty: Hard
 * Language: Rust
 */
fn employee_free_time(schedules: Vec<Vec<(i32, i32)>>) -> Vec<(i32, i32)> {
    let mut all: Vec<(i32, i32)> = schedules.into_iter().flatten().collect();
    all.sort();
    let merged = all.into_iter().fold(vec![], |mut acc: Vec<(i32,i32)>, (s, e)| {
        if let Some(last) = acc.last_mut() {
            if last.1 >= s { last.1 = last.1.max(e); return acc; }
        }
        acc.push((s, e)); acc
    });
    merged.windows(2).filter_map(|w| {
        if w[0].1 < w[1].0 { Some((w[0].1, w[1].0)) } else { None }
    }).collect()
}
