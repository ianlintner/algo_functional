/**
 * Problem 112: Asteroid Collision (LeetCode 735)
 * Difficulty: Med
 * Language: Rust
 */
fn asteroid_collision(asteroids: Vec<i32>) -> Vec<i32> {
    asteroids.iter().fold(Vec::new(), |stack, &ast| {
        fn resolve(mut s: Vec<i32>, a: i32) -> Vec<i32> {
            match s.last() {
                None => { s.push(a); s }
                Some(&top) if a > 0 || top < 0 => { s.push(a); s }
                Some(&top) if top == -a => { s.pop(); s }
                Some(&top) if top < -a => { s.pop(); resolve(s, a) }
                _ => s
            }
        }
        resolve(stack, ast)
    })
}
