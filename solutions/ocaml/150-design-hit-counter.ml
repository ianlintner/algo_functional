(*
  Problem 150: Design Hit Counter (LeetCode 362)
  Difficulty: Med
  Language: OCaml
*)
type hit_counter = int list

let hit hc ts = hc @ [ts]

let get_hits hc ts =
  let filtered = List.filter (fun t -> t > ts - 300) hc in
  (List.length filtered, filtered)
