(*
  Problem 118: Implement Queue using Stacks (LeetCode 232)
  Difficulty: Easy
  Language: OCaml
*)
type 'a queue = { ins: 'a list; outs: 'a list }

let empty_queue = { ins = []; outs = [] }
let enqueue x q = { q with ins = x :: q.ins }
let transfer q =
  if q.outs <> [] then q
  else { ins = []; outs = List.rev q.ins }
let dequeue q =
  let q = transfer q in
  (List.hd q.outs, { q with outs = List.tl q.outs })
let peek q = fst (dequeue q)
