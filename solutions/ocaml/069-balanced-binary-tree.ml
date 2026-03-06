(*
  Problem 69: Balanced Binary Tree (LeetCode 110)
  Difficulty: Easy
  Language: OCaml
*)
let is_balanced root =
  let rec height = function
    | Nil -> 0
    | Node (_, l, r) ->
      let lh = height l and rh = height r in
      if lh = -1 || rh = -1 || abs (lh - rh) > 1 then -1
      else 1 + max lh rh
  in height root <> -1
