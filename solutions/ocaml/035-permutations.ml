(*
  Problem 35: Permutations (LeetCode 46)
  Difficulty: Med
  Language: OCaml
*)
let rec permute = function
  | [] -> [[]]
  | xs ->
    List.concat_map (fun x ->
      let rest = List.filter (fun y -> y <> x) xs in
      List.map (fun p -> x :: p) (permute rest)
    ) xs
