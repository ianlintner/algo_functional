(*
  Problem 5: Longest Palindromic Substring (LeetCode 5)
  Difficulty: Med
  Language: OCaml
*)
let longest_palindrome s =
  let n = String.length s in
  let expand l r =
    let l = ref l and r = ref r in
    while !l >= 0 && !r < n && s.[!l] = s.[!r] do
      decr l; incr r
    done;
    String.sub s (!l + 1) (!r - !l - 1)
  in
  let best = ref "" in
  for i = 0 to n - 1 do
    let odd  = expand i i in
    let even = expand i (i + 1) in
    let candidate =
      if String.length odd >= String.length even then odd else even
    in
    if String.length candidate > String.length !best then best := candidate
  done;
  !best
