;; Problem 18: Valid Parentheses (LeetCode 20)
;; Difficulty: Easy
;; Language: Clojure
;; 
(defn is-valid [s]
  (let [matching {\) \(, \] \[, \} \{}]
    (empty?
      (reduce
        (fn [stk ch]
          (cond
            (#{"(" "{" "["} (str ch)) (conj stk ch)
            (and (seq stk) (= (peek stk) (matching ch))) (pop stk)
            :else (conj stk ch)))
        []
        s))))
