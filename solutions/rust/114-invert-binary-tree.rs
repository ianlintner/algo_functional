/**
 * Problem 114: Invert Binary Tree (LeetCode 226)
 * Difficulty: Easy
 * Language: Rust
 */
#[derive(Clone)]
enum Tree { Nil, Node(i32, Box<Tree>, Box<Tree>) }

fn invert_tree(root: &Tree) -> Tree {
    match root {
        Tree::Nil => Tree::Nil,
        Tree::Node(v, l, r) =>
            Tree::Node(*v, Box::new(invert_tree(r)),
                           Box::new(invert_tree(l)))
    }
}
