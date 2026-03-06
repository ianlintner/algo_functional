(*
  Problem 86: Sort List (LeetCode 148)
  Difficulty: Med
  Language: OCaml
*)
let rec sort_list = function
  | [] -> []
  | [x] -> [x]
  | xs ->
    let rec split l r = function
      | [] -> (l, r) | [x] -> (x :: l, r)
      | a :: b :: t -> split (a :: l) (b :: r) t in
    let (l, r) = split [] [] xs in
    let rec merge a b = match a, b with
      | [], b -> b | a, [] -> a
      | x :: xs, y :: ys ->
        if x <= y then x :: merge xs (y :: ys)
        else y :: merge (x :: xs) ys in
    merge (sort_list l) (sort_list r)
