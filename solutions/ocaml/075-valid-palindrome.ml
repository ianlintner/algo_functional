(*
  Problem 75: Valid Palindrome (LeetCode 125)
  Difficulty: Easy
  Language: OCaml
*)
let is_palindrome s =
  let cleaned = String.lowercase_ascii s
    |> String.to_seq |> Seq.filter (fun c ->
      (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'))
    |> List.of_seq in
  cleaned = List.rev cleaned
