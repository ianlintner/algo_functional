(*
  Problem 123: Sliding Window Maximum (LeetCode 239)
  Difficulty: Hard
  Language: OCaml
*)
let max_sliding_window nums k =
  let n = Array.length nums in
  let rec go i dq res =
    if i >= n then List.rev res
    else
      let dq = match dq with j :: _ when j <= i - k -> List.tl dq | _ -> dq in
      let rec pop_back = function
        | [] -> []
        | [j] when nums.(j) <= nums.(i) -> []
        | l -> let rev = List.rev l in
          if nums.(List.hd rev) <= nums.(i) then List.rev (List.tl rev) |> pop_back
          else l in
      let dq = pop_back dq @ [i] in
      let res = if i >= k - 1 then nums.(List.hd dq) :: res else res in
      go (i + 1) dq res
  in go 0 [] []
