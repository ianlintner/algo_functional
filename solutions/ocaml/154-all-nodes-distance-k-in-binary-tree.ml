(*
  Problem 154: All Nodes Distance K in Binary Tree (LeetCode 863)
  Difficulty: Med
  Language: OCaml
*)
let distance_k adj target k =
  let visited = Hashtbl.create 16 in
  Hashtbl.add visited target true;
  let rec bfs = function
    | [] -> []
    | (node, dist) :: rest when dist = k ->
      node :: bfs rest
    | (node, dist) :: rest ->
      let neighbors = try Hashtbl.find adj node with Not_found -> [] in
      let nexts = List.filter (fun n -> not (Hashtbl.mem visited n)) neighbors in
      List.iter (fun n -> Hashtbl.add visited n true) nexts;
      bfs (rest @ List.map (fun n -> (n, dist + 1)) nexts)
  in bfs [(target, 0)]
