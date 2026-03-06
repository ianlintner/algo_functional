(*
  Problem 42: Spiral Matrix (LeetCode 54)
  Difficulty: Med
  Language: OCaml
*)
let spiral_order matrix =
  let rec transpose = function
    | [] | [] :: _ -> []
    | m -> List.map List.hd m :: transpose (List.map List.tl m)
  in
  let rotate m = List.map List.rev (transpose m) in
  let rec go = function
    | [] -> []
    | top :: rest -> top @ go (rotate rest)
  in go matrix
