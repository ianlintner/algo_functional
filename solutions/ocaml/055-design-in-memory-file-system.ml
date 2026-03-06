(*
  Problem 55: Design In-Memory File System (LeetCode 588)
  Difficulty: Hard
  Language: OCaml
*)
module SMap = Map.Make(String)

type fs_node = { children: fs_node SMap.t; content: string }

let empty_node = { children = SMap.empty; content = "" }

let navigate root parts =
  List.fold_left (fun node p ->
    try SMap.find p node.children
    with Not_found -> empty_node
  ) root parts

let rec ensure_path node = function
  | [] -> node
  | p :: ps ->
    let child = try SMap.find p node.children with Not_found -> empty_node in
    { node with children = SMap.add p (ensure_path child ps) node.children }

let rec update_at node parts f = match parts with
  | [p] ->
    let child = try SMap.find p node.children with Not_found -> empty_node in
    { node with children = SMap.add p (f child) node.children }
  | p :: ps ->
    let child = try SMap.find p node.children with Not_found -> empty_node in
    { node with children = SMap.add p (update_at child ps f) node.children }
  | [] -> f node

let parse_path path =
  String.split_on_char '/' path |> List.filter (fun s -> s <> "")

let ls root path =
  let parts = parse_path path in
  let node = navigate root parts in
  if node.content <> "" then [List.nth parts (List.length parts - 1)]
  else SMap.bindings node.children |> List.map fst
