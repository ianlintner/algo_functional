/**
 * Problem 79: Gas Station (LeetCode 134)
 * Difficulty: Med
 * Language: Rust
 */
fn can_complete_circuit(gas: Vec<i32>, cost: Vec<i32>) -> i32 {
    let (total, _, start) = gas.iter().zip(cost.iter()).enumerate()
        .fold((0, 0, 0), |(tot, tank, s), (i, (g, c))| {
            let d = g - c;
            let (tot2, tank2) = (tot + d, tank + d);
            if tank2 < 0 { (tot2, 0, i as i32 + 1) } else { (tot2, tank2, s) }
        });
    if total >= 0 { start } else { -1 }
}
