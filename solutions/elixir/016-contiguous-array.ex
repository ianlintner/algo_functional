# Problem 16: Contiguous Array (LeetCode 525)
# Difficulty: Med
# Language: Elixir
# 
defmodule ContiguousArray do
  def find_max_length(nums) do
    nums
    |> Enum.with_index()
    |> Enum.reduce({%{}, 0, 0}, fn {num, i}, {seen, count, best} ->
      new_count = count + if(num == 1, do: 1, else: -1)
      cond do
        new_count == 0 ->
          {seen, new_count, max(best, i + 1)}
        Map.has_key?(seen, new_count) ->
          {seen, new_count, max(best, i - Map.get(seen, new_count))}
        true ->
          {Map.put(seen, new_count, i), new_count, best}
      end
    end)
    |> elem(2)
  end
end
