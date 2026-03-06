(*
  Problem 98: House Robber (LeetCode 198)
  Difficulty: Med
  Language: OCaml
*)
let rob nums =
  fst (List.fold_left (fun (p1, p2) n -> (max p1 (p2 + n), p1)) (0, 0) nums)
