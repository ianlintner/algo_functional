# Problem 153: Insert Delete GetRandom O(1) (LeetCode 380)
# Difficulty: Med
# Language: Elixir
# 
defmodule RandomizedSet do
  defstruct map: %{}, list: []
  def new(), do: %RandomizedSet{}
  def insert(%RandomizedSet{map: m, list: l} = s, val) do
    if Map.has_key?(m, val), do: {false, s},
    else: {true, %RandomizedSet{map: Map.put(m, val, length(l)), list: l ++ [val]}}
  end
  def remove(%RandomizedSet{map: m, list: l} = s, val) do
    if not Map.has_key?(m, val), do: {false, s},
    else: (
      idx = m[val]; last_val = List.last(l); new_list = List.delete_at(l, -1)
      new_map = m |> Map.delete(val)
      if idx < length(new_list) do
        {true, %RandomizedSet{map: Map.put(new_map, last_val, idx),
          list: List.replace_at(new_list, idx, last_val)}}
      else {true, %RandomizedSet{map: new_map, list: new_list}} end
    )
  end
end
