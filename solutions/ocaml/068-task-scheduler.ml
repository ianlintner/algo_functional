(*
  Problem 68: Task Scheduler (LeetCode 621)
  Difficulty: Med
  Language: OCaml
*)
let least_interval tasks n =
  let freq = Hashtbl.create 26 in
  List.iter (fun c ->
    let v = try Hashtbl.find freq c with Not_found -> 0 in
    Hashtbl.replace freq c (v + 1)
  ) tasks;
  let freqs = Hashtbl.fold (fun _ v acc -> v :: acc) freq [] in
  let max_freq = List.fold_left max 0 freqs in
  let max_count = List.length (List.filter ((=) max_freq) freqs) in
  max (List.length tasks) ((max_freq - 1) * (n + 1) + max_count)
