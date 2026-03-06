;; Problem 152: Combination Sum IV (LeetCode 377)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn combination-sum4 [nums target]
  (let [dp (reduce (fn [dp i]
              (assoc dp i (reduce (fn [s n] (if (<= n i) (+ s (get dp (- i n) 0)) s))
                            0 nums)))
            {0 1} (range 1 (inc target)))]
    (get dp target 0)))
