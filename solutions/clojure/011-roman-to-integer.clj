;; Problem 11: Roman to Integer (LeetCode 13)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn roman-to-int [s]
  (let [values {\I 1, \V 5, \X 10, \L 50,
                \C 100, \D 500, \M 1000}]
    (first
      (reduce (fn [[total prev] ch]
                (let [v (values ch)]
                  (if (< v prev)
                    [(- total v) v]
                    [(+ total v) v])))
              [0 0]
              (reverse s)))))
