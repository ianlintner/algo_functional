;; Problem 95: Rotate Array (LeetCode 189)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn rotate [nums k]
  (let [n (count nums) s (mod k n)]
    (concat (drop (- n s) nums) (take (- n s) nums))))
