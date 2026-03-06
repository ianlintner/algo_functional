/**
 * Problem 23: Reverse Nodes in k-Group (LeetCode 25)
 * Difficulty: Hard
 * Language: Rust
 */
pub fn reverse_k_group(head: Option<Box<ListNode>>, k: i32) -> Option<Box<ListNode>> {
    let mut vals: Vec<i32> = Vec::new();
    let mut curr = &head;
    while let Some(node) = curr {
        vals.push(node.val);
        curr = &node.next;
    }

    fn process(arr: &[i32], k: usize) -> Vec<i32> {
        if arr.len() < k { return arr.to_vec(); }
        let mut group: Vec<i32> = arr[..k].iter().rev().copied().collect();
        group.extend(process(&arr[k..], k));
        group
    }

    let result = process(&vals, k as usize);
    result.into_iter().rev().fold(None, |next, val| {
        Some(Box::new(ListNode { val, next }))
    })
}
