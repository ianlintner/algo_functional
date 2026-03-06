(*
  Problem 139: Serialize and Deserialize Binary Tree (LeetCode 297)
  Difficulty: Hard
  Language: OCaml
*)
type tree = Leaf | Node of int * tree * tree

let serialize root =
  let rec go = function
    | Leaf -> "null"
    | Node (v, l, r) ->
      string_of_int v ^ "," ^ go l ^ "," ^ go r
  in go root

let deserialize data =
  let tokens = String.split_on_char ',' data in
  let rec build = function
    | "null" :: rest -> (Leaf, rest)
    | v :: rest ->
      let (left, r1) = build rest in
      let (right, r2) = build r1 in
      (Node (int_of_string v, left, right), r2)
    | [] -> (Leaf, [])
  in fst (build tokens)
