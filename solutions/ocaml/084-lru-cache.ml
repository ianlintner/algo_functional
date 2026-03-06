(*
  Problem 84: LRU Cache (LeetCode 146)
  Difficulty: Med
  Language: OCaml
*)
type ('k, 'v) lru = { cap: int; order: 'k list; cache: ('k * 'v) list }

let lru_new cap = { cap; order = []; cache = [] }

let lru_get key lru = match List.assoc_opt key lru.cache with
  | None -> (None, lru)
  | Some v ->
    let order = List.filter ((<>) key) lru.order @ [key] in
    (Some v, { lru with order })

let lru_put key value lru =
  let order = List.filter ((<>) key) lru.order @ [key] in
  let cache = (key, value) :: List.remove_assoc key lru.cache in
  if List.length order > lru.cap then
    let evict = List.hd order in
    { lru with order = List.tl order; cache = List.remove_assoc evict cache }
  else { lru with order; cache }
