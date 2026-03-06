(*
  Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
  Difficulty: Easy
  Language: OCaml
*)
let max_profit prices =
  List.fold_left (fun (mn, mx) p ->
    (min mn p, max mx (p - mn))) (max_int, 0) prices |> snd
