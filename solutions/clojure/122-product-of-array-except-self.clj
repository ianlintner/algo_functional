;; Problem 122: Product of Array Except Self (LeetCode 238)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn product-except-self [nums]
  (let [n (count nums)
        prefix (reductions * 1 (butlast nums))
        suffix (reverse (reductions * 1 (reverse (rest nums))))]
    (mapv * prefix suffix)))
