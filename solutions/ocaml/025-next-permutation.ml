(*
  Problem 25: Next Permutation (LeetCode 31)
  Difficulty: Med
  Language: OCaml
*)
let next_permutation nums =
  let arr = Array.copy nums in
  let n = Array.length arr in
  let swap i j =
    let tmp = arr.(i) in
    arr.(i) <- arr.(j); arr.(j) <- tmp
  in
  let reverse_sub lo hi =
    let lo = ref lo and hi = ref hi in
    while !lo < !hi do swap !lo !hi; incr lo; decr hi done
  in
  let i = ref (n - 2) in
  while !i >= 0 && arr.(!i) >= arr.(!i + 1) do decr i done;
  if !i < 0 then reverse_sub 0 (n - 1)
  else begin
    let j = ref (n - 1) in
    while arr.(!j) <= arr.(!i) do decr j done;
    swap !i !j;
    reverse_sub (!i + 1) (n - 1)
  end;
  arr
