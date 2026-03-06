(*
  Problem 103: Implement Trie (Prefix Tree) (LeetCode 208)
  Difficulty: Med
  Language: OCaml
*)
type trie = { children: (char * trie) list; is_end: bool }
let empty_trie = { children = []; is_end = false }

let rec trie_insert word t = match word with
  | [] -> { t with is_end = true }
  | c :: cs ->
    let child = try List.assoc c t.children with Not_found -> empty_trie in
    { t with children =
      (c, trie_insert cs child) :: List.filter (fun (k,_) -> k <> c) t.children }

let rec trie_search word t = match word with
  | [] -> t.is_end
  | c :: cs ->
    (try trie_search cs (List.assoc c t.children) with Not_found -> false)
