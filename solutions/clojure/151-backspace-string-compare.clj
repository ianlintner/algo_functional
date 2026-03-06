;; Problem 151: Backspace String Compare (LeetCode 844)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn backspace-compare [s t]
  (let [build (fn [s]
                (reduce (fn [acc ch]
                  (if (= ch \#) (if (empty? acc) acc (subs acc 0 (dec (count acc))))
                    (str acc ch)))
                  "" s))]
    (= (build s) (build t))))
