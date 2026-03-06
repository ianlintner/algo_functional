/**
 * Problem 104: Accounts Merge (LeetCode 721)
 * Difficulty: Med
 * Language: Rust
 */
use std::collections::HashMap;

fn accounts_merge(accounts: Vec<Vec<String>>) -> Vec<Vec<String>> {
    let mut parent: HashMap<String, String> = HashMap::new();
    let mut owner: HashMap<String, String> = HashMap::new();
    fn find(p: &mut HashMap<String, String>, x: &str) -> String {
        if !p.contains_key(x) { p.insert(x.into(), x.into()); }
        let px = p[x].clone();
        if px == x { return x.into(); }
        let r = find(p, &px); p.insert(x.into(), r.clone()); r
    }
    for acc in &accounts {
        for e in &acc[1..] {
            owner.insert(e.clone(), acc[0].clone());
            let (r0, re) = (find(&mut parent, &acc[1]), find(&mut parent, e));
            if r0 != re { parent.insert(r0, re); }
        }
    }
    let mut groups: HashMap<String, Vec<String>> = HashMap::new();
    for e in owner.keys() {
        groups.entry(find(&mut parent, e)).or_default().push(e.clone());
    }
    groups.values().map(|es| {
        let mut s = es.clone(); s.sort();
        std::iter::once(owner[&s[0]].clone()).chain(s).collect()
    }).collect()
}
