;; Problem 129: Missing Number (LeetCode 268)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn missing-number [nums]
  (let [n (count nums)]
    (bit-xor (reduce bit-xor 0 nums)
             (reduce bit-xor 0 (range (inc n))))))
