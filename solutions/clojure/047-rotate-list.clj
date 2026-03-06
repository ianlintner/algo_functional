;; Problem 47: Rotate List (LeetCode 61)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn rotate-right [lst k]
  (if (empty? lst) []
    (let [n (count lst)
          rot (mod k n)]
      (if (zero? rot) lst
        (concat (drop (- n rot) lst) (take (- n rot) lst))))))
