(*
  Problem 131: Encode and Decode Strings (LeetCode 271)
  Difficulty: Med
  Language: OCaml
*)
let encode strs =
  List.fold_left (fun acc s ->
    acc ^ string_of_int (String.length s) ^ "#" ^ s) "" strs

let decode s =
  let rec helper i acc =
    if i >= String.length s then List.rev acc
    else
      let hash = String.index_from s i '#' in
      let len = int_of_string (String.sub s i (hash - i)) in
      let word = String.sub s (hash + 1) len in
      helper (hash + 1 + len) (word :: acc)
  in helper 0 []
