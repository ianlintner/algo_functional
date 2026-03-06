(*
  Problem 116: Daily Temperatures (LeetCode 739)
  Difficulty: Med
  Language: OCaml
*)
let daily_temperatures temps =
  let n = Array.length temps in
  let res = Array.make n 0 in
  let rec go i stack =
    if i < 0 then res
    else
      let rec pop = function
        | j :: rest when temps.(j) <= temps.(i) -> pop rest
        | s -> s in
      let s = pop stack in
      res.(i) <- (match s with [] -> 0 | j :: _ -> j - i);
      go (i - 1) (i :: s)
  in go (n - 1) []
