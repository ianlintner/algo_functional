(*
  Problem 126: Meeting Rooms (LeetCode 252)
  Difficulty: Easy
  Language: OCaml
*)
let can_attend_meetings intervals =
  let sorted = List.sort (fun (a,_) (b,_) -> compare a b) intervals in
  let rec check = function
    | [] | [_] -> true
    | (_, e) :: ((s, _) :: _ as rest) -> e <= s && check rest
  in check sorted
