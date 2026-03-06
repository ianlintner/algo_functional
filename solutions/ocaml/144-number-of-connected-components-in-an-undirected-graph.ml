(*
  Problem 144: Number of Connected Components in an Undirected Graph (LeetCode 323)
  Difficulty: Med
  Language: OCaml
*)
let count_components n edges =
  let parent = Array.init n Fun.id in
  let rec find x =
    if parent.(x) = x then x
    else begin parent.(x) <- find parent.(x); parent.(x) end in
  List.fold_left (fun count (a, b) ->
    let ra = find a and rb = find b in
    if ra = rb then count
    else begin parent.(ra) <- rb; count - 1 end
  ) n edges
