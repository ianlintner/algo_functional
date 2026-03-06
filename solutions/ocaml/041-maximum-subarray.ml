(*
  Problem 41: Maximum Subarray (LeetCode 53)
  Difficulty: Med
  Language: OCaml
*)
let max_sub_array = function
  | [] -> failwith "empty"
  | x :: xs ->
    fst (List.fold_left (fun (best, cur) n ->
      let cur' = max n (cur + n) in
      (max best cur', cur')) (x, x) xs)
