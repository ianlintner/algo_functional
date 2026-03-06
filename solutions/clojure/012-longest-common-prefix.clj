;; Problem 12: Longest Common Prefix (LeetCode 14)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn longest-common-prefix [strs]
  (if (empty? strs) ""
    (reduce
      (fn [prefix s]
        (apply str
          (map first
            (take-while (fn [[a b]] (= a b))
              (map vector prefix s)))))
      strs)))
