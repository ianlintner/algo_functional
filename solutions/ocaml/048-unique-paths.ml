(*
  Problem 48: Unique Paths (LeetCode 62)
  Difficulty: Med
  Language: OCaml
*)
let unique_paths m n =
  let k = min (m - 1) (n - 1) in
  let rec go i acc =
    if i >= k then acc
    else go (i + 1) (acc * (m + n - 2 - i) / (i + 1))
  in go 0 1
