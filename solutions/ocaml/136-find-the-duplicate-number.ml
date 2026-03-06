(*
  Problem 136: Find the Duplicate Number (LeetCode 287)
  Difficulty: Med
  Language: OCaml
*)
let find_duplicate nums =
  let arr = Array.of_list nums in
  let step i = arr.(i) in
  let rec find_meet s f =
    let s' = step s and f' = step (step f) in
    if s' = f' then s' else find_meet s' f' in
  let rec find_start a b =
    if a = b then a else find_start (step a) (step b) in
  let meet = find_meet (step 0) (step (step 0)) in
  find_start 0 meet
