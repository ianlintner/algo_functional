(*
  Problem 106: Design Add and Search Words Data Structure (LeetCode 211)
  Difficulty: Med
  Language: OCaml
*)
type wdict = { children: (char * wdict) list; is_end: bool }
let empty_dict = { children = []; is_end = false }

let rec add_word word t = match word with
  | [] -> { t with is_end = true }
  | c :: cs ->
    let child = try List.assoc c t.children with Not_found -> empty_dict in
    { t with children =
      (c, add_word cs child) :: List.filter (fun (k,_) -> k <> c) t.children }

let rec search_word word t = match word with
  | [] -> t.is_end
  | '.' :: cs -> List.exists (fun (_, c) -> search_word cs c) t.children
  | c :: cs ->
    (try search_word cs (List.assoc c t.children) with Not_found -> false)
