(*
  Problem 9: Container With Most Water (LeetCode 11)
  Difficulty: Med
  Language: OCaml
*)
let max_area height =
  let arr = Array.of_list height in
  let n = Array.length arr in
  let rec solve l r best =
    if l >= r then best
    else
      let area = min arr.(l) arr.(r) * (r - l) in
      let new_best = max best area in
      if arr.(l) < arr.(r) then solve (l + 1) r new_best
      else solve l (r - 1) new_best
  in
  solve 0 (n - 1) 0
