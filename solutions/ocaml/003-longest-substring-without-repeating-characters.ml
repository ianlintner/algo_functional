(*
  Problem 3: Longest Substring Without Repeating Characters (LeetCode 3)
  Difficulty: Med
  Language: OCaml
*)
module CharMap = Map.Make(Char)

let length_of_longest_substring s =
  let chars = Array.init (String.length s) (String.get s) in
  let (_, _, result) =
    Array.fold_left
      (fun (left, seen, best) (i, c) ->
        let new_left = match CharMap.find_opt c seen with
          | Some j -> max left (j + 1)
          | None   -> left
        in
        (new_left, CharMap.add c i seen, max best (i - new_left + 1)))
      (0, CharMap.empty, 0)
      (Array.mapi (fun i c -> (i, c)) chars)
  in
  result
