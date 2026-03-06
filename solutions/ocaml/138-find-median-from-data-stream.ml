(*
  Problem 138: Find Median from Data Stream (LeetCode 295)
  Difficulty: Hard
  Language: OCaml
*)
(* Functional approach: maintain two sorted lists *)
type median_state = { lo: int list; hi: int list }

let empty_state = { lo = []; hi = [] }

let rec insert_sorted x = function
  | [] -> [x]
  | h :: t -> if x <= h then x :: h :: t else h :: insert_sorted x t

let add_num x st =
  let lo, hi =
    if st.lo = [] || x <= List.nth st.lo (List.length st.lo - 1)
    then insert_sorted x st.lo, st.hi
    else st.lo, insert_sorted x st.hi in
  let lo, hi =
    if List.length lo > List.length hi + 1
    then let last = List.nth lo (List.length lo - 1) in
         List.filteri (fun i _ -> i < List.length lo - 1) lo, last :: hi
    else if List.length hi > List.length lo
    then lo @ [List.hd hi], List.tl hi
    else lo, hi in
  { lo; hi }

let find_median st =
  let l = List.nth st.lo (List.length st.lo - 1) in
  if List.length st.lo > List.length st.hi then float_of_int l
  else float_of_int (l + List.hd st.hi) /. 2.0
