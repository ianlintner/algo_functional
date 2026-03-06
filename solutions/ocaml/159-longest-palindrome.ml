(*
  Problem 159: Longest Palindrome (LeetCode 409)
  Difficulty: Easy
  Language: OCaml
*)
let longest_palindrome s =
  let freq = Hashtbl.create 26 in
  String.iter (fun ch ->
    let c = try Hashtbl.find freq ch with Not_found -> 0 in
    Hashtbl.replace freq ch (c + 1)) s;
  let pairs = Hashtbl.fold (fun _ cnt acc -> acc + (cnt / 2) * 2) freq 0 in
  pairs + (if pairs < String.length s then 1 else 0)
