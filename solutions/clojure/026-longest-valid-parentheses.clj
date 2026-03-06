;; Problem 26: Longest Valid Parentheses (LeetCode 32)
;; Difficulty: Hard
;; Language: Clojure
;; 
(defn longest-valid-parentheses [s]
  (letfn [(scan [cs open close]
            (nth
              (reduce (fn [[l r mx] c]
                        (let [[l r] (if (= c open) [(inc l) r] [l (inc r)])]
                          (cond
                            (> r l) [0 0 mx]
                            (= l r) [l r (max mx (* 2 r))]
                            :else   [l r mx])))
                      [0 0 0] cs) 2))]
    (max (scan (seq s) \( \))
         (scan (reverse (seq s)) \) \())))
