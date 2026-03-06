;; Problem 133: Binary Search (LeetCode 704)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn binary-search [nums target]
  (let [arr (vec nums)]
    (loop [lo 0 hi (dec (count arr))]
      (if (> lo hi) -1
        (let [mid (+ lo (quot (- hi lo) 2))
              v (arr mid)]
          (cond
            (= v target) mid
            (< v target) (recur (inc mid) hi)
            :else (recur lo (dec mid))))))))
