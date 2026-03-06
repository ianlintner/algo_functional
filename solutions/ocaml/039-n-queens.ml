(*
  Problem 39: N-Queens (LeetCode 51)
  Difficulty: Hard
  Language: OCaml
*)
let solve_n_queens n =
  let module ISet = Set.Make(Int) in
  let rec go row cols d1 d2 board =
    if row = n then
      [List.rev_map (fun c ->
        String.init n (fun i -> if i = c then 'Q' else '.')
      ) board]
    else
      List.init n Fun.id
      |> List.filter (fun c ->
        not (ISet.mem c cols) &&
        not (ISet.mem (row - c) d1) &&
        not (ISet.mem (row + c) d2))
      |> List.concat_map (fun c ->
        go (row + 1) (ISet.add c cols)
           (ISet.add (row - c) d1) (ISet.add (row + c) d2)
           (c :: board))
  in
  go 0 ISet.empty ISet.empty ISet.empty []
