;; Problem 99: Binary Tree Right Side View (LeetCode 199)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn right-side-view [root]
  (if (nil? root) []
    (loop [level [root] result []]
      (if (empty? level) result
        (let [last-val (:val (last level))
              nxt (mapcat (fn [n]
                    (filter some? [(:left n) (:right n)])) level)]
          (recur nxt (conj result last-val)))))))
