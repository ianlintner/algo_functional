(*
  Problem 16: Contiguous Array (LeetCode 525)
  Difficulty: Med
  Language: OCaml
*)
module IntMap = Map.Make(Int)

let find_max_length nums =
  let arr = Array.of_list nums in
  let (_, _, result) =
    Array.fold_left
      (fun (seen, count, best) (i, num) ->
        let new_count = count + (if num = 1 then 1 else -1) in
        let new_best = match IntMap.find_opt new_count seen with
          | Some j -> max best (i - j)
          | None -> best
        in
        let new_seen = if IntMap.mem new_count seen then seen
          else IntMap.add new_count i seen in
        (new_seen, new_count, new_best))
      (IntMap.singleton 0 (-1), 0, 0)
      (Array.mapi (fun i x -> (i, x)) arr)
  in
  result
