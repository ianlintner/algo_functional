(*
  Problem 13: 3Sum (LeetCode 15)
  Difficulty: Med
  Language: OCaml
*)
let three_sum nums =
  let sorted = List.sort compare nums |> Array.of_list in
  let n = Array.length sorted in
  let results = ref [] in
  for i = 0 to n - 1 do
    if i = 0 || sorted.(i) <> sorted.(i - 1) then begin
      let l = ref (i + 1) and r = ref (n - 1) in
      while !l < !r do
        let sum = sorted.(i) + sorted.(!l) + sorted.(!r) in
        if sum < 0 then incr l
        else if sum > 0 then decr r
        else begin
          results := [sorted.(i); sorted.(!l); sorted.(!r)] :: !results;
          while !l < !r && sorted.(!l) = sorted.(!l + 1) do incr l done;
          incr l; decr r
        end
      done
    end
  done;
  !results
