/**
 * Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
 * Difficulty: Med
 * Language: Rust
 */
fn count_components(n: usize, edges: &[(usize, usize)]) -> usize {
    let mut parent: Vec<usize> = (0..n).collect();
    fn find(parent: &mut Vec<usize>, x: usize) -> usize {
        if parent[x] != x { parent[x] = find(parent, parent[x]); }
        parent[x]
    }
    let mut count = n;
    for &(a, b) in edges {
        let (ra, rb) = (find(&mut parent, a), find(&mut parent, b));
        if ra != rb { parent[ra] = rb; count -= 1; }
    }
    count
}
