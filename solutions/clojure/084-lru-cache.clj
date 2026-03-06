;; Problem 84: LRU Cache (LeetCode 146)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn lru-new [cap] {:cap cap :order [] :cache {}})

(defn lru-get [{:keys [order cache] :as lru} key]
  (if-let [val (cache key)]
    [val (assoc lru :order (conj (vec (remove #{key} order)) key))]
    [nil lru]))

(defn lru-put [{:keys [cap order cache]} key val]
  (let [ord (conj (vec (remove #{key} order)) key)
        c (assoc cache key val)]
    (if (> (count ord) cap)
      {:cap cap :order (vec (rest ord)) :cache (dissoc c (first ord))}
      {:cap cap :order ord :cache c})))
