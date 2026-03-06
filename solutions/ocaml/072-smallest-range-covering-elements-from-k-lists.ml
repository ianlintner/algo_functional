(*
  Problem 72: Smallest Range Covering Elements from K Lists (LeetCode 632)
  Difficulty: Hard
  Language: OCaml
*)
let smallest_range nums =
  let k = List.length nums in
  let tagged = List.concat_mapi (fun i lst -> List.map (fun v -> (v, i)) lst) nums in
  let sorted = List.sort (fun (a,_) (b,_) -> compare a b) tagged in
  let arr = Array.of_list sorted in
  let n = Array.length arr in
  let rec shrink l counts cov best rv =
    if cov < k then (l, counts, cov, best)
    else let (lv, lg) = arr.(l) in
      let nb = if rv - lv < snd best - fst best then (lv, rv) else best in
      let nc = List.map (fun (g,c) -> if g = lg then (g,c-1) else (g,c)) counts in
      let ncov = if List.assoc lg nc = 0 then cov - 1 else cov in
      shrink (l+1) nc ncov nb rv
  in
  let rec go i left counts cov best =
    if i >= n then best
    else let (v, g) = arr.(i) in
      let c2 = if List.mem_assoc g counts
        then List.map (fun (k,c) -> if k = g then (k,c+1) else (k,c)) counts
        else (g,1)::counts in
      let cov2 = if (try List.assoc g counts with Not_found -> 0) = 0 then cov+1 else cov in
      let (l2, c3, cov3, b2) = shrink left c2 cov2 best v in
      go (i+1) l2 c3 cov3 b2
  in go 0 0 [] 0 (min_int, max_int)
