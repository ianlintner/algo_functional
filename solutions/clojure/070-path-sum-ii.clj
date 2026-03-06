;; Problem 70: Path Sum II (LeetCode 113)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn path-sum [node target]
  (cond
    (nil? node) []
    (and (nil? (:left node)) (nil? (:right node)))
      (if (= (:val node) target) [[(:val node)]] [])
    :else
      (let [v (:val node) remain (- target v)]
        (mapv #(into [v] %)
          (into (path-sum (:left node) remain)
                (path-sum (:right node) remain))))))
