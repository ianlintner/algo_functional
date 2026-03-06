(*
  Problem 99: Binary Tree Right Side View (LeetCode 199)
  Difficulty: Med
  Language: OCaml
*)
let right_side_view root =
  let rec bfs = function
    | [] -> []
    | level ->
      let last = (List.nth level (List.length level - 1)).value in
      let next = List.concat_map (fun n ->
        (match n.left with Some l -> [l] | None -> [])
        @ (match n.right with Some r -> [r] | None -> [])
      ) level in
      last :: bfs next
  in match root with None -> [] | Some r -> bfs [r]
