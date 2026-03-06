(*
  Problem 110: Maximal Square (LeetCode 221)
  Difficulty: Med
  Language: OCaml
*)
let maximal_square matrix =
  let rows = Array.length matrix and cols = Array.length matrix.(0) in
  let dp = Array.init rows (fun r ->
    Array.init cols (fun c ->
      if matrix.(r).(c) = '0' then 0
      else if r = 0 || c = 0 then 1
      else 0)) in
  for r = 1 to rows - 1 do
    for c = 1 to cols - 1 do
      if matrix.(r).(c) <> '0' then
        dp.(r).(c) <- min (min dp.(r-1).(c-1) dp.(r-1).(c)) dp.(r).(c-1) + 1
    done
  done;
  let mx = Array.fold_left (fun best row ->
    Array.fold_left max best row) 0 dp in
  mx * mx
