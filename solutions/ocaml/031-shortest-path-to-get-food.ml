(*
  Problem 31: Shortest Path to Get Food (LeetCode 1730)
  Difficulty: Med
  Language: OCaml
*)
let get_food grid =
  let rows = Array.length grid and cols = Array.length grid.(0) in
  let start = ref (0, 0) in
  Array.iteri (fun i row ->
    Array.iteri (fun j c -> if c = '*' then start := (i, j)) row
  ) grid;
  let (sr, sc) = !start in
  let dirs = [|(0,1);(0,-1);(1,0);(-1,0)|] in
  let visited = Hashtbl.create 256 in
  Hashtbl.add visited (sr, sc) true;
  let queue = Queue.create () in
  Queue.push (sr, sc, 0) queue;
  let result = ref (-1) in
  while not (Queue.is_empty queue) && !result = -1 do
    let (r, c, d) = Queue.pop queue in
    Array.iter (fun (dr, dc) ->
      let nr = r + dr and nc = c + dc in
      if nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
         grid.(nr).(nc) <> 'X' && not (Hashtbl.mem visited (nr, nc)) then begin
        if grid.(nr).(nc) = '#' then result := d + 1
        else begin
          Hashtbl.add visited (nr, nc) true;
          Queue.push (nr, nc, d + 1) queue
        end
      end
    ) dirs
  done;
  !result
