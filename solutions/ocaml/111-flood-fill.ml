(*
  Problem 111: Flood Fill (LeetCode 733)
  Difficulty: Easy
  Language: OCaml
*)
let flood_fill image sr sc color =
  let rows = Array.length image and cols = Array.length image.(0) in
  let orig = image.(sr).(sc) in
  if orig = color then image
  else begin
    let img = Array.map Array.copy image in
    let rec fill r c =
      if r >= 0 && r < rows && c >= 0 && c < cols
         && img.(r).(c) = orig then begin
        img.(r).(c) <- color;
        List.iter (fun (dr,dc) -> fill (r+dr) (c+dc))
          [(-1,0);(1,0);(0,-1);(0,1)]
      end in
    fill sr sc; img
  end
