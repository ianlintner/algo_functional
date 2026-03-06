(*
  Problem 167: K Closest Points to Origin (LeetCode 973)
  Difficulty: Med
  Language: OCaml
*)
let k_closest points k =
  points
  |> List.sort (fun [x1;y1] [x2;y2] ->
    compare (x1*x1 + y1*y1) (x2*x2 + y2*y2))
  |> List.filteri (fun i _ -> i < k)
