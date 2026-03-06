(*
  Problem 59: Decode Ways (LeetCode 91)
  Difficulty: Med
  Language: OCaml
*)
let num_decodings s =
  let n = String.length s in
  let rec go i memo =
    if i = n then (1, memo)
    else if s.[i] = '0' then (0, memo)
    else match List.assoc_opt i memo with
      | Some v -> (v, memo)
      | None ->
        let (a, m1) = go (i+1) memo in
        let (b, m2) =
          if i+1 < n then
            let v = (Char.code s.[i] - 48) * 10 + (Char.code s.[i+1] - 48) in
            if v <= 26 then go (i+2) m1 else (0, m1)
          else (0, m1)
        in (a+b, (i, a+b) :: m2)
  in fst (go 0 [])
