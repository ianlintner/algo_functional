(*
  Problem 12: Longest Common Prefix (LeetCode 14)
  Difficulty: Easy
  Language: OCaml
*)
let longest_common_prefix strs =
  match strs with
  | [] -> ""
  | first :: rest ->
    List.fold_left (fun prefix s ->
      let len = min (String.length prefix) (String.length s) in
      let rec find i =
        if i >= len || prefix.[i] <> s.[i] then i
        else find (i + 1)
      in
      String.sub prefix 0 (find 0)
    ) first rest
