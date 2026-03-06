;; Problem 140: Longest Increasing Subsequence (LeetCode 300)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn length-of-lis [nums]
  (count
    (reduce (fn [tails num]
      (let [pos (java.util.Collections/binarySearch (java.util.ArrayList. tails) num)]
        (let [p (if (neg? pos) (- (inc pos)) pos)]
          (if (= p (count tails))
            (conj tails num)
            (assoc tails p num)))))
      [] nums)))
