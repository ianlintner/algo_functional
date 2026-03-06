(*
  Problem 27: Search in Rotated Sorted Array (LeetCode 33)
  Difficulty: Med
  Language: OCaml
*)
let search nums target =
  let a = Array.of_list nums in
  let rec go lo hi =
    if lo > hi then -1
    else
      let mid = (lo + hi) / 2 in
      if a.(mid) = target then mid
      else if a.(lo) <= a.(mid) then
        if target >= a.(lo) && target < a.(mid) then go lo (mid - 1)
        else go (mid + 1) hi
      else
        if target > a.(mid) && target <= a.(hi) then go (mid + 1) hi
        else go lo (mid - 1)
  in
  go 0 (Array.length a - 1)
