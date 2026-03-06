(*
  Problem 166: Find All Anagrams in a String (LeetCode 438)
  Difficulty: Med
  Language: OCaml
*)
let find_anagrams s p =
  let n = String.length s and pn = String.length p in
  if n < pn then []
  else
    let p_freq = Array.make 26 0 and w_freq = Array.make 26 0 in
    String.iter (fun c -> p_freq.(Char.code c - Char.code 'a') <-
      p_freq.(Char.code c - Char.code 'a') + 1) p;
    let result = ref [] in
    for i = 0 to n - 1 do
      let idx = Char.code s.[i] - Char.code 'a' in
      w_freq.(idx) <- w_freq.(idx) + 1;
      if i >= pn then begin
        let li = Char.code s.[i - pn] - Char.code 'a' in
        w_freq.(li) <- w_freq.(li) - 1
      end;
      if p_freq = w_freq then result := (i + 1 - pn) :: !result
    done;
    List.rev !result
