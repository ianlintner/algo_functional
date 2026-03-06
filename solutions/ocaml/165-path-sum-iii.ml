(*
  Problem 165: Path Sum III (LeetCode 437)
  Difficulty: Med
  Language: OCaml
*)
type tree = Nil | Node of int * tree * tree

let path_sum root target =
  let module M = Map.Make(Int) in
  let rec dfs node prefix curr = match node with
    | Nil -> 0
    | Node (v, l, r) ->
      let sum_ = curr + v in
      let count = try M.find (sum_ - target) prefix with Not_found -> 0 in
      let prefix' = M.add sum_ ((try M.find sum_ prefix with Not_found -> 0) + 1) prefix in
      count + dfs l prefix' sum_ + dfs r prefix' sum_
  in dfs root (M.singleton 0 1) 0
