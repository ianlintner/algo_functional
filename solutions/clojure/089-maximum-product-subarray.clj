;; Problem 89: Maximum Product Subarray (LeetCode 152)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn max-product [nums]
  (let [[h & t] nums]
    (first
      (reduce (fn [[best mx mn] n]
        (let [hi (max n (* mx n) (* mn n))
              lo (min n (* mx n) (* mn n))]
          [(max best hi) hi lo]))
        [h h h] t))))
