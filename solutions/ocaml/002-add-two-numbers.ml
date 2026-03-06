(*
  Problem 2: Add Two Numbers (LeetCode 2)
  Difficulty: Med
  Language: OCaml
*)
type 'a node = Nil | Cons of 'a * 'a node

let rec add_two_numbers l1 l2 carry =
  match l1, l2, carry with
  | Nil, Nil, 0 -> Nil
  | _ ->
    let v1 = match l1 with Cons(v, _) -> v | Nil -> 0 in
    let v2 = match l2 with Cons(v, _) -> v | Nil -> 0 in
    let sum = v1 + v2 + carry in
    let rest1 = match l1 with Cons(_, t) -> t | Nil -> Nil in
    let rest2 = match l2 with Cons(_, t) -> t | Nil -> Nil in
    Cons(sum mod 10, add_two_numbers rest1 rest2 (sum / 10))
