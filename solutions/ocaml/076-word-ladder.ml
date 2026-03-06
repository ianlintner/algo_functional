(*
  Problem 76: Word Ladder (LeetCode 127)
  Difficulty: Hard
  Language: OCaml
*)
let ladder_length begin_w end_w word_list =
  let module SS = Set.Make(String) in
  let dict = List.fold_left (fun s w -> SS.add w s) SS.empty word_list in
  if not (SS.mem end_w dict) then 0
  else
    let neighbors w =
      let len = String.length w in
      List.init len (fun i ->
        List.init 26 (fun c ->
          let s = Bytes.of_string w in
          Bytes.set s i (Char.chr (c + Char.code 'a'));
          Bytes.to_string s))
      |> List.concat |> List.filter (fun nw -> SS.mem nw dict) in
    let rec bfs = function
      | [] -> 0
      | (w, d) :: _ when w = end_w -> d
      | (w, d) :: rest ->
        let ns = List.filter (fun n -> not (SS.mem n (List.fold_left (fun s (w,_) -> SS.add w s)
          SS.empty ((w,d)::rest)))) (neighbors w) in
        bfs (rest @ List.map (fun n -> (n, d+1)) ns)
    in bfs [(begin_w, 1)]
