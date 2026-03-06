(*
  Problem 104: Accounts Merge (LeetCode 721)
  Difficulty: Med
  Language: OCaml
*)
module SM = Map.Make(String)

let accounts_merge accounts =
  let find uf x =
    let rec go uf x = match SM.find_opt x uf with
      | None -> (SM.add x x uf, x)
      | Some p when p = x -> (uf, x)
      | Some p -> let (uf', r) = go uf p in (SM.add x r uf', r)
    in go uf x in
  let union uf a b =
    let (u1, ra) = find uf a in
    let (u2, rb) = find u1 b in
    if ra = rb then u2 else SM.add ra rb u2 in
  let (uf, owner) = List.fold_left (fun (u, o) acc ->
    let name = List.hd acc and emails = List.tl acc in
    List.fold_left (fun (u2, o2) e ->
      (union u2 (List.hd emails) e, SM.add e name o2)
    ) (u, o) emails
  ) (SM.empty, SM.empty) accounts in
  let groups = SM.fold (fun e _ g ->
    let (_, r) = find uf e in
    SM.add r (e :: (try SM.find r g with Not_found -> [])) g
  ) owner SM.empty in
  SM.fold (fun _ es acc ->
    let sorted = List.sort compare es in
    (SM.find (List.hd sorted) owner :: sorted) :: acc
  ) groups []
