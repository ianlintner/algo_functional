(*
  Problem 143: Coin Change (LeetCode 322)
  Difficulty: Med
  Language: OCaml
*)
let coin_change coins amount =
  let inf = amount + 1 in
  let dp = Array.init (amount + 1) (fun i -> if i = 0 then 0 else inf) in
  List.iter (fun coin ->
    for i = coin to amount do
      dp.(i) <- min dp.(i) (dp.(i - coin) + 1)
    done
  ) coins;
  if dp.(amount) >= inf then -1 else dp.(amount)
