(*
  Problem 146: Longest Increasing Path in a Matrix (LeetCode 329)
  Difficulty: Hard
  Language: OCaml
*)
let longest_increasing_path matrix =
  let rows = Array.length matrix in
  let cols = Array.length matrix.(0) in
  let memo = Hashtbl.create (rows * cols) in
  let dirs = [(0,1);(0,-1);(1,0);(-1,0)] in
  let rec dfs r c =
    match Hashtbl.find_opt memo (r,c) with
    | Some v -> v
    | None ->
      let best = List.fold_left (fun mx (dr,dc) ->
        let nr = r+dr and nc = c+dc in
        if nr >= 0 && nr < rows && nc >= 0 && nc < cols
           && matrix.(nr).(nc) > matrix.(r).(c)
        then max mx (dfs nr nc) else mx) 0 dirs in
      Hashtbl.add memo (r,c) (best+1); best+1
  in
  let result = ref 0 in
  for r = 0 to rows-1 do for c = 0 to cols-1 do
    result := max !result (dfs r c) done done; !result
