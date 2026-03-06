(*
  Problem 88: Maximum Width of Binary Tree (LeetCode 662)
  Difficulty: Med
  Language: OCaml
*)
let width_of_binary_tree root =
  let rec bfs level max_w = match level with
    | [] -> max_w
    | _ ->
      let w = snd (List.nth level (List.length level - 1))
              - snd (List.hd level) + 1 in
      let next = List.concat_map (fun (n, i) ->
        (match n.left with Some l -> [(l, 2*i)] | None -> [])
        @ (match n.right with Some r -> [(r, 2*i+1)] | None -> [])
      ) level in
      bfs next (max w max_w)
  in match root with None -> 0 | Some r -> bfs [(r, 0)] 0
