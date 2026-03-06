(*
  Problem 14: 3Sum Closest (LeetCode 16)
  Difficulty: Med
  Language: OCaml
*)
let three_sum_closest nums target =
  let sorted = List.sort compare nums |> Array.of_list in
  let n = Array.length sorted in
  let closest = ref (sorted.(0) + sorted.(1) + sorted.(2)) in
  for i = 0 to n - 3 do
    let l = ref (i + 1) and r = ref (n - 1) in
    while !l < !r do
      let sum = sorted.(i) + sorted.(!l) + sorted.(!r) in
      if abs (sum - target) < abs (!closest - target) then closest := sum;
      if sum < target then incr l
      else if sum > target then decr r
      else (l := !r)
    done
  done;
  !closest
