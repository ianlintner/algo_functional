(*
  Problem 53: Sort Colors (LeetCode 75)
  Difficulty: Med
  Language: OCaml
*)
let sort_colors nums =
  let counts = List.fold_left (fun (r,w,b) n ->
    match n with 0 -> (r+1,w,b) | 1 -> (r,w+1,b) | _ -> (r,w,b+1)
  ) (0,0,0) nums in
  let (r,w,b) = counts in
  List.init r (fun _ -> 0) @ List.init w (fun _ -> 1) @ List.init b (fun _ -> 2)
