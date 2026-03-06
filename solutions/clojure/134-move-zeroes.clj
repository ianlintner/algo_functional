;; Problem 134: Move Zeroes (LeetCode 283)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn move-zeroes [nums]
  (let [non-zeros (filter #(not= 0 %) nums)
        zeros (filter #(= 0 %) nums)]
    (concat non-zeros zeros)))
