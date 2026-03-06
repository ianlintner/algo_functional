(*
  Problem 109: Contains Duplicate (LeetCode 217)
  Difficulty: Easy
  Language: OCaml
*)
module IS = Set.Make(Int)

let contains_duplicate nums =
  let rec go seen = function
    | [] -> false
    | x :: xs -> IS.mem x seen || go (IS.add x seen) xs
  in go IS.empty nums
