(*
  Problem 147: Maximum Profit in Job Scheduling (LeetCode 1235)
  Difficulty: Hard
  Language: OCaml
*)
let job_scheduling starts ends profits =
  let jobs = List.map2 (fun (s,e) p -> (s,e,p))
    (List.combine starts ends) profits
    |> List.sort (fun (_,e1,_) (_,e2,_) -> compare e1 e2) in
  let arr = Array.of_list jobs in
  let n = Array.length arr in
  let dp = Array.make (n+1) 0 in
  let bisect v hi =
    let rec go i = if i < 0 then 0
      else let (_,e,_) = arr.(i) in
        if e <= v then i+1 else go (i-1) in go (hi-1) in
  for i = 1 to n do
    let (s,_,p) = arr.(i-1) in
    let prev = bisect s (i-1) in
    dp.(i) <- max dp.(i-1) (dp.(prev) + p)
  done; dp.(n)
