(*
  Problem 58: Largest Rectangle in Histogram (LeetCode 84)
  Difficulty: Hard
  Language: OCaml
*)
let largest_rectangle_area heights =
  let n = Array.length heights in
  let rec process idx stack max_a =
    if idx = n then clean stack max_a
    else match stack with
      | top :: rest when heights.(top) > heights.(idx) ->
        let w = match rest with [] -> idx | s :: _ -> idx - s - 1 in
        process idx rest (max max_a (heights.(top) * w))
      | _ -> process (idx + 1) (idx :: stack) max_a
  and clean stack max_a = match stack with
    | [] -> max_a
    | top :: rest ->
      let w = match rest with [] -> n | s :: _ -> n - s - 1 in
      clean rest (max max_a (heights.(top) * w))
  in process 0 [] 0
