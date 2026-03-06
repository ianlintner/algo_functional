(*
  Problem 122: Product of Array Except Self (LeetCode 238)
  Difficulty: Med
  Language: OCaml
*)
let product_except_self nums =
  let n = Array.length nums in
  let prefix = Array.init n (fun i ->
    if i = 0 then 1
    else Array.fold_left ( * ) 1 (Array.sub nums 0 i)) in
  let suffix = Array.init n (fun i ->
    if i = n - 1 then 1
    else Array.fold_left ( * ) 1 (Array.sub nums (i+1) (n-i-1))) in
  Array.init n (fun i -> prefix.(i) * suffix.(i))
