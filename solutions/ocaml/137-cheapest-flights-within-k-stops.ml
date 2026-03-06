(*
  Problem 137: Cheapest Flights Within K Stops (LeetCode 787)
  Difficulty: Med
  Language: OCaml
*)
let find_cheapest_price n flights src dst k =
  let inf = max_int in
  let prices = Array.init n (fun i -> if i = src then 0 else inf) in
  for _ = 0 to k do
    let prev = Array.copy prices in
    List.iter (fun (u, v, w) ->
      if prev.(u) < inf && prev.(u) + w < prices.(v) then
        prices.(v) <- prev.(u) + w
    ) flights
  done;
  if prices.(dst) = inf then -1 else prices.(dst)
