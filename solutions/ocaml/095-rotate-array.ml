(*
  Problem 95: Rotate Array (LeetCode 189)
  Difficulty: Med
  Language: OCaml
*)
let rotate nums k =
  let n = List.length nums in
  let s = k mod n in
  let rec drop i = function [] -> [] | _ :: t as l -> if i = 0 then l else drop (i-1) t in
  let rec take i = function _ when i = 0 -> [] | [] -> [] | h :: t -> h :: take (i-1) t in
  drop (n - s) nums @ take (n - s) nums
