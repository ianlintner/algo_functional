(*
  Problem 17: Remove Nth Node From End of List (LeetCode 19)
  Difficulty: Med
  Language: OCaml
*)
let remove_nth_from_end lst n =
  let len = List.length lst in
  let idx = len - n in
  List.filteri (fun i _ -> i <> idx) lst
