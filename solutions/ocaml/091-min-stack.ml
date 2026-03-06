(*
  Problem 91: Min Stack (LeetCode 155)
  Difficulty: Med
  Language: OCaml
*)
type min_stack = (int * int) list

let push stack x =
  let cur_min = match stack with [] -> x | (_, m) :: _ -> min x m in
  (x, cur_min) :: stack

let pop = function _ :: rest -> rest | [] -> []
let top = function (v, _) :: _ -> v | [] -> failwith "empty"
let get_min = function (_, m) :: _ -> m | [] -> failwith "empty"
