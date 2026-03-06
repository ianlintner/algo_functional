(*
  Problem 77: Longest Consecutive Sequence (LeetCode 128)
  Difficulty: Med
  Language: OCaml
*)
let longest_consecutive nums =
  let module S = Set.Make(Int) in
  let s = List.fold_left (fun acc x -> S.add x acc) S.empty nums in
  let rec count_from n = if S.mem n s then 1 + count_from (n+1) else 0 in
  S.fold (fun n mx ->
    if S.mem (n-1) s then mx else max mx (count_from n)) s 0
