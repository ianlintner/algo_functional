(*
  Problem 142: Bus Routes (LeetCode 815)
  Difficulty: Hard
  Language: OCaml
*)
let num_buses_to_destination routes source target =
  if source = target then 0
  else
    let stop_map = Hashtbl.create 100 in
    List.iteri (fun ri route ->
      List.iter (fun s ->
        let cur = try Hashtbl.find stop_map s with Not_found -> [] in
        Hashtbl.replace stop_map s (ri :: cur)) route) routes;
    let visited = Hashtbl.create 100 in
    let v_routes = Hashtbl.create 100 in
    Hashtbl.replace visited source true;
    let rec bfs queue buses =
      if queue = [] then -1
      else if List.mem target queue then buses
      else
        let next = List.fold_left (fun acc stop ->
          let ris = try Hashtbl.find stop_map stop with Not_found -> [] in
          List.fold_left (fun acc2 ri ->
            if Hashtbl.mem v_routes ri then acc2
            else begin
              Hashtbl.replace v_routes ri true;
              List.fold_left (fun acc3 ns ->
                if Hashtbl.mem visited ns then acc3
                else begin Hashtbl.replace visited ns true; ns :: acc3 end
              ) acc2 (List.nth routes ri)
            end) acc ris) [] queue
        in bfs next (buses + 1)
    in bfs [source] 0
