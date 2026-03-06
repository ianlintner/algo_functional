(*
  Problem 108: Kth Largest Element in an Array (LeetCode 215)
  Difficulty: Med
  Language: OCaml
*)
let rec find_kth_largest nums k =
  let pivot = List.nth nums (List.length nums / 2) in
  let hi = List.filter (fun x -> x > pivot) nums in
  let eq = List.filter (fun x -> x = pivot) nums in
  let lo = List.filter (fun x -> x < pivot) nums in
  if k <= List.length hi then find_kth_largest hi k
  else if k <= List.length hi + List.length eq then pivot
  else find_kth_largest lo (k - List.length hi - List.length eq)
