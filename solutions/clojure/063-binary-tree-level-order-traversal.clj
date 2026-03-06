;; Problem 63: Binary Tree Level Order Traversal (LeetCode 102)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn level-order [root]
  (if (nil? root) []
    (loop [queue [root] result []]
      (if (empty? queue) result
        (let [vals (mapv :val queue)
              next (mapcat (fn [n] (filter some? [(:left n) (:right n)])) queue)]
          (recur (vec next) (conj result vals)))))))
