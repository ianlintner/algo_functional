;; Problem 59: Decode Ways (LeetCode 91)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn num-decodings [s]
  (let [n (count s)]
    (first
      (reduce (fn [[dp1 dp2] i]
                (if (= (nth s i) \0) [0 dp1]
                  (let [one dp1
                        two (if (and (< (inc i) n)
                                     (<= (Integer/parseInt (subs s i (+ i 2))) 26))
                               dp2 0)]
                    [(+ one two) dp1])))
              [1 0]
              (range (dec n) -1 -1)))))
