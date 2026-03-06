(*
  Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
  Difficulty: Med
  Language: OCaml
*)
let zigzag_level_order root =
  let rec bfs level n = match level with
    | [] -> []
    | _ ->
      let vals = List.filter_map (function Nil -> None | Node(v,_,_) -> Some v) level in
      let row = if n mod 2 = 0 then vals else List.rev vals in
      let next = List.concat_map (function
        | Nil -> [] | Node(_,l,r) -> List.filter ((<>) Nil) [l;r]) level in
      if vals = [] then [] else row :: bfs next (n+1)
  in bfs [root] 0
