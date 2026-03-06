(*
  Problem 148: Palindrome Pairs (LeetCode 336)
  Difficulty: Hard
  Language: OCaml
*)
let palindrome_pairs words =
  let is_palin s =
    let n = String.length s in
    let rec check i = i >= n - 1 - i || (s.[i] = s.[n-1-i] && check (i+1)) in check 0 in
  let rev_str s = String.init (String.length s) (fun i -> s.[String.length s - 1 - i]) in
  let tbl = Hashtbl.create 16 in
  List.iteri (fun i w -> Hashtbl.replace tbl w i) words;
  List.concat (List.mapi (fun i w ->
    List.concat (List.init (String.length w + 1) (fun j ->
      let left = String.sub w 0 j and right = String.sub w j (String.length w - j) in
      let a = if is_palin right then match Hashtbl.find_opt tbl (rev_str left) with
        | Some k when k <> i -> [[i;k]] | _ -> [] else [] in
      let b = if j > 0 && is_palin left then match Hashtbl.find_opt tbl (rev_str right) with
        | Some k when k <> i -> [[k;i]] | _ -> [] else [] in
      a @ b))) words)
