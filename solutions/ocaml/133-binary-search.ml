(*
  Problem 133: Binary Search (LeetCode 704)
  Difficulty: Easy
  Language: OCaml
*)
let binary_search nums target =
  let arr = Array.of_list nums in
  let rec search lo hi =
    if lo > hi then -1
    else
      let mid = lo + (hi - lo) / 2 in
      if arr.(mid) = target then mid
      else if arr.(mid) < target then search (mid + 1) hi
      else search lo (mid - 1)
  in search 0 (Array.length arr - 1)
