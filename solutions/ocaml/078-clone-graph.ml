(*
  Problem 78: Clone Graph (LeetCode 133)
  Difficulty: Med
  Language: OCaml
*)
let clone_graph node =
  let visited = Hashtbl.create 16 in
  let rec dfs n =
    match Hashtbl.find_opt visited n.v with
    | Some c -> c
    | None ->
      let clone = { v = n.v; neighbors = [] } in
      Hashtbl.add visited n.v clone;
      clone.neighbors <- List.map dfs n.neighbors;
      clone
  in dfs node
