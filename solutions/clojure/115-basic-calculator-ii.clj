;; Problem 115: Basic Calculator II (LeetCode 227)
;; Difficulty: Med
;; Language: Clojure
;; 
(defn calculate2 [s]
  (let [chars (vec (remove #(Character/isWhitespace %) s))]
    (letfn [(read-num [i acc]
              (if (and (< i (count chars))
                       (Character/isDigit (chars i)))
                (read-num (inc i)
                  (+ (* acc 10) (Character/digit (chars i) 10)))
                [acc i]))
            (parse [i stack op]
              (let [[num next] (read-num i 0)
                    ns (case op
                         \* (conj (pop stack) (* (peek stack) num))
                         \/ (conj (pop stack) (quot (peek stack) num))
                         \- (conj stack (- num))
                         (conj stack num))]
                (if (>= next (count chars))
                  (reduce + 0 ns)
                  (parse (inc next) ns (chars next)))))]
      (parse 0 [] \+))))
