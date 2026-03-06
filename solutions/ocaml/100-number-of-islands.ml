(*
  Problem 100: Number of Islands (LeetCode 200)
  Difficulty: Med
  Language: OCaml
*)
module S = Set.Make(struct type t = int * int let compare = compare end)

let num_islands grid =
  let rows = Array.length grid and cols = Array.length grid.(0) in
  let rec flood r c vis =
    if r < 0 || r >= rows || c < 0 || c >= cols then vis
    else if grid.(r).(c) <> '1' || S.mem (r, c) vis then vis
    else List.fold_left (fun v (dr,dc) -> flood (r+dr) (c+dc) v)
           (S.add (r, c) vis)
           [(-1,0);(1,0);(0,-1);(0,1)] in
  let cnt = ref 0 and vis = ref S.empty in
  for r = 0 to rows - 1 do
    for c = 0 to cols - 1 do
      if grid.(r).(c) = '1' && not (S.mem (r, c) !vis) then begin
        cnt := !cnt + 1; vis := flood r c !vis end
    done done;
  !cnt
