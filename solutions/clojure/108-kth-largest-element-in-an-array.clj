;; Problem 108: Kth Largest Element in an Array (LeetCode 215)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn find-kth-largest [nums k]
  (let [pivot (nth nums (quot (count nums) 2))
        hi (filter #(> % pivot) nums)
        eq (filter #(= % pivot) nums)
        lo (filter #(< % pivot) nums)]
    (cond
      (<= k (count hi)) (recur hi k)
      (<= k (+ (count hi) (count eq))) pivot
      :else (recur lo (- k (count hi) (count eq))))))
