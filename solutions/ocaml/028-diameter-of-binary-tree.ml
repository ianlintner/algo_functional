(*
  Problem 28: Diameter of Binary Tree (LeetCode 543)
  Difficulty: Easy
  Language: OCaml
*)
type 'a tree = Nil | Node of 'a * 'a tree * 'a tree

let diameter_of_binary_tree root =
  let rec dfs = function
    | Nil -> (0, 0)
    | Node (_, l, r) ->
      let (lh, ld) = dfs l in
      let (rh, rd) = dfs r in
      (1 + max lh rh, List.fold_left max 0 [lh + rh; ld; rd])
  in
  snd (dfs root)
