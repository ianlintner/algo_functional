(*
  Problem 21: Merge k Sorted Lists (LeetCode 23)
  Difficulty: Hard
  Language: OCaml
*)
let merge_k_lists lists =
  let rec merge l1 l2 = match l1, l2 with
    | [], ys -> ys
    | xs, [] -> xs
    | x :: xs, y :: ys ->
      if x <= y then x :: merge xs (y :: ys)
      else y :: merge (x :: xs) ys
  in
  List.fold_left merge [] lists
