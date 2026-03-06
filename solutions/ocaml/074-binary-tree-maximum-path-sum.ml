(*
  Problem 74: Binary Tree Maximum Path Sum (LeetCode 124)
  Difficulty: Hard
  Language: OCaml
*)
let max_path_sum tree =
  let rec go = function
    | Nil -> (0, min_int)
    | Node (v, l, r) ->
      let (lg, lm) = go l and (rg, rm) = go r in
      let gain = max 0 (v + max lg rg) in
      let path_max = List.fold_left max min_int [lm; rm; v + lg + rg] in
      (gain, path_max)
  in snd (go tree)
