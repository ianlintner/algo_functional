# Problem 162: Maximum Frequency Stack (LeetCode 895)
# Difficulty: Hard
# Language: Elixir
# 
defmodule FreqStack do
  defstruct freq: %{}, group: %{}, max_freq: 0

  def new, do: %FreqStack{}

  def push(%FreqStack{freq: freq, group: group, max_freq: mf}, val) do
    f = Map.get(freq, val, 0) + 1
    %FreqStack{
      freq: Map.put(freq, val, f),
      group: Map.update(group, f, [val], &[val | &1]),
      max_freq: max(mf, f)
    }
  end

  def pop(%FreqStack{freq: freq, group: group, max_freq: mf}) do
    [val | rest] = Map.get(group, mf)
    {new_group, new_mf} = if rest == [],
      do: {Map.delete(group, mf), mf - 1},
      else: {Map.put(group, mf, rest), mf}
    {val, %FreqStack{freq: Map.put(freq, val, freq[val] - 1),
                     group: new_group, max_freq: new_mf}}
  end
end
