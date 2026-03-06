(*
  Problem 29: Valid Sudoku (LeetCode 36)
  Difficulty: Med
  Language: OCaml
*)
let is_valid_sudoku board =
  let entries =
    List.concat_mapi (fun i row ->
      List.filter_map (fun (j, c) ->
        if c = '.' then None
        else Some (i, j, c)
      ) (List.mapi (fun j c -> (j, c)) row)
    ) board
  in
  let keys = List.concat_map (fun (i, j, c) ->
    [ Printf.sprintf "r%d:%c" i c;
      Printf.sprintf "c%d:%c" j c;
      Printf.sprintf "b%d,%d:%c" (i/3) (j/3) c ]
  ) entries in
  let module SSet = Set.Make(String) in
  List.length keys = SSet.cardinal (SSet.of_list keys)
