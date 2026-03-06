(*
  Problem 156: Decode String (LeetCode 394)
  Difficulty: Med
  Language: OCaml
*)
let decode_string s =
  let n = String.length s in
  let rec helper i =
    if i >= n || s.[i] = ']' then ("", i)
    else if s.[i] >= '0' && s.[i] <= '9' then
      let j = ref i and num = ref 0 in
      while !j < n && s.[!j] >= '0' && s.[!j] <= '9' do
        num := !num * 10 + Char.code s.[!j] - Char.code '0'; incr j done;
      let (inner, k) = helper (!j + 1) in
      let repeated = String.concat "" (List.init !num (fun _ -> inner)) in
      let (rest, final_i) = helper (k + 1) in
      (repeated ^ rest, final_i)
    else let (rest, k) = helper (i + 1) in
      (String.make 1 s.[i] ^ rest, k)
  in fst (helper 0)
