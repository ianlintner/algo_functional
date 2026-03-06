(*
  Problem 162: Maximum Frequency Stack (LeetCode 895)
  Difficulty: Hard
  Language: OCaml
*)
module IntMap = Map.Make(Int)

type freq_stack = {
  freq: int IntMap.t;
  group: int list IntMap.t;
  max_freq: int;
}

let empty = { freq = IntMap.empty; group = IntMap.empty; max_freq = 0 }

let push val_ s =
  let f = (try IntMap.find val_ s.freq with Not_found -> 0) + 1 in
  let grp = try IntMap.find f s.group with Not_found -> [] in
  { freq = IntMap.add val_ f s.freq;
    group = IntMap.add f (val_ :: grp) s.group;
    max_freq = max s.max_freq f }

let pop s =
  match IntMap.find s.max_freq s.group with
  | v :: rest ->
    let group' = if rest = [] then IntMap.remove s.max_freq s.group
                 else IntMap.add s.max_freq rest s.group in
    let mf' = if rest = [] then s.max_freq - 1 else s.max_freq in
    (v, { freq = IntMap.add v (IntMap.find v s.freq - 1) s.freq;
          group = group'; max_freq = mf' })
  | [] -> failwith "empty"
