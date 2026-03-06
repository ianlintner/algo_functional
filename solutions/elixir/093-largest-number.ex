# Problem 93: Largest Number (LeetCode 179)
# Difficulty: Med
# Language: Elixir
# 
defmodule LargestNum do
  def largest(nums) do
    result = nums
      |> Enum.map(&Integer.to_string/1)
      |> Enum.sort(fn a, b -> a <> b >= b <> a end)
      |> Enum.join()
    if String.starts_with?(result, "0"), do: "0", else: result
  end
end
