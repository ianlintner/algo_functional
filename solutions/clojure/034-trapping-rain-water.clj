;; Problem 34: Trapping Rain Water (LeetCode 42)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn trap [height]
  (let [max-left  (reductions max height)
        max-right (reverse (reductions max (reverse height)))]
    (reduce + (map (fn [h l r] (max 0 (- (min l r) h)))
                   height max-left max-right))))
