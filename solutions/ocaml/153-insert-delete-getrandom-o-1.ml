(*
  Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
  Difficulty: Med
  Language: OCaml
*)
type rand_set = { map: (int, int) Hashtbl.t; list: int array; size: int }

let create () = { map = Hashtbl.create 16; list = Array.make 128 0; size = 0 }

let insert rs v =
  if Hashtbl.mem rs.map v then false
  else begin
    Hashtbl.add rs.map v rs.size;
    rs.list.(rs.size) <- v;
    true
  end

let remove rs v =
  if not (Hashtbl.mem rs.map v) then false
  else begin
    let idx = Hashtbl.find rs.map v in
    let last_v = rs.list.(rs.size - 1) in
    rs.list.(idx) <- last_v;
    Hashtbl.replace rs.map last_v idx;
    Hashtbl.remove rs.map v;
    true
  end
