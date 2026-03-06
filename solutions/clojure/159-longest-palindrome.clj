;; Problem 159: Longest Palindrome (LeetCode 409)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn longest-palindrome [s]
  (let [freq (frequencies s)
        pairs (reduce (fn [sum [_ cnt]] (+ sum (* (quot cnt 2) 2))) 0 freq)]
    (+ pairs (if (< pairs (count s)) 1 0))))
