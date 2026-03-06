;; Problem 73: Best Time to Buy and Sell Stock (LeetCode 121)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn max-profit [prices]
  (second (reduce (fn [[mn mx] p]
                    [(min mn p) (max mx (- p mn))])
                  [Integer/MAX_VALUE 0] prices)))
