(*
  Problem 92: Majority Element (LeetCode 169)
  Difficulty: Easy
  Language: OCaml
*)
let majority_element nums =
  fst (List.fold_left (fun (cand, cnt) n ->
    if cnt = 0 then (n, 1)
    else if n = cand then (cand, cnt + 1)
    else (cand, cnt - 1)
  ) (0, 0) nums)
