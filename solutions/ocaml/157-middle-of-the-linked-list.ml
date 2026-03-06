(*
  Problem 157: Middle of the Linked List (LeetCode 876)
  Difficulty: Easy
  Language: OCaml
*)
type list_node = { v: int; next: list_node option }

let middle_node head =
  let rec collect = function
    | None -> []
    | Some n -> n :: collect n.next in
  let nodes = collect head in
  let mid = List.length nodes / 2 in
  List.nth_opt nodes mid
