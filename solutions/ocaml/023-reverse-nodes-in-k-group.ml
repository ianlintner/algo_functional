(*
  Problem 23: Reverse Nodes in k-Group (LeetCode 25)
  Difficulty: Hard
  Language: OCaml
*)
let reverse_k_group lst k =
  let rec take_drop n xs acc =
    if n = 0 then (List.rev acc, xs)
    else match xs with
      | [] -> (List.rev acc, [])
      | x :: rest -> take_drop (n - 1) rest (x :: acc)
  in
  let rec process xs =
    let (group, rest) = take_drop k xs [] in
    if List.length group < k then xs
    else List.rev group @ process rest
  in
  process lst
