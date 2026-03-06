(*
  Problem 112: Asteroid Collision (LeetCode 735)
  Difficulty: Med
  Language: OCaml
*)
let asteroid_collision asteroids =
  let rec resolve stack a = match stack with
    | [] -> [a]
    | top :: rest when a > 0 || top < 0 -> a :: stack
    | top :: rest when top = -a -> rest
    | top :: rest when top < -a -> resolve rest a
    | _ -> stack in
  List.fold_left resolve [] asteroids |> List.rev
