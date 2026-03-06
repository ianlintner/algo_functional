/**
 * Problem 59: Decode Ways (LeetCode 91)
 * Difficulty: Med
 * Language: Rust
 */
fn num_decodings(s: &str) -> i32 {
    let bytes = s.as_bytes();
    let n = bytes.len();
    // bottom-up DP with fold
    let (a, b) = (0..n).rev().fold((1i32, 0i32), |(dp_i1, dp_i2), i| {
        if bytes[i] == b'0' { (0, dp_i1) }
        else {
            let one = dp_i1;
            let two = if i + 1 < n {
                let v = (bytes[i] - b'0') as i32 * 10 + (bytes[i+1] - b'0') as i32;
                if v <= 26 { dp_i2 } else { 0 }
            } else { 0 };
            (one + two, dp_i1)
        }
    });
    a
}
