(*
  Problem 18: Valid Parentheses (LeetCode 20)
  Difficulty: Easy
  Language: OCaml
*)
let is_valid s =
  let matching = function ')' -> '(' | ']' -> '[' | '}' -> '{' | c -> c in
  let stack =
    String.fold_left (fun stk ch ->
      match ch, stk with
      | ('(' | '{' | '['), _ -> ch :: stk
      | (')' | ']' | '}'), top :: rest when top = matching ch -> rest
      | _, _ -> ch :: stk
    ) [] s
  in
  stack = []
