(*
  Problem 155: Ransom Note (LeetCode 383)
  Difficulty: Easy
  Language: OCaml
*)
let can_construct note magazine =
  let freq = Hashtbl.create 26 in
  String.iter (fun ch ->
    let c = try Hashtbl.find freq ch with Not_found -> 0 in
    Hashtbl.replace freq ch (c + 1)) magazine;
  String.fold_left (fun ok ch ->
    let c = try Hashtbl.find freq ch with Not_found -> 0 in
    Hashtbl.replace freq ch (c - 1); ok && c > 0) true note
