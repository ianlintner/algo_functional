(*
  Problem 168: Squares of a Sorted Array (LeetCode 977)
  Difficulty: Easy
  Language: OCaml
*)
let sorted_squares nums =
  let arr = Array.of_list nums in
  let n = Array.length arr in
  let result = Array.make n 0 in
  let rec merge l r i =
    if i < 0 then Array.to_list result
    else if abs arr.(l) >= abs arr.(r) then begin
      result.(i) <- arr.(l) * arr.(l); merge (l + 1) r (i - 1)
    end else begin
      result.(i) <- arr.(r) * arr.(r); merge l (r - 1) (i - 1)
    end
  in merge 0 (n - 1) (n - 1)
