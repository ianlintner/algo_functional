(*
  Problem 26: Longest Valid Parentheses (LeetCode 32)
  Difficulty: Hard
  Language: OCaml
*)
let longest_valid_parentheses s =
  let scan cs open_c close_c =
    List.fold_left (fun (l, r, mx) c ->
      let l, r = if c = open_c then (l+1, r) else (l, r+1) in
      if r > l then (0, 0, mx)
      else if l = r then (l, r, max mx (2 * r))
      else (l, r, mx)
    ) (0, 0, 0) cs |> fun (_, _, mx) -> mx
  in
  let chars = List.init (String.length s) (String.get s) in
  max (scan chars '(' ')') (scan (List.rev chars) ')' '(')
