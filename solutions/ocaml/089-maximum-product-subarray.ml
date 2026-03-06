(*
  Problem 89: Maximum Product Subarray (LeetCode 152)
  Difficulty: Med
  Language: OCaml
*)
let max_product nums =
  let hd = List.hd nums in
  let (best, _, _) = List.fold_left (fun (best, mx, mn) n ->
    let hi = max n (max (mx * n) (mn * n)) in
    let lo = min n (min (mx * n) (mn * n)) in
    (max best hi, hi, lo)
  ) (hd, hd, hd) (List.tl nums) in
  best
