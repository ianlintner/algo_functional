/**
 * Problem 78: Clone Graph (LeetCode 133)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;
use std::rc::Rc;
use std::cell::RefCell;

fn clone_graph(node: Option<Rc<RefCell<GNode>>>,
               visited: &mut HashMap<i32, Rc<RefCell<GNode>>>)
  -> Option<Rc<RefCell<GNode>>> {
    node.map(|n| {
        let val = n.borrow().val;
        if let Some(c) = visited.get(&val) { return Rc::clone(c); }
        let clone = Rc::new(RefCell::new(GNode { val, neighbors: vec![] }));
        visited.insert(val, Rc::clone(&clone));
        let nbrs: Vec<_> = n.borrow().neighbors.iter()
            .filter_map(|nb| clone_graph(Some(Rc::clone(nb)), visited)).collect();
        clone.borrow_mut().neighbors = nbrs;
        clone
    })
}
