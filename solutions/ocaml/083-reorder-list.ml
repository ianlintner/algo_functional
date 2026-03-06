(*
  Problem 83: Reorder List (LeetCode 143)
  Difficulty: Med
  Language: OCaml
*)
let reorder_list lst =
  let n = List.length lst in
  let mid = n / 2 in
  let first = List.filteri (fun i _ -> i < mid) lst in
  let second = List.rev (List.filteri (fun i _ -> i >= mid) lst) in
  let rec merge a b = match a, b with
    | [], bs -> bs | as_, [] -> as_
    | ah :: at, bh :: bt -> ah :: bh :: merge at bt
  in merge first second
