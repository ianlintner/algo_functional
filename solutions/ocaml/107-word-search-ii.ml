(*
  Problem 107: Word Search II (LeetCode 212)
  Difficulty: Hard
  Language: OCaml
*)
type trie_n = { tn_ch: (char * trie_n) list; tn_word: string option }
let empty_tn = { tn_ch = []; tn_word = None }

let rec insert_tn w i t =
  if i = String.length w then { t with tn_word = Some w }
  else let c = w.[i] in
    let child = try List.assoc c t.tn_ch with Not_found -> empty_tn in
    { t with tn_ch = (c, insert_tn w (i+1) child) ::
      List.filter (fun (k,_) -> k <> c) t.tn_ch }

module PS = Set.Make(struct type t = int * int let compare = compare end)
module SS = Set.Make(String)

let find_words board words =
  let trie = List.fold_left (fun t w -> insert_tn w 0 t) empty_tn words in
  let rows = Array.length board and cols = Array.length board.(0) in
  let rec dfs r c node seen found =
    if r < 0 || r >= rows || c < 0 || c >= cols || PS.mem (r,c) seen then found
    else try
      let next = List.assoc board.(r).(c) node.tn_ch in
      let f = match next.tn_word with Some w -> SS.add w found | None -> found in
      let s = PS.add (r,c) seen in
      List.fold_left (fun f' (dr,dc) -> dfs (r+dr) (c+dc) next s f')
        f [(-1,0);(1,0);(0,-1);(0,1)]
    with Not_found -> found in
  let found = ref SS.empty in
  for r = 0 to rows-1 do for c = 0 to cols-1 do
    found := dfs r c trie PS.empty !found done done;
  SS.elements !found
