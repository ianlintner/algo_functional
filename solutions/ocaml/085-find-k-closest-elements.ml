(*
  Problem 85: Find K Closest Elements (LeetCode 658)
  Difficulty: Med
  Language: OCaml
*)
let find_closest_elements arr k x =
  let a = Array.of_list arr in
  let rec go lo hi =
    if hi - lo = k then Array.to_list (Array.sub a lo k)
    else if abs (a.(lo) - x) <= abs (a.(hi-1) - x) then go lo (hi-1)
    else go (lo+1) hi
  in go 0 (Array.length a)
