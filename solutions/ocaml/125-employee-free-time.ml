(*
  Problem 125: Employee Free Time (LeetCode 759)
  Difficulty: Hard
  Language: OCaml
*)
let employee_free_time schedules =
  let all = List.concat schedules
    |> List.sort (fun (a,_) (b,_) -> compare a b) in
  let rec merge = function
    | [] -> []
    | [x] -> [x]
    | (a,b)::(c,d)::rest when b >= c -> merge ((a, max b d)::rest)
    | x::rest -> x :: merge rest in
  let m = merge all in
  let rec gaps = function
    | (_,e1)::(s2,e2)::rest when e1 < s2 -> (e1,s2) :: gaps ((s2,e2)::rest)
    | _::rest -> gaps rest
    | [] -> [] in
  gaps m
