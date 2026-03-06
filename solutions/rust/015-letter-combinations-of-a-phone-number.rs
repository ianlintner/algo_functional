/**
 * Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
 * Difficulty: Med
 * Language: Rust
 */
pub fn letter_combinations(digits: String) -> Vec<String> {
    if digits.is_empty() { return vec![]; }
    let phone = |d| match d {
        '2' => "abc", '3' => "def", '4' => "ghi", '5' => "jkl",
        '6' => "mno", '7' => "pqrs", '8' => "tuv", '9' => "wxyz",
        _ => "",
    };
    digits.chars().fold(vec![String::new()], |combos, d| {
        combos.iter()
            .flat_map(|combo| {
                phone(d).chars().map(move |ch| format!("{}{}", combo, ch))
            })
            .collect()
    })
}
