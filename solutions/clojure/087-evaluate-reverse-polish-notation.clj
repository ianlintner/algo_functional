;; Problem 87: Evaluate Reverse Polish Notation (LeetCode 150)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn eval-rpn [tokens]
  (let [ops {"+" + "-" - "*" * "/" quot}]
    (first
      (reduce (fn [stack t]
        (if-let [op (ops t)]
          (let [[b a & rest] stack] (cons (op a b) rest))
          (cons (Integer/parseInt t) stack)))
        () tokens))))
