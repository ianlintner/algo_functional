;; Problem 132: First Bad Version (LeetCode 278)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn first-bad-version [n is-bad?]
  (loop [lo 1 hi n]
    (if (>= lo hi) lo
      (let [mid (+ lo (quot (- hi lo) 2))]
        (if (is-bad? mid)
          (recur lo mid)
          (recur (inc mid) hi))))))
