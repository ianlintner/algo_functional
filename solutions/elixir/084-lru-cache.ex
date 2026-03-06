# Problem 84: LRU Cache (LeetCode 146)
# Difficulty: Med
# Language: Elixir
# 
defmodule LRU do
  defstruct cap: 0, order: [], cache: %{}

  def new(cap), do: %LRU{cap: cap}

  def get(%LRU{cache: cache, order: order} = lru, key) do
    case Map.fetch(cache, key) do
      :error -> {nil, lru}
      {:ok, val} ->
        new_order = Enum.filter(order, &(&1 != key)) ++ [key]
        {val, %{lru | order: new_order}}
    end
  end

  def put(%LRU{cap: cap, order: order, cache: cache}, key, val) do
    filtered = Enum.filter(order, &(&1 != key)) ++ [key]
    new_cache = Map.put(cache, key, val)
    if length(filtered) > cap do
      [evict | rest] = filtered
      %LRU{cap: cap, order: rest, cache: Map.delete(new_cache, evict)}
    else
      %LRU{cap: cap, order: filtered, cache: new_cache}
    end
  end
end
