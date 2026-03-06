(*
  Problem 151: Backspace String Compare (LeetCode 844)
  Difficulty: Easy
  Language: OCaml
*)
let backspace_compare s t =
  let build str =
    String.fold_left (fun acc ch ->
      if ch = '#' then
        if String.length acc > 0 then String.sub acc 0 (String.length acc - 1) else acc
      else acc ^ String.make 1 ch) "" str in
  build s = build t
