(*
  Problem 34: Trapping Rain Water (LeetCode 42)
  Difficulty: Hard
  Language: OCaml
*)
let trap height =
  let arr = Array.of_list height in
  let n = Array.length arr in
  if n = 0 then 0
  else
    let max_left = Array.make n 0 in
    let max_right = Array.make n 0 in
    max_left.(0) <- arr.(0);
    for i = 1 to n - 1 do
      max_left.(i) <- max max_left.(i-1) arr.(i)
    done;
    max_right.(n-1) <- arr.(n-1);
    for i = n - 2 downto 0 do
      max_right.(i) <- max max_right.(i+1) arr.(i)
    done;
    Array.fold_left (fun (s, i) h ->
      (s + max 0 (min max_left.(i) max_right.(i) - h), i + 1)
    ) (0, 0) arr |> fst
