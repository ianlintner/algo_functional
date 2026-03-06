(*
  Problem 113: Basic Calculator (LeetCode 224)
  Difficulty: Hard
  Language: OCaml
*)
let calculate s =
  let chars = String.to_seq s
    |> Seq.filter (fun c -> c <> ' ') |> List.of_seq in
  let rec parse cs = go cs 0 1
  and go cs result sign = match cs with
    | [] -> (result, [])
    | ')' :: rest -> (result, rest)
    | '+' :: rest -> go rest result 1
    | '-' :: rest -> go rest result (-1)
    | '(' :: rest ->
      let (v, rest') = parse rest in
      go rest' (result + sign * v) 1
    | _ ->
      let rec read_num cs acc = match cs with
        | c :: rest when c >= '0' && c <= '9' ->
          read_num rest (acc * 10 + Char.code c - Char.code '0')
        | _ -> (acc, cs) in
      let (num, rest) = read_num cs 0 in
      go rest (result + sign * num) 1 in
  fst (parse chars)
