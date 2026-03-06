;; Problem 94: Top K Frequent Words (LeetCode 692)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn top-k-frequent [words k]
  (->> words
       frequencies
       (sort-by (fn [[w c]] [(- c) w]))
       (take k)
       (map first)))
