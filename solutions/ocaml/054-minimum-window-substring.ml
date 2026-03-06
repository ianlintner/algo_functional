(*
  Problem 54: Minimum Window Substring (LeetCode 76)
  Difficulty: Hard
  Language: OCaml
*)
let min_window s t =
  let need = Hashtbl.create 16 in
  String.iter (fun c ->
    Hashtbl.replace need c (1 + try Hashtbl.find need c with Not_found -> 0)) t;
  let keys = Hashtbl.length need in
  let slen = String.length s in
  let win = Hashtbl.create 16 in
  let l = ref 0 and have = ref 0 and start = ref 0 and mlen = ref (slen + 1) in
  for r = 0 to slen - 1 do
    let c = s.[r] in
    Hashtbl.replace win c (1 + try Hashtbl.find win c with Not_found -> 0);
    if Hashtbl.find win c = (try Hashtbl.find need c with Not_found -> 0)
    then incr have;
    while !have = keys do
      (if r - !l + 1 < !mlen then (start := !l; mlen := r - !l + 1));
      let lc = s.[!l] in
      Hashtbl.replace win lc (Hashtbl.find win lc - 1);
      if Hashtbl.find win lc < (try Hashtbl.find need lc with Not_found -> 0)
      then decr have;
      incr l
    done
  done;
  if !mlen > slen then "" else String.sub s !start !mlen
