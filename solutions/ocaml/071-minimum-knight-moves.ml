(*
  Problem 71: Minimum Knight Moves (LeetCode 1197)
  Difficulty: Med
  Language: OCaml
*)
let min_knight_moves x y =
  let tx = abs x and ty = abs y in
  let moves = [(1,2);(2,1);(2,-1);(1,-2);(-1,-2);(-2,-1);(-2,1);(-1,2)] in
  let module S = Set.Make(struct type t = int*int let compare = compare end) in
  let rec bfs queue vis = match queue with
    | [] -> -1
    | (cx,cy,d)::rest ->
      if cx = tx && cy = ty then d
      else
        let nexts = List.filter_map (fun (dx,dy) ->
          let nx = cx+dx and ny = cy+dy in
          if nx >= -2 && ny >= -2 && not (S.mem (nx,ny) vis)
          then Some (nx,ny,d+1) else None) moves in
        let vis' = List.fold_left (fun s (a,b,_) -> S.add (a,b) s) vis nexts in
        bfs (rest @ nexts) vis'
  in bfs [(0,0,0)] (S.singleton (0,0))
