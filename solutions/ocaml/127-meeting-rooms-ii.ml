(*
  Problem 127: Meeting Rooms II (LeetCode 253)
  Difficulty: Med
  Language: OCaml
*)
let min_meeting_rooms intervals =
  let starts = List.map fst intervals |> List.sort compare in
  let ends = List.map snd intervals |> List.sort compare in
  let rec go ss es rooms max_r = match ss with
    | [] -> max_r
    | s :: srest -> match es with
      | e :: _ when s < e -> go srest es (rooms+1) (max max_r (rooms+1))
      | _ :: erest -> go srest erest rooms max_r
      | [] -> max_r
  in go starts ends 0 0
