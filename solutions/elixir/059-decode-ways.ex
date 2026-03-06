# Problem 59: Decode Ways (LeetCode 91)
# Difficulty: Med
# Language: Elixir
# 
defmodule DecodeWays do
  def num_decodings(s) do
    chars = String.graphemes(s)
    {result, _} = decode(chars, 0, %{})
    result
  end

  defp decode(chars, i, memo) when i == length(chars), do: {1, memo}
  defp decode(chars, i, memo) do
    if Enum.at(chars, i) == "0" do
      {0, memo}
    else
      case Map.get(memo, i) do
        nil ->
          {a, m1} = decode(chars, i + 1, memo)
          {b, m2} = if i + 1 < length(chars) do
            two = String.to_integer(Enum.join(Enum.slice(chars, i, 2)))
            if two <= 26, do: decode(chars, i + 2, m1), else: {0, m1}
          else
            {0, m1}
          end
          {a + b, Map.put(m2, i, a + b)}
        val -> {val, memo}
      end
    end
  end
end
