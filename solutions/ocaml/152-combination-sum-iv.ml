(*
  Problem 152: Combination Sum IV (LeetCode 377)
  Difficulty: Med
  Language: OCaml
*)
let combination_sum4 nums target =
  let dp = Array.make (target + 1) 0 in
  dp.(0) <- 1;
  for i = 1 to target do
    dp.(i) <- List.fold_left (fun sum n ->
      if n <= i then sum + dp.(i - n) else sum) 0 nums
  done; dp.(target)
