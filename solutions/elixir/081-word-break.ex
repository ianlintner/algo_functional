# Problem 81: Word Break (LeetCode 139)
# Difficulty: Med
# Language: Elixir
# 
defmodule WordBreak do
  def word_break(s, word_dict) do
    dict = MapSet.new(word_dict)
    n = String.length(s)
    dp = Enum.reduce(1..n, %{0 => true}, fn i, dp ->
      val = Enum.any?(0..(i-1), fn j ->
        Map.get(dp, j, false) and MapSet.member?(dict, String.slice(s, j, i - j))
      end)
      Map.put(dp, i, val)
    end)
    Map.get(dp, n, false)
  end
end
