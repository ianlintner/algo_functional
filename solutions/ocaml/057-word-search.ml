(*
  Problem 57: Word Search (LeetCode 79)
  Difficulty: Med
  Language: OCaml
*)
module PSet = Set.Make(struct
  type t = int * int
  let compare = compare
end)

let exist board word =
  let rows = Array.length board and cols = Array.length board.(0) in
  let wlen = String.length word in
  let rec dfs r c i vis =
    if i = wlen then true
    else if r < 0 || r >= rows || c < 0 || c >= cols then false
    else if PSet.mem (r,c) vis || board.(r).(c) <> word.[i] then false
    else
      let vis' = PSet.add (r,c) vis in
      List.exists (fun (dr,dc) -> dfs (r+dr) (c+dc) (i+1) vis')
        [(1,0);(-1,0);(0,1);(0,-1)]
  in
  let coords = List.init rows (fun r -> List.init cols (fun c -> (r,c)))
               |> List.flatten in
  List.exists (fun (r,c) -> dfs r c 0 PSet.empty) coords
