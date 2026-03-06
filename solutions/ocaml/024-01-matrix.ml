(*
  Problem 24: 01 Matrix (LeetCode 542)
  Difficulty: Med
  Language: OCaml
*)
let update_matrix mat =
  let rows = Array.length mat in
  let cols = Array.length mat.(0) in
  let inf = rows + cols in
  let dist = Array.init rows (fun r ->
    Array.init cols (fun c ->
      if mat.(r).(c) = 0 then 0 else inf)) in
  for r = 0 to rows - 1 do
    for c = 0 to cols - 1 do
      if r > 0 then dist.(r).(c) <- min dist.(r).(c) (dist.(r-1).(c) + 1);
      if c > 0 then dist.(r).(c) <- min dist.(r).(c) (dist.(r).(c-1) + 1)
    done
  done;
  for r = rows - 1 downto 0 do
    for c = cols - 1 downto 0 do
      if r < rows - 1 then dist.(r).(c) <- min dist.(r).(c) (dist.(r+1).(c) + 1);
      if c < cols - 1 then dist.(r).(c) <- min dist.(r).(c) (dist.(r).(c+1) + 1)
    done
  done;
  dist
