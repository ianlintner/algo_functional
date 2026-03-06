(*
  Problem 47: Rotate List (LeetCode 61)
  Difficulty: Med
  Language: OCaml
*)
let rotate_right lst k =
  match lst with
  | [] -> []
  | _ ->
    let n = List.length lst in
    let rot = k mod n in
    if rot = 0 then lst
    else
      let rec split i acc = function
        | [] -> (List.rev acc, [])
        | x :: xs -> if i = 0 then (List.rev acc, x :: xs)
                     else split (i-1) (x :: acc) xs
      in
      let (front, back) = split (n - rot) [] lst in
      back @ front
