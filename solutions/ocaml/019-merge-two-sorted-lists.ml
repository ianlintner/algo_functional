(*
  Problem 19: Merge Two Sorted Lists (LeetCode 21)
  Difficulty: Easy
  Language: OCaml
*)
let rec merge_two_lists l1 l2 =
  match l1, l2 with
  | [], ys -> ys
  | xs, [] -> xs
  | x :: xs, y :: ys ->
    if x <= y then x :: merge_two_lists xs (y :: ys)
    else y :: merge_two_lists (x :: xs) ys
