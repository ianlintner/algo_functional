(*
  Problem 10: Rotting Oranges (LeetCode 994)
  Difficulty: Med
  Language: OCaml
*)
let oranges_rotting grid =
  let rows = Array.length grid in
  let cols = Array.length grid.(0) in
  let grid = Array.map Array.copy grid in
  let queue = Queue.create () in
  let fresh = ref 0 in
  for r = 0 to rows - 1 do
    for c = 0 to cols - 1 do
      if grid.(r).(c) = 2 then Queue.push (r, c) queue
      else if grid.(r).(c) = 1 then incr fresh
    done
  done;
  let dirs = [|(0,1);(0,-1);(1,0);(-1,0)|] in
  let time = ref 0 in
  while not (Queue.is_empty queue) && !fresh > 0 do
    let size = Queue.length queue in
    for _ = 1 to size do
      let (r, c) = Queue.pop queue in
      Array.iter (fun (dr, dc) ->
        let nr = r + dr and nc = c + dc in
        if nr >= 0 && nr < rows && nc >= 0 && nc < cols
           && grid.(nr).(nc) = 1 then begin
          grid.(nr).(nc) <- 2;
          decr fresh;
          Queue.push (nr, nc) queue
        end) dirs
    done;
    incr time
  done;
  if !fresh > 0 then -1 else !time
