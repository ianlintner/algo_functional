(*
  Problem 37: Group Anagrams (LeetCode 49)
  Difficulty: Med
  Language: OCaml
*)
let group_anagrams strs =
  let module SMap = Map.Make(String) in
  let sorted s =
    let cs = List.init (String.length s) (String.get s) in
    let sorted = List.sort Char.compare cs in
    String.init (List.length sorted) (List.nth sorted)
  in
  let map = List.fold_left (fun acc s ->
    let key = sorted s in
    let curr = try SMap.find key acc with Not_found -> [] in
    SMap.add key (s :: curr) acc
  ) SMap.empty strs in
  SMap.fold (fun _ v acc -> v :: acc) map []
