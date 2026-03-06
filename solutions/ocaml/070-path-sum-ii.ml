(*
  Problem 70: Path Sum II (LeetCode 113)
  Difficulty: Med
  Language: OCaml
*)
let rec path_sum node target = match node with
  | Nil -> []
  | Node (v, Nil, Nil) -> if v = target then [[v]] else []
  | Node (v, l, r) ->
    let remain = target - v in
    List.map (fun p -> v :: p)
      (path_sum l remain @ path_sum r remain)
