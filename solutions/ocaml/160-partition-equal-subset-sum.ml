(*
  Problem 160: Partition Equal Subset Sum (LeetCode 416)
  Difficulty: Med
  Language: OCaml
*)
module IntSet = Set.Make(Int)

let can_partition nums =
  let total = List.fold_left (+) 0 nums in
  if total mod 2 <> 0 then false
  else
    let target = total / 2 in
    let dp = List.fold_left (fun dp n ->
      IntSet.union dp (IntSet.map (fun s -> s + n) dp)
    ) (IntSet.singleton 0) nums in
    IntSet.mem target dp
