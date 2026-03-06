(*
  Problem 132: First Bad Version (LeetCode 278)
  Difficulty: Easy
  Language: OCaml
*)
let first_bad_version n is_bad =
  let rec search lo hi =
    if lo >= hi then lo
    else
      let mid = lo + (hi - lo) / 2 in
      if is_bad mid then search lo mid
      else search (mid + 1) hi
  in search 1 n
