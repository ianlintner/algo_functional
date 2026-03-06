(*
  Problem 40: Subarray Sum Equals K (LeetCode 560)
  Difficulty: Med
  Language: OCaml
*)
let subarray_sum nums k =
  let module IMap = Map.Make(Int) in
  let (count, _, _) =
    List.fold_left (fun (count, sum, map) n ->
      let s = sum + n in
      let c = count + (try IMap.find (s - k) map with Not_found -> 0) in
      let m = IMap.update s (function None -> Some 1 | Some v -> Some (v+1)) map in
      (c, s, m)
    ) (0, 0, IMap.singleton 0 1) nums
  in count
