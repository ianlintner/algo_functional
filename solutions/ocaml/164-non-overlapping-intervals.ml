(*
  Problem 164: Non-overlapping Intervals (LeetCode 435)
  Difficulty: Med
  Language: OCaml
*)
let erase_overlap_intervals intervals =
  let sorted = List.sort (fun (_, e1) (_, e2) -> compare e1 e2) intervals in
  let rec go last_end = function
    | [] -> 0
    | (s, e) :: rest ->
      if s < last_end then 1 + go last_end rest
      else go e rest
  in go min_int sorted
