# Problem 110: Maximal Square (LeetCode 221)
# Difficulty: Med
# Language: Elixir
# 
defmodule MaxSquare do
  def maximal_square(matrix) do
    {mx, _} = Enum.reduce(Enum.with_index(matrix), {0, []},
      fn {row, r}, {best, prev} ->
        curr = Enum.reduce(Enum.with_index(row), [], fn {cell, c}, acc ->
          v = if cell == "0", do: 0,
            else: if r == 0 or c == 0, do: 1,
            else: Enum.min([Enum.at(prev, c-1), Enum.at(prev, c),
                            if(acc == [], do: 0, else: hd(acc))]) + 1
          [v | acc]
        end) |> Enum.reverse()
        {max(best, Enum.max(curr, fn -> 0 end)), curr}
      end)
    mx * mx
  end
end
