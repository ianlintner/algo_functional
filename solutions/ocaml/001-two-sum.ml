(*
  Problem 1: Two Sum (LeetCode 1)
  Difficulty: Easy
  Language: OCaml
*)
module IntMap = Map.Make(Int)

let two_sum nums target =
  let (_, result) =
    Array.fold_left
      (fun (i, (map, res)) num ->
        let complement = target - num in
        match IntMap.find_opt complement map with
        | Some j -> (i + 1, (map, [j; i]))
        | None   -> (i + 1, (IntMap.add num i map, res)))
      (0, (IntMap.empty, []))
      nums
  in
  result
