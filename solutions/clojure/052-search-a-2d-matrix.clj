;; Problem 52: Search a 2D Matrix (LeetCode 74)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn search-matrix [matrix target]
  (let [flat (vec (apply concat matrix))]
    (loop [lo 0 hi (dec (count flat))]
      (when (<= lo hi)
        (let [mid (quot (+ lo hi) 2)
              v (flat mid)]
          (cond
            (= v target) true
            (< v target) (recur (inc mid) hi)
            :else (recur lo (dec mid))))))))
