(*
  Problem 52: Search a 2D Matrix (LeetCode 74)
  Difficulty: Med
  Language: OCaml
*)
let search_matrix matrix target =
  let flat = List.concat matrix |> Array.of_list in
  let rec go lo hi =
    if lo > hi then false
    else
      let mid = (lo + hi) / 2 in
      if flat.(mid) = target then true
      else if flat.(mid) < target then go (mid + 1) hi
      else go lo (mid - 1)
  in go 0 (Array.length flat - 1)
