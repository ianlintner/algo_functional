(*
  Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
  Difficulty: Med
  Language: OCaml
*)
let level_order root =
  let rec bfs = function
    | [] -> []
    | level ->
      let vals = List.filter_map (function
        | Nil -> None | Node (v,_,_) -> Some v) level in
      let next = List.concat_map (function
        | Nil -> [] | Node (_,l,r) ->
          List.filter (fun x -> x <> Nil) [l; r]) level in
      if vals = [] then [] else vals :: bfs next
  in bfs [root]
