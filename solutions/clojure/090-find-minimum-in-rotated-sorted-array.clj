;; Problem 90: Find Minimum in Rotated Sorted Array (LeetCode 153)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-min [nums]
  (let [v (vec nums)]
    (loop [lo 0 hi (dec (count v))]
      (if (= lo hi) (v lo)
        (let [mid (quot (+ lo hi) 2)]
          (if (> (v mid) (v hi))
            (recur (inc mid) hi)
            (recur lo mid)))))))
