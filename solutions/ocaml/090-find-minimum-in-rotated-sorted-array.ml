(*
  Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
  Difficulty: Med
  Language: OCaml
*)
let find_min nums =
  let a = Array.of_list nums in
  let rec go lo hi =
    if lo = hi then a.(lo)
    else let mid = (lo + hi) / 2 in
      if a.(mid) > a.(hi) then go (mid + 1) hi else go lo mid
  in go 0 (Array.length a - 1)
