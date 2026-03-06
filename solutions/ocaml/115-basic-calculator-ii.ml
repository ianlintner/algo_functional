(*
  Problem 115: Basic Calculator II (LeetCode 227)
  Difficulty: Med
  Language: OCaml
*)
let calculate2 s =
  let chars = String.to_seq s
    |> Seq.filter (fun c -> c <> ' ') |> List.of_seq in
  let rec read_num cs acc = match cs with
    | c :: rest when c >= '0' && c <= '9' ->
      read_num rest (acc * 10 + Char.code c - Char.code '0')
    | _ -> (acc, cs) in
  let rec parse cs stack op =
    let (num, rest) = read_num cs 0 in
    let ns = match op, stack with
      | '*', h :: t -> (h * num) :: t
      | '/', h :: t -> (h / num) :: t
      | '-', _ -> (-num) :: stack
      | _, _ -> num :: stack in
    match rest with
    | [] -> List.fold_left (+) 0 ns
    | c :: rest' -> parse rest' ns c in
  parse chars [] '+'
