# Problem 53: Sort Colors (LeetCode 75)
# Difficulty: Med
# Language: Elixir
# 
defmodule SortColors do
  def sort_colors(nums) do
    counts = Enum.frequencies(nums)
    List.duplicate(0, Map.get(counts, 0, 0)) ++
    List.duplicate(1, Map.get(counts, 1, 0)) ++
    List.duplicate(2, Map.get(counts, 2, 0))
  end
end
