(*
  Problem 158: Random Pick with Weight (LeetCode 528)
  Difficulty: Med
  Language: OCaml
*)
let build_picker weights =
  let prefix = List.fold_left (fun acc w ->
    (match acc with [] -> w | h :: _ -> h + w) :: acc) [] weights
    |> List.rev in
  (prefix, List.nth prefix (List.length prefix - 1))

let pick (prefix, total) =
  let target = 1 + Random.int total in
  let arr = Array.of_list prefix in
  let rec search lo hi =
    if lo >= hi then lo
    else let mid = (lo + hi) / 2 in
      if arr.(mid) < target then search (mid + 1) hi else search lo mid
  in search 0 (Array.length arr - 1)
