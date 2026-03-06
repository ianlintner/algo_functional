;; Problem 41: Maximum Subarray (LeetCode 53)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn max-sub-array [nums]
  (first
    (reduce (fn [[best cur] n]
              (let [c (max n (+ cur n))]
                [(max best c) c]))
            [(first nums) (first nums)]
            (rest nums))))
