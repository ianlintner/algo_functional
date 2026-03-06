(*
  Problem 149: Counting Bits (LeetCode 338)
  Difficulty: Easy
  Language: OCaml
*)
let count_bits n =
  let dp = Array.make (n + 1) 0 in
  List.iter (fun i ->
    dp.(i) <- dp.(i lsr 1) + (i land 1)
  ) (List.init (n + 1) Fun.id);
  Array.to_list dp
