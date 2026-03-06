(*
  Problem 15: Letter Combinations of a Phone Number (LeetCode 17)
  Difficulty: Med
  Language: OCaml
*)
let letter_combinations digits =
  if String.length digits = 0 then []
  else
    let phone = function
      | '2' -> ["a";"b";"c"] | '3' -> ["d";"e";"f"]
      | '4' -> ["g";"h";"i"] | '5' -> ["j";"k";"l"]
      | '6' -> ["m";"n";"o"] | '7' -> ["p";"q";"r";"s"]
      | '8' -> ["t";"u";"v"] | '9' -> ["w";"x";"y";"z"]
      | _ -> []
    in
    let chars = List.init (String.length digits) (String.get digits) in
    List.fold_left (fun combos d ->
      List.concat_map (fun combo ->
        List.map (fun ch -> combo ^ ch) (phone d)
      ) combos
    ) [""] chars
