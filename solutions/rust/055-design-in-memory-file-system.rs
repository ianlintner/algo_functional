/**
 * Problem 55: Design In-Memory File System (LeetCode 588)
 * Difficulty: Hard
 * Language: Rust
 */
use std::collections::BTreeMap;

#[derive(Default)]
struct FSNode {
    children: BTreeMap<String, FSNode>,
    content: String,
}

impl FSNode {
    fn navigate(&mut self, parts: &[&str]) -> &mut FSNode {
        parts.iter().fold(self, |node, &p| {
            node.children.entry(p.to_string()).or_default()
        })
    }
}

struct FileSystem { root: FSNode }

impl FileSystem {
    fn new() -> Self { FileSystem { root: FSNode::default() } }
    fn ls(&mut self, path: &str) -> Vec<String> {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        let node = self.root.navigate(&parts);
        if !node.content.is_empty() {
            vec![parts.last().unwrap().to_string()]
        } else {
            node.children.keys().cloned().collect()
        }
    }
    fn mkdir(&mut self, path: &str) {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        self.root.navigate(&parts);
    }
    fn add_content(&mut self, path: &str, content: &str) {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        self.root.navigate(&parts).content.push_str(content);
    }
    fn read_content(&mut self, path: &str) -> &str {
        let parts: Vec<&str> = path.split('/').filter(|s| !s.is_empty()).collect();
        &self.root.navigate(&parts).content
    }
}
