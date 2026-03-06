(*
  Problem 82: Linked List Cycle (LeetCode 141)
  Difficulty: Easy
  Language: OCaml
*)
let has_cycle head =
  let rec detect slow fast = match fast with
    | None -> false
    | Some f -> (match f.next with
      | None -> false
      | Some fn_ ->
        if slow == Some f then true
        else detect (Option.bind slow (fun s -> s.next)) fn_.next)
  in detect (Some head) (Option.bind (Some head) (fun h -> h.next))
