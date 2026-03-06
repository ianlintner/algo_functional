# Problem 122: Product of Array Except Self (LeetCode 238)
# Difficulty: Med
# Language: Elixir
# 
defmodule ProductExceptSelf do
  def product_except_self(nums) do
    prefix = Enum.scan([1 | Enum.drop(nums, -1)], &(&1 * &2))
    suffix = nums |> Enum.drop(1) |> Enum.reverse()
             |> Enum.scan(&(&1 * &2)) |> Enum.reverse()
    suffix = suffix ++ [1]
    prefix = [1 | Enum.drop(prefix, -1)]
    # Simpler approach using prefix/suffix products
    n = length(nums)
    pfx = Enum.reduce(0..(n-1), [], fn i, acc ->
      if i == 0, do: [1], else: acc ++ [List.last(acc) * Enum.at(nums, i-1)]
    end)
    sfx = Enum.reduce((n-1)..0, [], fn i, acc ->
      if i == n-1, do: [1], else: [hd(acc) * Enum.at(nums, i+1) | acc]
    end)
    Enum.zip(pfx, sfx) |> Enum.map(fn {a, b} -> a * b end)
  end
end
