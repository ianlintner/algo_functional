(*
  Problem 169: Time Based Key-Value Store (LeetCode 981)
  Difficulty: Med
  Language: OCaml
*)
module StringMap = Map.Make(String)
module IntMap = Map.Make(Int)

type time_map = string IntMap.t StringMap.t ref

let create () : time_map = ref StringMap.empty

let set tm key value timestamp =
  let inner = try StringMap.find key !tm with Not_found -> IntMap.empty in
  tm := StringMap.add key (IntMap.add timestamp value inner) !tm

let get tm key timestamp =
  try
    let inner = StringMap.find key !tm in
    let (_, v, _) = IntMap.split timestamp inner in
    match v with
    | Some v -> v
    | None ->
      (try let (_, v) = IntMap.max_binding (IntMap.filter (fun k _ -> k <= timestamp) inner) in v
       with Not_found -> "")
  with Not_found -> ""
