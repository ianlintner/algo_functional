;; Problem 91: Min Stack (LeetCode 155)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn ms-push [stack x]
  (let [cur-min (if (empty? stack) x (min x (second (peek stack))))]
    (conj stack [x cur-min])))

(defn ms-pop [stack] (pop stack))
(defn ms-top [stack] (first (peek stack)))
(defn ms-get-min [stack] (second (peek stack)))
