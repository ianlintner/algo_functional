;; Problem 40: Subarray Sum Equals K (LeetCode 560)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn subarray-sum [nums k]
  (first
    (reduce (fn [[count sum prefix-map] n]
              (let [s (+ sum n)
                    c (+ count (get prefix-map (- s k) 0))
                    m (update prefix-map s (fnil inc 0))]
                [c s m]))
            [0 0 {0 1}]
            nums)))
