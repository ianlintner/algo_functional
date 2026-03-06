(*
  Problem 140: Longest Increasing Subsequence (LeetCode 300)
  Difficulty: Med
  Language: OCaml
*)
let length_of_lis nums =
  let bisect tails target =
    let rec go lo hi =
      if lo >= hi then lo
      else let mid = lo + (hi - lo) / 2 in
        if tails.(mid) < target then go (mid + 1) hi
        else go lo mid
    in go 0 (Array.length tails) in
  let tails = Array.make 0 0 in
  let len = ref 0 in
  List.iter (fun num ->
    let pos = bisect tails num in
    if pos = !len then (
      let t = Array.make (!len + 1) 0 in
      Array.blit tails 0 t 0 !len;
      t.(pos) <- num;
      incr len)
    else tails.(pos) <- num
  ) nums;
  !len
