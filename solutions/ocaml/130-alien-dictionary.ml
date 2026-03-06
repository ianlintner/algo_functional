(*
  Problem 130: Alien Dictionary (LeetCode 269)
  Difficulty: Hard
  Language: OCaml
*)
let alien_order words =
  let module CMap = Map.Make(Char) in
  let module CSet = Set.Make(Char) in
  let chars = List.fold_left (fun s w ->
    String.fold_left (fun s c -> CSet.add c s) s w) CSet.empty words in
  let find_edge w1 w2 =
    let rec go i =
      if i >= min (String.length w1) (String.length w2) then None
      else if w1.[i] <> w2.[i] then Some (w1.[i], w2.[i])
      else go (i + 1) in go 0 in
  let pairs = List.combine (List.rev (List.tl (List.rev words))) (List.tl words) in
  let edges = List.filter_map (fun (a, b) -> find_edge a b) pairs in
  let graph = CSet.fold (fun c g -> CMap.add c CSet.empty g) chars CMap.empty in
  let graph = List.fold_left (fun g (u, v) ->
    CMap.update u (function
      | None -> Some (CSet.singleton v)
      | Some s -> Some (CSet.add v s)) g) graph edges in
  let in_deg = CSet.fold (fun c m -> CMap.add c 0 m) chars CMap.empty in
  let in_deg = List.fold_left (fun m (_, v) ->
    CMap.update v (function
      | None -> Some 1 | Some n -> Some (n + 1)) m) in_deg edges in
  let start = CMap.fold (fun c d acc -> if d = 0 then c :: acc else acc)
    in_deg [] in
  let rec topo queue res deg =
    match queue with
    | [] -> if String.length res = CSet.cardinal chars then res else ""
    | c :: rest ->
      let nbs = CSet.elements (CMap.find c graph) in
      let (deg', q') = List.fold_left (fun (d, q) n ->
        let d' = CMap.update n (function
          | Some x -> Some (x - 1) | None -> None) d in
        if CMap.find n d' = 0 then (d', q @ [n]) else (d', q))
        (deg, rest) nbs in
      topo q' (res ^ String.make 1 c) deg'
  in topo start "" in_deg
