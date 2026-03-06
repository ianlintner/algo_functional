(*
  Problem 163: Longest Repeating Character Replacement (LeetCode 424)
  Difficulty: Med
  Language: OCaml
*)
let character_replacement s k =
  let n = String.length s in
  let count = Array.make 26 0 in
  let rec go left max_c best right =
    if right >= n then best
    else begin
      let idx = Char.code s.[right] - Char.code 'A' in
      count.(idx) <- count.(idx) + 1;
      let mc = max max_c count.(idx) in
      if right - left + 1 - mc > k then begin
        let li = Char.code s.[left] - Char.code 'A' in
        count.(li) <- count.(li) - 1;
        go (left + 1) mc (max best (right - left)) (right + 1)
      end else
        go left mc (max best (right - left + 1)) (right + 1)
    end
  in go 0 0 0 0
