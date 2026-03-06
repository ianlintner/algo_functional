(*
  Problem 145: Odd Even Linked List (LeetCode 328)
  Difficulty: Med
  Language: OCaml
*)
type list_node = { value: int; next: list_node option }

let odd_even_list head =
  let rec collect node is_odd odds evens = match node with
    | None -> (List.rev odds, List.rev evens)
    | Some n ->
      if is_odd then collect n.next false (n.value :: odds) evens
      else collect n.next true odds (n.value :: evens)
  in
  let (odds, evens) = collect head true [] [] in
  List.fold_right (fun v acc -> Some { value = v; next = acc })
    (odds @ evens) None
