(*
  Problem 56: Subsets (LeetCode 78)
  Difficulty: Med
  Language: OCaml
*)
let subsets nums =
  List.fold_left (fun acc n ->
    acc @ List.map (fun sub -> n :: sub) acc
  ) [[]] nums
