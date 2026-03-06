;; Problem 27: Search in Rotated Sorted Array (LeetCode 33)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn search-rotated [nums target]
  (let [arr (vec nums)]
    (loop [lo 0 hi (dec (count arr))]
      (if (> lo hi) -1
        (let [mid (quot (+ lo hi) 2)
              m (arr mid) l (arr lo) h (arr hi)]
          (cond
            (= m target) mid
            (<= l m)
              (if (and (>= target l) (< target m))
                (recur lo (dec mid))
                (recur (inc mid) hi))
            :else
              (if (and (> target m) (<= target h))
                (recur (inc mid) hi)
                (recur lo (dec mid)))))))))
