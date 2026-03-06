(*
  Problem 141: Minimum Height Trees (LeetCode 310)
  Difficulty: Med
  Language: OCaml
*)
let find_min_height_trees n edges =
  if n = 1 then [0]
  else
    let adj = Array.make n [] in
    List.iter (fun (u, v) ->
      adj.(u) <- v :: adj.(u);
      adj.(v) <- u :: adj.(v)) edges;
    let degree = Array.init n (fun i -> List.length adj.(i)) in
    let leaves = ref (List.init n Fun.id
      |> List.filter (fun i -> degree.(i) = 1)) in
    let remaining = ref n in
    while !remaining > 2 do
      remaining := !remaining - List.length !leaves;
      let new_leaves = ref [] in
      List.iter (fun leaf ->
        List.iter (fun nb ->
          degree.(nb) <- degree.(nb) - 1;
          if degree.(nb) = 1 then new_leaves := nb :: !new_leaves
        ) adj.(leaf)
      ) !leaves;
      leaves := !new_leaves
    done;
    !leaves
