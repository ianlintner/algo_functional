# Problem 58: Largest Rectangle in Histogram (LeetCode 84)
# Difficulty: Hard
# Language: Elixir
# 
defmodule Histogram do
  def largest_rectangle(heights) do
    heights
    |> Enum.with_index()
    |> Enum.reduce({[], 0}, fn {h, i}, {stack, max_area} ->
      pop_and_calc(heights, stack, max_area, h, i)
    end)
    |> then(fn {stack, max_area} -> final_clean(heights, stack, max_area) end)
  end

  defp pop_and_calc(hs, [{si, sh} | rest], max_area, h, i) when sh > h do
    w = case rest do
      [] -> i
      [{pi, _} | _] -> i - pi - 1
    end
    pop_and_calc(hs, rest, max(max_area, sh * w), h, i)
  end
  defp pop_and_calc(_, stack, max_area, h, i), do: {[{i, h} | stack], max_area}

  defp final_clean(hs, [], max_area), do: max_area
  defp final_clean(hs, [{_, sh} | rest], max_area) do
    n = length(hs)
    w = case rest do
      [] -> n
      [{pi, _} | _] -> n - pi - 1
    end
    final_clean(hs, rest, max(max_area, sh * w))
  end
end
