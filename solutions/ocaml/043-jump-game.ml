(*
  Problem 43: Jump Game (LeetCode 55)
  Difficulty: Med
  Language: OCaml
*)
let can_jump nums =
  let len = List.length nums in
  let reach = List.fold_left (fun reach (i, n) ->
    if i > reach then -1 else max reach (i + n)
  ) 0 (List.mapi (fun i n -> (i, n)) nums) in
  reach >= len - 1
