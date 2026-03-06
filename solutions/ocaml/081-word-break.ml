(*
  Problem 81: Word Break (LeetCode 139)
  Difficulty: Med
  Language: OCaml
*)
let word_break s word_dict =
  let dict = List.fold_left (fun s w -> StringSet.add w s) StringSet.empty word_dict in
  let n = String.length s in
  let dp = Array.make (n + 1) false in
  dp.(0) <- true;
  for i = 1 to n do
    dp.(i) <- List.init i Fun.id
      |> List.exists (fun j -> dp.(j) && StringSet.mem (String.sub s j (i - j)) dict)
  done;
  dp.(n)
