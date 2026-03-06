(*
  Problem 20: Generate Parentheses (LeetCode 22)
  Difficulty: Med
  Language: OCaml
*)
let generate_parenthesis n =
  let rec gen open_count close current =
    if String.length current = 2 * n then [current]
    else
      let left = if open_count < n then gen (open_count + 1) close (current ^ "(") else [] in
      let right = if close < open_count then gen open_count (close + 1) (current ^ ")") else [] in
      left @ right
  in
  gen 0 0 ""
