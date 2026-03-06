;; Problem 64: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn zigzag-level-order [root]
  (if (nil? root) []
    (loop [queue [root] level 0 result []]
      (if (empty? queue) result
        (let [vals (mapv :val queue)
              row (if (even? level) vals (vec (rseq vals)))
              next (vec (mapcat (fn [n] (filter some? [(:left n) (:right n)])) queue))]
          (recur next (inc level) (conj result row)))))))
