(*
  Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
  Difficulty: Med
  Language: OCaml
*)
let eval_rpn tokens =
  let step stack t = match stack, t with
    | b :: a :: rest, "+" -> (a + b) :: rest
    | b :: a :: rest, "-" -> (a - b) :: rest
    | b :: a :: rest, "*" -> (a * b) :: rest
    | b :: a :: rest, "/" -> (a / b) :: rest
    | _, n -> int_of_string n :: stack in
  List.fold_left step [] tokens |> List.hd
