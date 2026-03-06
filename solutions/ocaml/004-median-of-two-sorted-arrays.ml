(*
  Problem 4: Median of Two Sorted Arrays (LeetCode 4)
  Difficulty: Hard
  Language: OCaml
*)
let find_median_sorted_arrays nums1 nums2 =
  let merged = Array.append nums1 nums2 in
  Array.sort compare merged;
  let n = Array.length merged in
  let mid = n / 2 in
  if n mod 2 = 0 then
    float_of_int (merged.(mid - 1) + merged.(mid)) /. 2.0
  else
    float_of_int merged.(mid)
