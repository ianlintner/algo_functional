;; Problem 43: Jump Game (LeetCode 55)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn can-jump [nums]
  (>= (reduce-kv (fn [reach i n]
                    (if (> i reach) -1 (max reach (+ i n))))
                  0 nums)
      (dec (count nums))))
